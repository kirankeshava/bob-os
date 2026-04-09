import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, agentRunsTable, businessesTable, tasksTable, taskCommentsTable, skillsTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { GetAgentRunParams, TriggerOrchestrateParams } from "@workspace/api-zod";
import { logger } from "../lib/logger";
import { triggerExecutionCycle, dispatchTaskNow } from "../services/task-executor";
import { ensureInbox } from "../lib/agentmail";
import { CEO_SKILL_SUMMARY } from "../lib/ceo-skill";

const router = Router();

async function runResearchAgent(runId: number, prompt?: string | null) {
  await db
    .update(agentRunsTable)
    .set({ status: "running", log: "Researcher agents starting...\n", updatedAt: new Date() })
    .where(eq(agentRunsTable.id, runId));

  const systemPrompt = `You are Bob, an expert entrepreneur AI agent. Your goal is to research and identify the top 5 most profitable business ideas that can be started with $1000 and scaled to $100,000 revenue within 30 days.

Focus on:
- Freelance services on Fiverr, Upwork, Facebook, Craigslist
- Content creation on YouTube, TikTok
- Digital products and services
- AI-powered services
- Quick-turnaround opportunities

For each business, provide a detailed JSON analysis. Respond with ONLY a JSON array of exactly 5 business objects with this structure:
{
  "name": "Business name",
  "description": "2-3 sentence description",
  "marketSize": "$X billion",
  "tam": "$X million (serviceable)",
  "investmentNeeded": "$X",
  "targetRevenue30d": "$X,XXX",
  "effortLevel": "low|medium|high",
  "platform": "Fiverr, Upwork, YouTube, etc.",
  "rank": 1,
  "costBenefitScore": 8.5,
  "marketDemandScore": 9.0,
  "agentNotes": "Key insights and strategy from the research agent"
}`;

  const userMessage = prompt || "Find the top 5 most profitable business opportunities I can start today with $1000 and grow to $100k in 30 days. Focus on opportunities with the fastest time-to-revenue.";

  let log = "Researcher agents starting...\n";
  log += "Searching for business opportunities...\n";

  await db
    .update(agentRunsTable)
    .set({ log, updatedAt: new Date() })
    .where(eq(agentRunsTable.id, runId));

  const response = await openai.chat.completions.create({
    model: "gpt-5.2",
    max_completion_tokens: 8192,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
  });

  const content = response.choices[0]?.message?.content ?? "[]";
  log += "Analysis complete. Parsing results...\n";

  let businesses: Record<string, unknown>[] = [];
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      businesses = JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    log += `Failed to parse businesses: ${e}\n`;
    await db
      .update(agentRunsTable)
      .set({ status: "failed", log, result: content, updatedAt: new Date() })
      .where(eq(agentRunsTable.id, runId));
    return;
  }

  log += `Found ${businesses.length} business opportunities. Saving to database...\n`;

  for (const biz of businesses) {
    const [newBiz] = await db.insert(businessesTable).values({
      name: String(biz.name),
      description: String(biz.description),
      marketSize: String(biz.marketSize),
      tam: String(biz.tam),
      investmentNeeded: String(biz.investmentNeeded),
      targetRevenue30d: String(biz.targetRevenue30d),
      effortLevel: String(biz.effortLevel) as "low" | "medium" | "high",
      platform: String(biz.platform),
      rank: Number(biz.rank),
      costBenefitScore: Number(biz.costBenefitScore),
      marketDemandScore: Number(biz.marketDemandScore),
      agentNotes: String(biz.agentNotes),
      status: "planning",
    }).returning();
    log += `Created business: ${biz.name}\n`;

    // Fire-and-forget inbox provisioning
    ensureInbox(newBiz.id, newBiz.name).catch(err =>
      logger.error({ err, businessId: newBiz.id }, "Researcher: auto-provision inbox failed")
    );
  }

  await db
    .update(agentRunsTable)
    .set({ status: "completed", log, result: content, updatedAt: new Date() })
    .where(eq(agentRunsTable.id, runId));
}

