import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, ceoReviewsTable } from "@workspace/db";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const [review] = await db
    .select()
    .from(ceoReviewsTable)
    .where(eq(ceoReviewsTable.businessId, businessId))
    .orderBy(desc(ceoReviewsTable.createdAt))
    .limit(1);

  if (!review) { res.status(404).json({ error: "No CEO review found" }); return; }

  res.json(review);
});

export default router;
