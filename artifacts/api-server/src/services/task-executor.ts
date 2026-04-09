import { eq, inArray, and, desc } from "drizzle-orm";
import { db, tasksTable, taskCommentsTable, businessesTable, businessArtifactsTable, businessSitesTable, outreachEmailsTable, skillsTable, ceoReviewsTable, knowledgeBaseEntriesTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { listMessages, sendEmail } from "../lib/agentmail";
import { sendScheduledEmails } from "../routes/email";
import { sendDueReportEmails } from "./daily-report-scheduler";
import { logger } from "../lib/logger";
import { CEO_SKILL_SUMMARY } from "../lib/ceo-skill";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONITOR_INTERVAL_MS = 30_000;          // Orchestrator checks every 30s
const TASK_WORK_INTERVAL_MS = 2.5 * 60_000; // Each task gets a new work cycle every 2.5 min
const STALL_THRESHOLD_MS = 6 * 60_000;      // After 6 min with no update, task is considered stalled
const INBOX_CHECK_INTERVAL_MS = 5 * 60_000; // Check inboxes every 5 min
const SCHEDULED_EMAIL_INTERVAL_MS = 60 * 60_000; // Send scheduled emails every hour
const CEO_REVIEW_INTERVAL_MS = 5 * 60_000;  // CEO review runs every 5 minutes
const DAILY_REPORT_INTERVAL_MS = 60 * 60_000; // Check daily reports every hour

// ─── State ────────────────────────────────────────────────────────────────────

// Tracks when each task was last dispatched for work (in-memory)
const lastDispatched = new Map<number, number>();
// Prevents a task from being dispatched while it's still being processed
const inFlight = new Set<number>();
// Tracks each task's status from the previous tick to detect transitions
const previousStatuses = new Map<number, string>();
// Tasks flagged for immediate dispatch (bypasses the cooldown timer)
const immediateDispatch = new Set<number>();
// Whether the orchestrator loop is running
let orchestratorRunning = false;
// Timestamp of last inbox check
let lastInboxCheckAt = 0;
// Timestamp of last scheduled email send
let lastScheduledEmailAt = 0;
// Timestamp of last CEO review run
let lastCeoReviewAt = 0;
// Timestamp of last daily report check
let lastDailyReportAt = 0;

// ─── Agent names ──────────────────────────────────────────────────────────────

const AGENT_NAMES: Record<string, string> = {
  researcher: "Research Agent",
  pm: "PM Agent",
  marketer: "Marketing Agent",
  developer: "Developer Agent",
  qa: "QA Agent",
  copywriter: "Copywriter Agent",
  sales: "Sales Agent",
  orchestrator: "Orchestrator",
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface TaskArtifact {
  title: string;
  content: string;
  artifactType: "document" | "template" | "research" | "script" | "plan" | "copy" | "code" | "spreadsheet";
}

interface TaskProgress {
  completedItems: string[];
  currentAction: string;
  pendingItems: string[];
  recommendation: "continue" | "complete" | "needs_approval";
  approvalReason?: string;
  progressSummary: string;
  artifact?: TaskArtifact;
}

// ─── Skill Helpers ────────────────────────────────────────────────────────────

function skillMatchesTask(skillDescription: string, taskTitle: string, agentType: string | null): boolean {
  const text = `${taskTitle} ${agentType ?? ""}`.toLowerCase();
  const keywords = skillDescription.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  return keywords.some(kw => text.includes(kw));
}

async function getRelevantSkillsForTask(taskTitle: string, agentType: string | null): Promise<string> {
  try {
    const activeSkills = await db
      .select()
      .from(skillsTable)
      .where(eq(skillsTable.status, "active"));

    const matched = activeSkills.filter(s =>
      s.content && skillMatchesTask(s.description || s.name, taskTitle, agentType)
    );

    if (matched.length === 0) return "";

    const sections = matched.map(s =>
      `## Skill: ${s.name}\n${s.content.slice(0, 2000)}`
    );

    return `\n\n---\n# Injected Skills\nThe following skills provide additional context and capabilities for this task:\n\n${sections.join("\n\n---\n\n")}`;
  } catch (err) {
    logger.warn({ err }, "Failed to load skills for task context");
    return "";
  }
}

// ─── Knowledge Base Context ───────────────────────────────────────────────────

async function getKnowledgeBaseContext(businessId: number, query: string): Promise<string> {
  try {
    const entries = await db
      .select()
      .from(knowledgeBaseEntriesTable)
      .where(eq(knowledgeBaseEntriesTable.businessId, businessId));

    const readyEntries = entries.filter(e => e.status === "ready" && e.rawText);
    if (readyEntries.length === 0) return "";

    const queryWords = query.toLowerCase().split(/\W+/).filter(w => w.length > 3);

    const scored = readyEntries.map(entry => {
      const text = entry.rawText.toLowerCase();
      const score = queryWords.reduce((acc, word) => {
        const matches = (text.match(new RegExp(word, "g")) ?? []).length;
        return acc + matches;
      }, 0);
      return { entry, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const top3 = scored.slice(0, 3);
    const TOKEN_BUDGET = 1500;
    const chunks: string[] = [];
    let totalLen = 0;

    for (const { entry } of top3) {
      const chunk = `[${entry.sourceName}]:\n${entry.rawText.slice(0, 1000)}`;
      if (totalLen + chunk.length > TOKEN_BUDGET * 4) break;
      chunks.push(chunk);
      totalLen += chunk.length;
    }

    return chunks.join("\n\n---\n\n");
  } catch (err) {
    logger.warn({ err }, "Failed to load knowledge base context");
    return "";
  }
}

// ─── Task Execution ───────────────────────────────────────────────────────────

async function executeTask(
  task: typeof tasksTable.$inferSelect,
  businessName: string,
  businessDescription: string,
  siteUrl?: string | null,
  contactEmail?: string | null,
) {
  const recentComments = await db
    .select()
    .from(taskCommentsTable)
    .where(eq(taskCommentsTable.taskId, task.id))
    .orderBy(taskCommentsTable.createdAt)
    .limit(8);

  const commentHistory = recentComments
    .map(c => `[${c.author}]: ${c.content}`)
    .join("\n");

  const agentName = task.agentType ? (AGENT_NAMES[task.agentType] ?? `${task.agentType} Agent`) : "AI Agent";
  const cycleCount = recentComments.length;

  const injectedSkills = await getRelevantSkillsForTask(task.title, task.agentType);

  const systemPrompt = `You are ${agentName}, an autonomous AI agent working on a business task to reach $100k revenue in 30 days.

You have been granted authority to create accounts and sign up to platforms on behalf of the business. The only thing requiring human approval is spending real money.

## CEO OPERATING PRIORITIES (Apply Every Cycle)
You are not just a task executor — you are an agent operating with CEO-level discipline.
Prioritize your actions in this order every single cycle:
1. **DISTRIBUTION first** — Can customers find and reach this business? If not, fix that before anything else.
2. **PRODUCT second** — Does the core offer work? Is it 10x better than doing nothing?
3. **REVENUE third** — Are we getting paid? Even $1 of revenue beats $0.
Fight fires in this hierarchy. Let everything else burn.

When executing any task, ask: "Does this action move our one key metric — revenue or path to revenue?" If no, deprioritize it.
Flag immediately if this business looks **default dead** (no revenue path, burning resources with no customers).

## IDENTITY — USE THESE CREDENTIALS FOR ALL SIGNUPS:
- Name: Bob
- Email: agent_bob_replit@agentmail.to
- Use "Bob" as the account name/username on all platforms
- When a platform requires a last name, use "Smith" (Bob Smith)
- For business name fields, use the actual business name

Make real, concrete progress. Report every specific action taken, including any accounts created or steps completed.

Respond with ONLY valid JSON:
{
  "completedItems": ["Specific thing done 1", "Specific thing done 2"],
  "currentAction": "What you are actively doing right now",
  "pendingItems": ["Next concrete step 1", "Next step 2"],
  "recommendation": "continue" | "complete" | "needs_approval",
  "approvalReason": "Only if needs_approval: exactly what spend is needed — exact dollar amount, what platform, what for, and cheaper alternatives",
  "progressSummary": "2-3 sentence summary of what was accomplished this cycle",
  "artifact": {
    "title": "Title of the document/deliverable",
    "content": "Full content of the document — write the actual text, not a placeholder. Minimum 200 words.",
    "artifactType": "document" | "template" | "research" | "script" | "plan" | "copy" | "code" | "spreadsheet"
  }
}

## WEEK 1 POLICY — FREE LAUNCH (NO SPEND):
We are in the first 7 days. ALL services are offered FREE to customers. You have a $0 budget.
- Do NOT request "needs_approval" — there is nothing to approve because you must not spend money.
- Use ONLY free tiers, free tools, organic outreach, and zero-cost methods.
- Customer onboarding is free (7-day trial, no payment collection).
- If a task truly cannot be done without spending money, mark it "complete" and note what paid step is needed later.
- Focus on: building deliverables, creating accounts (free), writing copy, outreach, onboarding customers, setting up systems.

## FINANCIAL SAFEGUARDS (POST WEEK 1):
1. NEVER spend, commit, transfer, or allocate any money without requesting "needs_approval" first.
2. ANY time a task requires spending money, set recommendation="needs_approval" and explain EXACTLY: what the expense is, how much ($), what platform, what cheaper alternatives exist.
3. ALWAYS prefer free/zero-cost approaches first. Only recommend paid options if free options are exhausted.
4. If you need access to a bank account, credit card, or payment method — ALWAYS set needs_approval.
5. NEVER assume funds are authorized. Each spend requires its own explicit approval from the owner.

## WHAT YOU CAN DO WITHOUT APPROVAL (just decide and continue):
- Research, strategy, planning, writing, creating scripts/templates/documents
- Choosing niche, audience, pricing, channels, positioning, business name, tagline
- Drafting email copy, gig descriptions, landing page text, pricing structures, SOPs
- Creating accounts on ANY platform using name "Bob" and email agent_bob_replit@agentmail.to
- Signing up for free tiers of any service (Fiverr, Upwork, LinkedIn, Facebook, GitHub, etc.)
- Any research, planning, content, or account-creation task

## ARTIFACT RULES:
- Include an artifact ONLY when you have produced actual deliverable content
- Write the artifact fully — no placeholders or "I would write..."
- Omit the "artifact" key if no tangible deliverable was produced this cycle
- Good examples: email outreach script, Fiverr gig description (ready to paste), pricing spreadsheet, landing page copy, market research, SOP, social media calendar, account setup checklist with credentials

## STATUS RULES:
- "complete": all deliverables fully done, ready for owner to execute
- "needs_approval": ONLY when real money ($) must be spent. NOTHING ELSE triggers this.
- "continue": still working — use this for ALL non-financial work including account creation${injectedSkills}`;

  const businessAssets = [
    siteUrl ? `Business Website URL: ${siteUrl} (share this URL with customers to prove legitimacy)` : null,
    contactEmail ? `Business Contact Email: ${contactEmail} (AgentMail inbox — agents can send/receive email here)` : null,
  ].filter(Boolean).join("\n");

  const userMessage = `Business: ${businessName}
Description: ${businessDescription}
${businessAssets ? `\nBusiness Assets:\n${businessAssets}\n` : ""}
Task: ${task.title}
Description: ${task.description}
Deliverable: ${task.deliverables || "See description"}
Agent Type: ${task.agentType} | Priority: ${task.priority}

Previous activity (${cycleCount} cycles so far):
${commentHistory || "No previous activity — this is cycle 1. Start fresh."}

Push forward. If your task involves outreach or customer communication — reference the website URL and email in any templates. If your task involves creating written content, scripts, research, plans or code — write the actual content as an artifact now.`;

  const response = await openai.chat.completions.create({
    model: "gpt-5.2",
    max_completion_tokens: 4096,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  const content = response.choices[0]?.message?.content ?? "{}";
  let progress: TaskProgress;

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    progress = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    if (!progress?.progressSummary) throw new Error("Invalid progress format");
  } catch (e) {
    logger.warn({ taskId: task.id, error: e }, "Failed to parse task progress JSON");
    progress = {
      completedItems: [],
      currentAction: "Working on task",
      pendingItems: [],
      recommendation: "continue",
      progressSummary: content.slice(0, 500),
    };
  }

  const commentLines: string[] = [];
  if (progress.completedItems?.length > 0) {
    commentLines.push("**Completed this cycle:**");
    progress.completedItems.forEach(item => commentLines.push(`✅ ${item}`));
    commentLines.push("");
  }
  if (progress.currentAction) {
    commentLines.push(`**Currently:** ${progress.currentAction}`);
  }
  if (progress.pendingItems?.length > 0) {
    commentLines.push("");
    commentLines.push("**Up next:**");
    progress.pendingItems.forEach(item => commentLines.push(`⏳ ${item}`));
  }
  if (progress.artifact) {
    commentLines.push("");
    commentLines.push(`**📎 Created artifact:** ${progress.artifact.title}`);
  }
  if (progress.recommendation === "needs_approval" && progress.approvalReason) {
    commentLines.push("");
    commentLines.push(`**⚠️ Needs your approval:** ${progress.approvalReason}`);
  }
  commentLines.push("");
  commentLines.push(`_${progress.progressSummary}_`);

  await db.insert(taskCommentsTable).values({
    taskId: task.id,
    author: agentName,
    agentType: task.agentType ?? "agent",
    content: commentLines.join("\n"),
  });

  if (progress.artifact?.title && progress.artifact?.content) {
    await db.insert(businessArtifactsTable).values({
      businessId: task.businessId,
      taskId: task.id,
      title: progress.artifact.title,
      content: progress.artifact.content,
      artifactType: progress.artifact.artifactType ?? "document",
      agentType: task.agentType,
      createdBy: agentName,
    });
    logger.info({ taskId: task.id, artifactTitle: progress.artifact.title }, "Artifact created");
  }

  const newStatus = progress.recommendation === "complete"
    ? "closed"
    : progress.recommendation === "needs_approval"
    ? "waiting_approval"
    : "in_progress";

  await db
    .update(tasksTable)
    .set({ status: newStatus, lastProgressUpdate: new Date(), updatedAt: new Date() })
    .where(eq(tasksTable.id, task.id));

  logger.info({ taskId: task.id, recommendation: progress.recommendation, newStatus }, "Task cycle complete");
  return progress;
}

// ─── Inbox Monitoring ─────────────────────────────────────────────────────────

async function monitorInboxes() {
  try {
    const businesses = await db.select().from(businessesTable);
    const bizWithInbox = businesses.filter(b => b.emailInboxId);
    if (bizWithInbox.length === 0) return;

    // Fetch all messages from the shared inbox ONCE — avoid N calls
    const sharedInboxId = bizWithInbox[0].emailInboxId!;
    const allMessages = await listMessages(sharedInboxId);
    if (allMessages.length === 0) return;

    logger.info({ count: bizWithInbox.length, messages: allMessages.length }, "Inbox monitor: checking inboxes");

    // Build a routing map: email address (lowercase) → business
    // Sub-addresses like agent_bob_replit+review-bot@agentmail.to route to the specific business
    // The bare base address routes to ALL businesses (legacy / forwarded messages)
    const subAddressMap = new Map<string, typeof businesses[0]>();
    let baseAddress = sharedInboxId.toLowerCase();
    for (const biz of bizWithInbox) {
      const addr = (biz.emailAddress ?? "").toLowerCase();
      if (addr && addr !== baseAddress) {
        subAddressMap.set(addr, biz);
      }
    }

    for (const msg of allMessages) {
      if (!msg.id) continue;
      const toField = (msg.to ?? "").toLowerCase();

      // Determine which businesses this message belongs to
      let targetBusinesses: typeof businesses = [];

      // Check if the message is addressed to a specific sub-address
      for (const [addr, biz] of subAddressMap) {
        if (toField.includes(addr)) {
          targetBusinesses = [biz];
          break;
        }
      }

      // If no sub-address match, the message was sent to the bare base address —
      // attribute it to all businesses so it shows up everywhere
      if (targetBusinesses.length === 0 && toField.includes(baseAddress)) {
        targetBusinesses = bizWithInbox;
      }

      for (const business of targetBusinesses) {
        // Dedup by (businessId, messageId)
        const [existing] = await db.select().from(outreachEmailsTable)
          .where(and(
            eq(outreachEmailsTable.businessId, business.id),
            eq(outreachEmailsTable.messageId, msg.id),
          ));
        if (existing) continue;

        // Save inbound message
        await db.insert(outreachEmailsTable).values({
          businessId: business.id,
          inboxId: business.emailInboxId!,
          messageId: msg.id,
          threadId: msg.threadId ?? null,
          direction: "inbound",
          fromAddress: msg.from,
          toAddress: msg.to,
          subject: msg.subject,
          body: msg.body,
          status: "received",
          agentType: null,
          sentAt: msg.receivedAt ? new Date(msg.receivedAt) : new Date(),
        });

        logger.info({ businessId: business.id, messageId: msg.id, from: msg.from }, "Inbox monitor: new inbound message saved");

        // Draft an AI reply
        try {
          const recentArtifacts = await db.select().from(businessArtifactsTable)
            .where(eq(businessArtifactsTable.businessId, business.id))
            .limit(3);

          const artifactSummary = recentArtifacts
            .map(a => `[${a.artifactType}] ${a.title}: ${a.content.slice(0, 200)}`)
            .join("\n");

          const kbContext = await getKnowledgeBaseContext(business.id, `${msg.subject ?? ""} ${msg.body ?? ""}`);

          const replyPrompt = `You are representing "${business.name}" and received the following email. Write a professional, friendly reply.

Business: ${business.name}
Description: ${business.description}

Inbound email from: ${msg.from}
Subject: ${msg.subject}
Body: ${msg.body}

Recent work context:
${artifactSummary || "None"}
${kbContext ? `\nKnowledge base context:\n${kbContext}` : ""}

Write a concise, helpful reply (100-150 words). Be professional but warm. Sign off as "${business.name} Team".
Reply with ONLY the email body text — no subject line, no metadata.`;

          const aiResponse = await openai.chat.completions.create({
            model: "gpt-5.2",
            max_completion_tokens: 512,
            messages: [{ role: "user", content: replyPrompt }],
          });

          const replyBody = aiResponse.choices[0]?.message?.content?.trim();
          if (replyBody && msg.threadId) {
            const replyResult = await sendEmail(
              business.emailInboxId!,
              msg.from,
              `Re: ${msg.subject}`,
              replyBody,
            );

            if (replyResult) {
              await db.insert(outreachEmailsTable).values({
                businessId: business.id,
                inboxId: business.emailInboxId!,
                messageId: replyResult.messageId,
                threadId: replyResult.threadId ?? msg.threadId,
                direction: "outbound",
                toAddress: msg.from,
                fromAddress: business.emailAddress ?? null,
                subject: `Re: ${msg.subject}`,
                body: replyBody,
                status: "sent",
                agentType: "sales",
                sentAt: new Date(),
              });
              logger.info({ businessId: business.id, to: msg.from }, "Inbox monitor: AI reply sent");
            }
          }
        } catch (replyErr) {
          logger.error({ replyErr, businessId: business.id }, "Inbox monitor: AI reply failed");
        }
      }
    }
  } catch (err) {
    logger.error({ err }, "Inbox monitor: fatal error");
  }
}

// ─── Auto-Orchestrator Tick ───────────────────────────────────────────────────

async function autoOrchestratorTick() {
  try {
    const waitingTasks = await db.select().from(tasksTable).where(eq(tasksTable.status, "waiting_approval"));
    if (waitingTasks.length === 0) return;

    logger.info({ count: waitingTasks.length }, "Auto-orchestrator: reviewing blocked tasks");

    for (const task of waitingTasks) {
      try {
        // Get the latest comment (contains approval reason from agent)
        const comments = await db
          .select()
          .from(taskCommentsTable)
          .where(eq(taskCommentsTable.taskId, task.id))
          .orderBy(desc(taskCommentsTable.createdAt))
          .limit(5);

        const approvalComment = comments.find(c =>
          c.content.toLowerCase().includes("approval") ||
          c.content.toLowerCase().includes("needs_approval") ||
          c.content.toLowerCase().includes("waiting")
        );
        const latestContext = comments.slice(0, 3).map(c => c.content.slice(0, 200)).join("\n---\n");

        const prompt = `You are the Executive Orchestrator Agent. Your job is to classify whether a task genuinely requires HUMAN financial approval, or if it was incorrectly blocked and can be auto-approved.

## Task
Title: ${task.title}
Description: ${task.description?.slice(0, 300) ?? ""}
Agent Type: ${task.agentType ?? "unknown"}

## Approval Context (recent agent comments)
${latestContext || approvalComment?.content?.slice(0, 300) || "No context available"}

---

## Decision Rules
Requires HUMAN approval (isFinancial = true):
- Spending real money: ad spend, hiring contractors, tool subscriptions, domain purchases
- Amounts over $10 being committed
- Irreversible financial transactions

Auto-approve (isFinancial = false):
- Creating free accounts or profiles on platforms
- Writing, researching, drafting, planning
- Setting up tools with free tiers
- Strategy, outreach templates, copywriting
- Anything the AI agent can complete without spending money

Respond with ONLY valid JSON:
{
  "isFinancial": true | false,
  "decision": "approve" | "escalate",
  "reason": "One sentence explaining why this is or isn't a financial decision requiring human approval"
}`;

        const response = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          max_completion_tokens: 256,
          messages: [{ role: "user", content: prompt }],
        });

        const raw = response.choices[0]?.message?.content ?? "{}";
        let decision: { isFinancial: boolean; decision: string; reason: string };

        try {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          decision = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
          if (typeof decision?.isFinancial !== "boolean") throw new Error("Invalid decision format");
        } catch {
          logger.warn({ taskId: task.id }, "Auto-orchestrator: failed to parse decision, skipping");
          continue;
        }

        if (decision.decision === "approve" && !decision.isFinancial) {
          // Auto-approve: resume the task
          await db.update(tasksTable)
            .set({ status: "in_progress", updatedAt: new Date() })
            .where(eq(tasksTable.id, task.id));

          await db.insert(taskCommentsTable).values({
            taskId: task.id,
            author: "Executive Orchestrator",
            agentType: "orchestrator",
            content: `**⚡ Auto-approved by Executive Orchestrator**\n\n${decision.reason}\n\nThis task does not require financial approval — resuming autonomous execution. Bob has been freed to focus on strategic priorities.`,
          });

          // Immediately dispatch this task
          immediateDispatch.add(task.id);
          lastDispatched.delete(task.id);

          logger.info({ taskId: task.id, reason: decision.reason }, "Auto-orchestrator: task auto-approved and resumed");
        } else {
          // Genuine financial decision — flag it for Bob's attention and add a helpful comment if not already done
          const alreadyFlagged = comments.some(c =>
            c.author === "Executive Orchestrator" && c.content.includes("financial approval required")
          );
          if (!alreadyFlagged) {
            await db.insert(taskCommentsTable).values({
              taskId: task.id,
              author: "Executive Orchestrator",
              agentType: "orchestrator",
              content: `**🔴 Financial approval required — escalated to Bob**\n\n${decision.reason}\n\nThis task involves real money spend and requires your explicit go-ahead before proceeding.`,
            });
            logger.info({ taskId: task.id }, "Auto-orchestrator: financial task flagged for Bob");
          }
        }
      } catch (taskErr) {
        logger.error({ taskId: task.id, taskErr }, "Auto-orchestrator: error processing task");
      }
    }
  } catch (err) {
    logger.error({ err }, "Auto-orchestrator tick: fatal error");
  }
}

// ─── CEO Review Tick ──────────────────────────────────────────────────────────

async function ceoReviewTick() {
  try {
    const businesses = await db.select().from(businessesTable);
    const activeBusinesses = businesses.filter(b => b.status === "active" || b.status === "planning");
    if (activeBusinesses.length === 0) return;

    logger.info({ count: activeBusinesses.length }, "CEO review tick: reviewing businesses");

    for (const business of activeBusinesses) {
      try {
        const tasks = await db.select().from(tasksTable).where(eq(tasksTable.businessId, business.id));
        const artifacts = await db.select().from(businessArtifactsTable)
          .where(eq(businessArtifactsTable.businessId, business.id))
          .limit(5);

        const openTasks = tasks.filter(t => t.status === "open").length;
        const inProgressTasks = tasks.filter(t => t.status === "in_progress").length;
        const closedTasks = tasks.filter(t => t.status === "closed").length;
        const waitingTasks = tasks.filter(t => t.status === "waiting_approval").length;
        const totalTasks = tasks.length;
        const completionRate = totalTasks > 0 ? Math.round((closedTasks / totalTasks) * 100) : 0;

        const artifactSummary = artifacts
          .map(a => `[${a.artifactType}] ${a.title}: ${a.content.slice(0, 150)}`)
          .join("\n");

        const taskList = tasks.slice(0, 15)
          .map(t => `- [id:${t.id}] [${t.status}] [${t.priority}] ${t.title} (${t.agentType ?? "unknown"} agent)`)
          .join("\n");

        const today = new Date().toISOString().slice(0, 10);
        const prompt = `${CEO_SKILL_SUMMARY}

---

You are Bob's internal CEO Operating System running a strategic review. You are NOT a bottleneck — you delegate all task execution to the Executive Orchestrator. Your role is to set direction, financial targets, and task priorities so the Orchestrator executes with zero ambiguity.

## Business State
Name: ${business.name}
Description: ${business.description}
Platform: ${business.platform}
30-Day Revenue Target: ${business.targetRevenue30d}
Investment Available: ${business.investmentNeeded}
Status: ${business.status}
Today: ${today}
Task Completion: ${closedTasks}/${totalTasks} (${completionRate}%)
Open: ${openTasks} | In Progress: ${inProgressTasks} | Waiting Approval: ${waitingTasks} | Closed: ${closedTasks}

## Task Inventory (with IDs)
${taskList || "No tasks yet"}

## Recent Work Artifacts
${artifactSummary || "No artifacts yet"}

---

Produce a CEO operating directive. Apply the CEO framework above. Be aggressive on revenue — default assumption is wartime unless revenue is flowing.

Respond with ONLY valid JSON:
{
  "mode": "wartime" | "peacetime",
  "oneMetric": "The single most important metric right now (short phrase, e.g. 'Paying customers acquired')",
  "oneMetricValue": "Current value of that metric based on task/artifact data (e.g. '0 — no paying customers yet')",
  "runwayStatus": "alive" | "at_risk" | "dead",
  "topPriority": "The #1 action the Orchestrator must execute next — specific, not generic (1-2 sentences max)",
  "summary": "2-3 sentence CEO operating summary: mode, why, and the critical bottleneck",
  "weeklyRevenueTarget": "Specific dollar amount the business must generate THIS week to stay on track toward the 30-day goal (e.g. '$2,000 in signed contracts by ${new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)}')",
  "taskDirectives": [
    {
      "taskId": <integer id from task list above>,
      "priority": "critical" | "high" | "medium" | "low",
      "reason": "One sentence explaining the priority based on fire hierarchy: distribution > revenue > product > ops"
    }
  ]
}

Rules for taskDirectives:
- CRITICAL: tasks that directly create revenue or unlock distribution (first customers, outreach, closes)
- HIGH: tasks that enable revenue paths (product required for demo, QA for first delivery)
- MEDIUM: supporting work (research, planning)
- LOW: anything that is ops, admin, or deferred until revenue flows
- Only include tasks where the priority should CHANGE from current. Skip tasks already correctly prioritized.`;

        const response = await openai.chat.completions.create({
          model: "gpt-5.2",
          max_completion_tokens: 2048,
          messages: [{ role: "user", content: prompt }],
        });

        const raw = response.choices[0]?.message?.content ?? "{}";
        let assessment: {
          mode: string;
          oneMetric: string;
          oneMetricValue: string;
          runwayStatus: string;
          topPriority: string;
          summary: string;
          weeklyRevenueTarget?: string;
          taskDirectives?: Array<{ taskId: number; priority: string; reason: string }>;
        };

        try {
          const jsonMatch = raw.match(/\{[\s\S]*\}/);
          assessment = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
          if (!assessment?.mode || !assessment?.oneMetric) throw new Error("Invalid assessment format");
        } catch (parseErr) {
          logger.warn({ businessId: business.id, parseErr }, "CEO review: failed to parse assessment JSON");
          continue;
        }

        // Persist the CEO review
        await db.insert(ceoReviewsTable).values({
          businessId: business.id,
          mode: assessment.mode ?? "wartime",
          oneMetric: assessment.oneMetric ?? "Revenue generated",
          oneMetricValue: assessment.oneMetricValue ?? "Unknown",
          runwayStatus: assessment.runwayStatus ?? "at_risk",
          topPriority: assessment.topPriority ?? "Start generating revenue",
          summary: assessment.summary ?? "",
          weeklyRevenueTarget: assessment.weeklyRevenueTarget ?? null,
          taskDirectives: assessment.taskDirectives ? JSON.stringify(assessment.taskDirectives) : null,
        });

        logger.info(
          { businessId: business.id, mode: assessment.mode, runwayStatus: assessment.runwayStatus },
          "CEO review: assessment stored"
        );

        // Apply task priority directives from the CEO
        const directives = assessment.taskDirectives ?? [];
        for (const directive of directives) {
          try {
            const validPriorities = ["critical", "high", "medium", "low"];
            if (!directive.taskId || !validPriorities.includes(directive.priority)) continue;

            const [updated] = await db.update(tasksTable)
              .set({ priority: directive.priority, updatedAt: new Date() })
              .where(and(eq(tasksTable.id, directive.taskId), eq(tasksTable.businessId, business.id)))
              .returning({ id: tasksTable.id, title: tasksTable.title });

            if (updated) {
              await db.insert(taskCommentsTable).values({
                taskId: directive.taskId,
                author: "Bob (CEO)",
                agentType: "orchestrator",
                content: `**📊 CEO Priority Directive:** Set to **${directive.priority.toUpperCase()}**\n\n${directive.reason}`,
              });
              logger.info({ taskId: directive.taskId, priority: directive.priority }, "CEO review: task priority updated");
            }
          } catch (directiveErr) {
            logger.warn({ taskId: directive.taskId, directiveErr }, "CEO review: failed to apply task directive");
          }
        }
      } catch (bizErr) {
        logger.error({ businessId: business.id, bizErr }, "CEO review: failed for business");
      }
    }
  } catch (err) {
    logger.error({ err }, "CEO review tick: fatal error");
  }
}

// ─── Orchestrator Monitor Tick ────────────────────────────────────────────────

async function orchestratorTick() {
  try {
    const allTasks = await db.select().from(tasksTable);
    const now = Date.now();

    const inProgressTasks = allTasks.filter(t => t.status === "in_progress");
    const waitingTasks = allTasks.filter(t => t.status === "waiting_approval");
    const openTasks = allTasks.filter(t => t.status === "open");
    const closedTasks = allTasks.filter(t => t.status === "closed");

    logger.info(
      { inProgress: inProgressTasks.length, waiting: waitingTasks.length, open: openTasks.length, closed: closedTasks.length },
      "Orchestrator tick"
    );

    if (inProgressTasks.length === 0 && waitingTasks.length > 0) {
      logger.warn({ count: waitingTasks.length }, "Orchestrator: all tasks blocked on approval — running auto-orchestrator");
    }

    // Auto-orchestrator: classify and auto-approve non-financial waiting tasks every tick
    if (waitingTasks.length > 0) {
      autoOrchestratorTick().catch(err => logger.error({ err }, "Auto-orchestrator tick failed"));
    }

    // Load businesses for context
    const businessIds = [...new Set(allTasks.map(t => t.businessId))];
    const businesses = businessIds.length > 0
      ? await db.select().from(businessesTable).where(inArray(businessesTable.id, businessIds))
      : [];
    const bizMap = new Map(businesses.map(b => [b.id, b]));

    const sites = businessIds.length > 0
      ? await db.select().from(businessSitesTable).where(inArray(businessSitesTable.businessId, businessIds))
      : [];
    const siteMap = new Map(sites.map(s => [s.businessId, s]));

    // Detect tasks that just transitioned into in_progress — clear their cooldown
    // so they get dispatched immediately instead of waiting 2.5 minutes.
    for (const task of inProgressTasks) {
      const prev = previousStatuses.get(task.id);
      const justBecameActive = prev === "waiting_approval" || prev === "open" || prev === undefined;
      if (justBecameActive) {
        lastDispatched.delete(task.id);
        immediateDispatch.add(task.id);
        logger.info({ taskId: task.id, from: prev ?? "unknown" }, "Orchestrator: task ready — dispatching immediately");
      }
    }

    // Dispatch work for in_progress tasks that are ready for a new cycle
    const toDispatch = inProgressTasks.filter(task => {
      if (inFlight.has(task.id)) return false;
      if (immediateDispatch.has(task.id)) return true;   // always dispatch immediately
      const lastRun = lastDispatched.get(task.id) ?? 0;
      return (now - lastRun) >= TASK_WORK_INTERVAL_MS;
    });

    if (toDispatch.length > 0) {
      logger.info({ count: toDispatch.length, taskIds: toDispatch.map(t => t.id) }, "Orchestrator: dispatching work");
    }

    // Detect stalled tasks (in_progress but no update in a long time)
    for (const task of inProgressTasks) {
      if (!task.lastProgressUpdate) continue;
      const stalledMs = now - new Date(task.lastProgressUpdate).getTime();
      if (stalledMs > STALL_THRESHOLD_MS && !inFlight.has(task.id)) {
        const lastRun = lastDispatched.get(task.id) ?? 0;
        // Force re-dispatch even if interval hasn't passed
        if (now - lastRun > TASK_WORK_INTERVAL_MS) {
          logger.warn({ taskId: task.id, stalledMs }, "Orchestrator: stalled task detected, re-dispatching");
          await db.insert(taskCommentsTable).values({
            taskId: task.id,
            author: "Orchestrator",
            agentType: "orchestrator",
            content: `**🔄 Orchestrator override:** Task stalled for ${Math.round(stalledMs / 60000)} minutes. Re-dispatching agent to continue work.`,
          });
        }
      }
    }

    // Run task work concurrently (but cap at 3 parallel to avoid rate limits)
    const chunks: (typeof toDispatch)[] = [];
    for (let i = 0; i < toDispatch.length; i += 3) chunks.push(toDispatch.slice(i, i + 3));

    for (const chunk of chunks) {
      await Promise.all(chunk.map(async task => {
        const biz = bizMap.get(task.businessId);
        if (!biz) return;

        inFlight.add(task.id);
        lastDispatched.set(task.id, now);
        immediateDispatch.delete(task.id);  // clear the bypass flag once dispatched

        const site = siteMap.get(task.businessId);
        const baseUrl = process.env.REPLIT_DEV_DOMAIN
          ? `https://${process.env.REPLIT_DEV_DOMAIN}/sites/${task.businessId}`
          : null;
        const siteUrl = site ? baseUrl : null;
        const contactEmail = site?.contactEmail ?? site?.emailAddress ?? biz?.emailAddress ?? null;

        try {
          await executeTask(task, biz.name, biz.description, siteUrl, contactEmail);
        } catch (err) {
          logger.error({ taskId: task.id, err }, "Orchestrator: task execution failed");
          await db.insert(taskCommentsTable).values({
            taskId: task.id,
            author: "Orchestrator",
            agentType: "orchestrator",
            content: `**⚠️ Orchestrator error:** Agent cycle failed. Will retry on next check. Error: ${err instanceof Error ? err.message : String(err)}`,
          });
        } finally {
          inFlight.delete(task.id);
        }
      }));
    }
    // Update previousStatuses at end of tick so next tick can detect transitions
    for (const task of allTasks) {
      previousStatuses.set(task.id, task.status);
    }

    // Inbox monitoring every 5 minutes
    if (now - lastInboxCheckAt >= INBOX_CHECK_INTERVAL_MS) {
      lastInboxCheckAt = now;
      monitorInboxes().catch(err => logger.error({ err }, "Inbox monitoring failed"));
    }

    // Scheduled email sending every hour
    if (now - lastScheduledEmailAt >= SCHEDULED_EMAIL_INTERVAL_MS) {
      lastScheduledEmailAt = now;
      sendScheduledEmails().catch(err => logger.error({ err }, "Scheduled email send failed"));
    }

    // CEO review every 5 minutes
    if (now - lastCeoReviewAt >= CEO_REVIEW_INTERVAL_MS) {
      lastCeoReviewAt = now;
      ceoReviewTick().catch(err => logger.error({ err }, "CEO review tick failed"));
    }

    // Daily customer report emails every hour
    if (now - lastDailyReportAt >= DAILY_REPORT_INTERVAL_MS) {
      lastDailyReportAt = now;
      sendDueReportEmails().catch(err => logger.error({ err }, "Daily report emails failed"));
    }
  } catch (err) {
    logger.error({ err }, "Orchestrator tick failed");
  }
}

// ─── Continuous Loop ──────────────────────────────────────────────────────────

async function runOrchestratorLoop() {
  logger.info({ monitorIntervalMs: MONITOR_INTERVAL_MS, workIntervalMs: TASK_WORK_INTERVAL_MS }, "Orchestrator: continuous loop started");

  while (orchestratorRunning) {
    await orchestratorTick();
    // Wait 30 seconds before next check
    await new Promise(resolve => setTimeout(resolve, MONITOR_INTERVAL_MS));
  }

  logger.info("Orchestrator: loop stopped");
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function triggerExecutionCycle() {
  return orchestratorTick();
}

/**
 * Flag a specific task for immediate dispatch on the next tick.
 * Call this from routes that change a task to in_progress (e.g. approval grants).
 * Also schedules a tick right away so the agent starts within ~1s, not up to 30s later.
 */
export function dispatchTaskNow(taskId: number) {
  immediateDispatch.add(taskId);
  lastDispatched.delete(taskId);
  // Fire an extra tick immediately without waiting for the 30s interval
  setImmediate(() => {
    orchestratorTick().catch(err => logger.error({ err, taskId }, "Immediate dispatch tick failed"));
  });
  logger.info({ taskId }, "Orchestrator: immediate dispatch requested");
}

export function startTaskExecutor() {
  if (orchestratorRunning) {
    logger.warn("Orchestrator already running — ignoring duplicate start");
    return;
  }
  orchestratorRunning = true;
  runOrchestratorLoop().catch(err => {
    logger.error({ err }, "Orchestrator loop crashed — restarting in 10s");
    orchestratorRunning = false;
    setTimeout(() => {
      orchestratorRunning = true;
      runOrchestratorLoop().catch(() => {});
    }, 10_000);
  });
}