async function runOrchestratorAgent(runId: number, businessId: number) {
  const [business] = await db
    .select()
    .from(businessesTable)
    .where(eq(businessesTable.id, businessId));

  if (!business) {
    await db
      .update(agentRunsTable)
      .set({ status: "failed", log: "Business not found", updatedAt: new Date() })
      .where(eq(agentRunsTable.id, runId));
    return;
  }

  await db
    .update(agentRunsTable)
    .set({ status: "running", log: `Orchestrator starting for: ${business.name}\n`, updatedAt: new Date() })
    .where(eq(agentRunsTable.id, runId));

  const existingTasks = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.businessId, businessId));

  const systemPrompt = `You are an expert Orchestrator AI agent managing a business project. You operate with CEO-level strategic discipline — you don't just break down tasks, you plan for revenue with focus and urgency.

${CEO_SKILL_SUMMARY}

---

Apply the CEO framework above when planning tasks. Specifically:
- **Prioritize distribution tasks first** — customers must be able to find and reach the business before anything else matters
- **Product second** — the core offer must work before optimizing
- **Revenue-generating tasks get CRITICAL priority** — outreach, sales, pitching, monetization setup
- **Only plan one layer at a time** — do not plan for hypothetical future stages
- **Assess default alive/dead** — if there's no revenue path in these tasks, flag it in the first task's description

Return ONLY a JSON array of task objects with this structure:
{
  "title": "Task title",
  "description": "Detailed description of what needs to be done",
  "agentType": "researcher|pm|marketer|developer|qa|copywriter|sales",
  "priority": "low|medium|high|critical",
  "estimatedHours": 4,
  "deliverables": "What will be delivered when this task is done",
  "status": "open"
}

Create 5-8 actionable tasks across different agent types. The first 2 tasks MUST be distribution/outreach focused. Focus on tasks that directly and immediately drive revenue.`;

  const existingTaskList = existingTasks.map((t) => `- ${t.title} (${t.status})`).join("\n");

  const response = await openai.chat.completions.create({
    model: "gpt-5.2",
    max_completion_tokens: 8192,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Business: ${business.name}
Description: ${business.description}
Platform: ${business.platform}
Target Revenue (30 days): ${business.targetRevenue30d}
Investment Available: ${business.investmentNeeded}
Agent Notes: ${business.agentNotes || "None"}

Existing tasks:
${existingTaskList || "None yet"}

Create a comprehensive task plan to achieve the revenue target.`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content ?? "[]";
  let log = `Orchestrator starting for: ${business.name}\nGenerating task plan...\n`;

  let tasks: Record<string, unknown>[] = [];
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      tasks = JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    log += `Failed to parse tasks: ${e}\n`;
    await db
      .update(agentRunsTable)
      .set({ status: "failed", log, result: content, updatedAt: new Date() })
      .where(eq(agentRunsTable.id, runId));
    return;
  }

  log += `Creating ${tasks.length} tasks...\n`;

  const createdTasks: Array<{ id: number; title: string; agentType: string }> = [];

  for (const task of tasks) {
    const [newTask] = await db
      .insert(tasksTable)
      .values({
        businessId,
        title: String(task.title),
        description: String(task.description),
        agentType: String(task.agentType),
        assignedAgent: `${String(task.agentType).charAt(0).toUpperCase() + String(task.agentType).slice(1)} Agent`,
        priority: String(task.priority) as "low" | "medium" | "high" | "critical",
        estimatedHours: task.estimatedHours ? Number(task.estimatedHours) : null,
        deliverables: task.deliverables ? String(task.deliverables) : null,
        status: "open",
      })
      .returning();

    await db.insert(taskCommentsTable).values({
      taskId: newTask.id,
      author: "Orchestrator",
      agentType: "orchestrator",
      content: `Task created by Orchestrator Agent. Priority: ${task.priority}. Deliverable: ${task.deliverables || "See description"}`,
    });

    createdTasks.push({ id: newTask.id, title: newTask.title, agentType: newTask.agentType ?? "agent" });
    log += `Created task: ${task.title}\n`;
  }

  await db
    .update(businessesTable)
    .set({ status: "active", updatedAt: new Date() })
    .where(eq(businessesTable.id, businessId));

  // Proactive skill suggestion: check if installed skills would benefit the new tasks
  try {
    const activeSkills = await db.select().from(skillsTable).where(eq(skillsTable.status, "active"));
    const taskTypes = [...new Set(createdTasks.map(t => t.agentType))];
    const relevantSkills = activeSkills.filter(skill => {
      const skillText = `${skill.name} ${skill.description}`.toLowerCase();
      return taskTypes.some(type => skillText.includes(type));
    });

    if (relevantSkills.length > 0) {
      const skillNames = relevantSkills.map(s => s.name).join(", ");
      for (const task of createdTasks) {
        const matchingSkills = relevantSkills.filter(skill => {
          const skillText = `${skill.name} ${skill.description}`.toLowerCase();
          return skillText.includes(task.agentType) || skillText.includes(task.title.toLowerCase().split(" ")[0]);
        });
        if (matchingSkills.length > 0) {
          await db.insert(taskCommentsTable).values({
            taskId: task.id,
            author: "Orchestrator",
            agentType: "orchestrator",
            content: `**🧠 Skills injected:** The following skills will augment this agent: ${matchingSkills.map(s => `**${s.name}**`).join(", ")}. Their instructions have been added to the agent's context automatically.`,
          });
        }
      }
      log += `Skill suggestion: ${skillNames} will augment relevant tasks.\n`;
    }
  } catch (skillErr) {
    logger.warn({ skillErr }, "Orchestrator: skill suggestion step failed");
  }

  // Auto-approve all created tasks: set status to in_progress and dispatch immediately
  for (const task of createdTasks) {
    try {
      await db
        .update(tasksTable)
        .set({ status: "in_progress", updatedAt: new Date() })
        .where(eq(tasksTable.id, task.id));

      await db.insert(taskCommentsTable).values({
        taskId: task.id,
        author: "Orchestrator",
        agentType: "orchestrator",
        content: `**🚀 Auto-approved by Orchestrator:** This task has been automatically set to in-progress and dispatched for immediate execution.`,
      });

      dispatchTaskNow(task.id);
      log += `Auto-approved and dispatched task: ${task.title}\n`;
    } catch (approveErr) {
      logger.warn({ approveErr, taskId: task.id }, "Orchestrator: failed to auto-approve task");
    }
  }

  await db
    .update(agentRunsTable)
    .set({ status: "completed", log, result: content, updatedAt: new Date() })
    .where(eq(agentRunsTable.id, runId));
}

