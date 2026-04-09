import { eq, inArray, and } from "drizzle-orm";
import { db, tasksTable, taskCommentsTable, businessesTable, businessArtifactsTable, businessSitesTable, outreachEmailsTable, skillsTable, knowledgeBaseEntriesTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { listMessages, sendEmail } from "../lib/agentmail";
import { sendScheduledEmails } from "../routes/email";
import { logger } from "../lib/logger";

// ─── Constants ────────────────────────────────────────────────────────────────

const MONITOR_INTERVAL_MS = 30_000;          // Orchestrator checks every 30s
const TASK_WORK_INTERVAL_MS = 2.5 * 60_000; // Each task gets a new work cycle every 2.5 min
const STALL_THRESHOLD_MS = 6 * 60_000;      // After 6 min with no update, task is considered stalled
const INBOX_CHECK_INTERVAL_MS = 5 * 60_000; // Check inboxes every 5 min
const SCHEDULED_EMAIL_INTERVAL_MS = 60 * 60_000; // Send scheduled emails every hour

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

## FINANCIAL SAFEGUARDS — NON-NEGOTIABLE:
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
      logger.warn({ count: waitingTasks.length }, "Orchestrator: all tasks blocked on approval — waiting for owner");
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
