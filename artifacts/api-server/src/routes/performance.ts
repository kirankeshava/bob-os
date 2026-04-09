import { Router } from "express";
import { eq, and } from "drizzle-orm";
import {
  db,
  businessPerformanceTable,
  customerFeedbackTable,
  competitorsTable,
  businessesTable,
} from "@workspace/db";

const router = Router({ mergeParams: true });

const VALID_SENTIMENTS = ["positive", "neutral", "negative"] as const;

const PERF_ALLOWED_FIELDS = [
  "income", "monthlySpend", "netBurnProfit", "runwayDays",
  "reached", "signups", "activeUsers", "arpu", "churnRate",
  "npsScore", "healthScore", "topSources", "notes",
] as const;

async function validateBusinessExists(businessId: number): Promise<boolean> {
  const [biz] = await db.select({ id: businessesTable.id }).from(businessesTable).where(eq(businessesTable.id, businessId));
  return !!biz;
}

router.get("/", async (req, res) => {
  const businessId = Number(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  if (!(await validateBusinessExists(businessId))) {
    res.status(404).json({ error: "Business not found" }); return;
  }

  let [perf] = await db
    .select()
    .from(businessPerformanceTable)
    .where(eq(businessPerformanceTable.businessId, businessId));

  if (!perf) {
    [perf] = await db
      .insert(businessPerformanceTable)
      .values({ businessId })
      .returning();
  }

  res.json(perf);
});

router.patch("/", async (req, res) => {
  const businessId = Number(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  if (!(await validateBusinessExists(businessId))) {
    res.status(404).json({ error: "Business not found" }); return;
  }

  let [perf] = await db
    .select()
    .from(businessPerformanceTable)
    .where(eq(businessPerformanceTable.businessId, businessId));

  if (!perf) {
    [perf] = await db
      .insert(businessPerformanceTable)
      .values({ businessId })
      .returning();
  }

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  for (const field of PERF_ALLOWED_FIELDS) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  if (updateData.healthScore && !["green", "yellow", "red"].includes(updateData.healthScore as string)) {
    res.status(400).json({ error: "healthScore must be green, yellow, or red" }); return;
  }

  const [updated] = await db
    .update(businessPerformanceTable)
    .set(updateData)
    .where(eq(businessPerformanceTable.businessId, businessId))
    .returning();

  res.json(updated);
});

router.get("/feedback", async (req, res) => {
  const businessId = Number(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const feedback = await db
    .select()
    .from(customerFeedbackTable)
    .where(eq(customerFeedbackTable.businessId, businessId))
    .orderBy(customerFeedbackTable.date);

  res.json(feedback);
});

router.post("/feedback", async (req, res) => {
  const businessId = Number(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const { source, text, sentiment, date } = req.body;
  if (!text || !sentiment) { res.status(400).json({ error: "text and sentiment are required" }); return; }
  if (!VALID_SENTIMENTS.includes(sentiment)) {
    res.status(400).json({ error: "sentiment must be positive, neutral, or negative" }); return;
  }

  const [entry] = await db
    .insert(customerFeedbackTable)
    .values({
      businessId,
      source: source || null,
      text,
      sentiment,
      date: date ? new Date(date) : new Date(),
    })
    .returning();

  res.status(201).json(entry);
});

router.delete("/feedback/:feedbackId", async (req, res) => {
  const businessId = Number(req.params.businessId);
  const feedbackId = Number(req.params.feedbackId);
  if (isNaN(businessId) || isNaN(feedbackId)) { res.status(400).json({ error: "Invalid id" }); return; }

  await db
    .delete(customerFeedbackTable)
    .where(
      and(
        eq(customerFeedbackTable.id, feedbackId),
        eq(customerFeedbackTable.businessId, businessId)
      )
    );

  res.status(204).send();
});

router.get("/competitors", async (req, res) => {
  const businessId = Number(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const competitors = await db
    .select()
    .from(competitorsTable)
    .where(eq(competitorsTable.businessId, businessId))
    .orderBy(competitorsTable.name);

  res.json(competitors);
});

router.post("/competitors", async (req, res) => {
  const businessId = Number(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const { name, strengths, weaknesses, pricing, notes } = req.body;
  if (!name) { res.status(400).json({ error: "name is required" }); return; }

  const [entry] = await db
    .insert(competitorsTable)
    .values({
      businessId,
      name,
      strengths: strengths || null,
      weaknesses: weaknesses || null,
      pricing: pricing || null,
      notes: notes || null,
    })
    .returning();

  res.status(201).json(entry);
});

router.delete("/competitors/:competitorId", async (req, res) => {
  const businessId = Number(req.params.businessId);
  const competitorId = Number(req.params.competitorId);
  if (isNaN(businessId) || isNaN(competitorId)) { res.status(400).json({ error: "Invalid id" }); return; }

  await db
    .delete(competitorsTable)
    .where(
      and(
        eq(competitorsTable.id, competitorId),
        eq(competitorsTable.businessId, businessId)
      )
    );

  res.status(204).send();
});

export default router;
