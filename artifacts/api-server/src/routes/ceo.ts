import { Router } from "express";
import { desc, asc } from "drizzle-orm";
import {
  db,
  businessesTable,
  tasksTable,
  ceoReviewsTable,
  businessArtifactsTable,
  ceoPlanTable,
  ceoChatMessagesTable,
} from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { CEO_SKILL_SUMMARY } from "../lib/ceo-skill";
import { logger } from "../lib/logger";

const router = Router();

// ─── CEO Plan ─────────────────────────────────────────────────────────────────

async function generateCeoPlan(): Promise<typeof ceoPlanTable.$inferInsert> {
  const businesses = await db.select().from(businessesTable).orderBy(asc(businessesTable.rank));
  const tasks = await db.select().from(tasksTable);
  const reviews = await db.select().from(ceoReviewsTable).orderBy(desc(ceoReviewsTable.createdAt)).limit(10);
  const artifacts = await db.select().from(businessArtifactsTable).orderBy(desc(businessArtifactsTable.createdAt)).limit(20);

  const businessSummary = businesses
    .map(b => `- ${b.name} (${b.status}): target ${b.targetRevenue30d}, platform ${b.platform}, investment ${b.investmentNeeded}`)
    .join("\n") || "No businesses yet";

  const taskSummary = (() => {
    const open = tasks.filter(t => t.status === "open").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    const closed = tasks.filter(t => t.status === "closed").length;
    const waiting = tasks.filter(t => t.status === "waiting_approval").length;
    return `${tasks.length} total tasks: ${open} open, ${inProgress} in-progress, ${closed} closed, ${waiting} awaiting approval`;
  })();

  const reviewSummary = reviews.slice(0, 5)
    .map(r => `[${r.createdAt.toISOString().slice(0, 10)}] ${r.mode} mode — ${r.oneMetric}: ${r.oneMetricValue}. Priority: ${r.topPriority}`)
    .join("\n") || "No CEO reviews yet";

  const artifactSummary = artifacts.slice(0, 10)
    .map(a => `[${a.artifactType}] ${a.title}`)
    .join("\n") || "No artifacts yet";

  const today = new Date().toISOString().slice(0, 10);
  const startDate = new Date("2026-04-08");
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  const prompt = `${CEO_SKILL_SUMMARY}

---

You are Bob, the AI CEO. Generate a comprehensive strategic CEO plan for the overall portfolio.

## Portfolio State (Today: ${today}, ${daysRemaining} days remaining to hit $100k)

### Active Businesses
${businessSummary}

### Task Status
${taskSummary}

### Recent CEO Reviews
${reviewSummary}

### Recent Work Artifacts
${artifactSummary}

---

Generate a strategic CEO plan in ONLY valid JSON format:
{
  "overallStrategy": "2-3 sentence high-level portfolio strategy for reaching $100k in 30 days",
  "goals": [
    {
      "title": "Goal title",
      "description": "Specific, measurable goal",
      "target": "Numeric target (e.g. '$10,000 revenue')",
      "deadline": "YYYY-MM-DD",
      "status": "on_track" | "at_risk" | "behind" | "achieved"
    }
  ],
  "milestones": [
    {
      "title": "Milestone title",
      "description": "What needs to happen",
      "targetDate": "YYYY-MM-DD",
      "completed": false,
      "progress": 0
    }
  ],
  "profitabilityStrategy": "3-5 sentences describing the path to profitability: pricing approach, cost structure, revenue streams, and the critical monetization levers",
  "gaps": [
    "Specific capability or resource gap (string)"
  ],
  "threats": [
    "Specific threat to business success (string)"
  ],
  "concerns": [
    "Specific concern Bob has about current trajectory (string)"
  ]
}

Rules:
- goals: 3-5 measurable goals with clear targets and deadlines within the 30-day window
- milestones: 4-7 key checkpoints on the path to $100k; mark completed=true and progress=100 if clearly achieved based on data
- profitabilityStrategy: be specific about the monetization path, not generic platitudes
- gaps/threats/concerns: minimum 2 each, maximum 5 each; be direct and specific, not generic`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    max_completion_tokens: 3000,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Failed to parse CEO plan JSON");

  const plan = JSON.parse(jsonMatch[0]);

  return {
    goals: plan.goals ?? [],
    milestones: plan.milestones ?? [],
    profitabilityStrategy: plan.profitabilityStrategy ?? "",
    gaps: plan.gaps ?? [],
    threats: plan.threats ?? [],
    concerns: plan.concerns ?? [],
    overallStrategy: plan.overallStrategy ?? "",
  };
}

