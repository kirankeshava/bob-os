import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, businessArtifactsTable } from "@workspace/db";

const router = Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) {
    res.status(400).json({ error: "Invalid businessId" });
    return;
  }
  const artifacts = await db
    .select()
    .from(businessArtifactsTable)
    .where(eq(businessArtifactsTable.businessId, businessId))
    .orderBy(desc(businessArtifactsTable.createdAt));
  res.json(artifacts);
});

export default router;