router.post("/research", async (req, res) => {
  const { prompt } = req.body;
  const [run] = await db
    .insert(agentRunsTable)
    .values({ agentType: "researcher", status: "pending", log: "Research queued...", businessId: null })
    .returning();

  res.json({ runId: run.id, status: "pending" });

  runResearchAgent(run.id, prompt).catch((err) => {
    logger.error({ err }, "Research agent failed");
    db.update(agentRunsTable)
      .set({ status: "failed", log: `Error: ${err.message}`, updatedAt: new Date() })
      .where(eq(agentRunsTable.id, run.id))
      .catch(() => {});
  });
});

router.post("/orchestrate/:businessId", async (req, res) => {
  const parsed = TriggerOrchestrateParams.safeParse({ businessId: Number(req.params.businessId) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid businessId" });
    return;
  }

  const [run] = await db
    .insert(agentRunsTable)
    .values({
      agentType: "orchestrator",
      status: "pending",
      log: "Orchestration queued...",
      businessId: parsed.data.businessId,
    })
    .returning();

  res.json({ runId: run.id, status: "pending" });

  runOrchestratorAgent(run.id, parsed.data.businessId).catch((err) => {
    logger.error({ err }, "Orchestrator agent failed");
    db.update(agentRunsTable)
      .set({ status: "failed", log: `Error: ${err.message}`, updatedAt: new Date() })
      .where(eq(agentRunsTable.id, run.id))
      .catch(() => {});
  });
});

router.post("/execute-tasks", async (_req, res) => {
  res.json({ message: "Task execution cycle triggered" });
  triggerExecutionCycle().catch(err => logger.error({ err }, "Manual execution cycle failed"));
});

router.get("/runs", async (_req, res) => {
  const runs = await db
    .select()
    .from(agentRunsTable)
    .orderBy(desc(agentRunsTable.createdAt))
    .limit(50);
  res.json(runs);
});

router.get("/runs/:id", async (req, res) => {
  const parsed = GetAgentRunParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [run] = await db
    .select()
    .from(agentRunsTable)
    .where(eq(agentRunsTable.id, parsed.data.id));
  if (!run) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(run);
});

export default router;