router.get("/plan", async (_req, res) => {
  try {
    const [existing] = await db.select().from(ceoPlanTable).orderBy(desc(ceoPlanTable.generatedAt)).limit(1);

    if (existing) {
      res.json(existing);
      return;
    }

    logger.info("CEO plan: generating on first call");
    const planData = await generateCeoPlan();
    const [plan] = await db.insert(ceoPlanTable).values(planData).returning();
    res.json(plan);
  } catch (err) {
    logger.error({ err }, "CEO plan: failed to get/generate plan");
    res.status(500).json({ error: "Failed to load CEO plan" });
  }
});

router.post("/plan/refresh", async (_req, res) => {
  try {
    logger.info("CEO plan: regenerating on demand");
    const planData = await generateCeoPlan();
    const [plan] = await db.insert(ceoPlanTable).values(planData).returning();
    res.json(plan);
  } catch (err) {
    logger.error({ err }, "CEO plan: failed to refresh plan");
    res.status(500).json({ error: "Failed to refresh CEO plan" });
  }
});

// ─── CEO Chat ──────────────────────────────────────────────────────────────────

router.get("/chat", async (_req, res) => {
  try {
    const messages = await db
      .select()
      .from(ceoChatMessagesTable)
      .orderBy(asc(ceoChatMessagesTable.createdAt))
      .limit(100);
    res.json(messages);
  } catch (err) {
    logger.error({ err }, "CEO chat: failed to load messages");
    res.status(500).json({ error: "Failed to load chat history" });
  }
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string" || !message.trim()) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  try {
    // Save the user message
    await db.insert(ceoChatMessagesTable).values({ role: "user", content: message.trim() });

    // Build context
    const businesses = await db.select().from(businessesTable).orderBy(asc(businessesTable.rank)).limit(10);
    const tasks = await db.select().from(tasksTable).limit(50);
    const [latestPlan] = await db.select().from(ceoPlanTable).orderBy(desc(ceoPlanTable.generatedAt)).limit(1);
    const recentReviews = await db.select().from(ceoReviewsTable).orderBy(desc(ceoReviewsTable.createdAt)).limit(5);

    const businessSummary = businesses
      .map(b => `- ${b.name} (${b.status}): ${b.description.slice(0, 100)}, target ${b.targetRevenue30d}`)
      .join("\n") || "No businesses yet";

    const taskCounts = {
      open: tasks.filter(t => t.status === "open").length,
      inProgress: tasks.filter(t => t.status === "in_progress").length,
      closed: tasks.filter(t => t.status === "closed").length,
      waiting: tasks.filter(t => t.status === "waiting_approval").length,
    };

    const reviewContext = recentReviews.slice(0, 3)
      .map(r => `[${r.createdAt.toISOString().slice(0, 10)}] ${r.mode}: ${r.summary}`)
      .join("\n") || "No reviews yet";

    const planContext = latestPlan
      ? `Current Strategy: ${latestPlan.overallStrategy}\nTop Concerns: ${(latestPlan.concerns as string[]).join(", ")}`
      : "No formal plan generated yet";

    const today = new Date().toISOString().slice(0, 10);
    const startDate = new Date("2026-04-08");
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 30);
    const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

    const systemPrompt = `You are Bob, the AI CEO of a startup portfolio racing to $100k revenue in 30 days. Today is ${today} with ${daysRemaining} days remaining.

You speak with direct, strategic CEO-level insight. You are candid, data-driven, and focused on revenue. You do NOT give generic advice — you reference the actual portfolio state.

${CEO_SKILL_SUMMARY}

## Current Portfolio State
${businessSummary}

## Task Status
${taskCounts.open} open, ${taskCounts.inProgress} in-progress, ${taskCounts.closed} closed, ${taskCounts.waiting} awaiting approval

## Recent CEO Reviews
${reviewContext}

## CEO Plan Context
${planContext}

---

Respond in-character as Bob the CEO. Be direct, specific, and strategic. Reference actual data from the portfolio. Keep responses focused and actionable — under 200 words unless the question requires depth. Do not be a cheerleader; be an honest CEO.`;

    // Get recent chat history for context (last 10 messages)
    const recentHistory = await db
      .select()
      .from(ceoChatMessagesTable)
      .orderBy(desc(ceoChatMessagesTable.createdAt))
      .limit(10);

    const historyMessages: Array<{ role: "user" | "assistant"; content: string }> = recentHistory
      .reverse()
      .map(m => ({ role: m.role as "user" | "assistant", content: m.content }));

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      max_completion_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        ...historyMessages,
      ],
    });

    const assistantContent = response.choices[0]?.message?.content ?? "I'm unable to respond right now. Please try again.";

    // Save assistant response
    const [savedResponse] = await db
      .insert(ceoChatMessagesTable)
      .values({ role: "assistant", content: assistantContent })
      .returning();

    res.json({ message: savedResponse });
  } catch (err) {
    logger.error({ err }, "CEO chat: failed to generate response");
    res.status(500).json({ error: "Failed to generate CEO response" });
  }
});

export default router;
