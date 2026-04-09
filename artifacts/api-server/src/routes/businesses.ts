import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, businessesTable } from "@workspace/db";
import {
  CreateBusinessBody,
  UpdateBusinessBody,
  GetBusinessParams,
  UpdateBusinessParams,
  DeleteBusinessParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  const businesses = await db
    .select()
    .from(businessesTable)
    .orderBy(businessesTable.rank);
  res.json(businesses);
});

router.post("/", async (req, res) => {
  const parsed = CreateBusinessBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [business] = await db
    .insert(businessesTable)
    .values(parsed.data)
    .returning();
  res.status(201).json(business);
});

router.get("/:id", async (req, res) => {
  const parsed = GetBusinessParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [business] = await db
    .select()
    .from(businessesTable)
    .where(eq(businessesTable.id, parsed.data.id));
  if (!business) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(business);
});

router.patch("/:id", async (req, res) => {
  const paramsParsed = UpdateBusinessParams.safeParse({ id: Number(req.params.id) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = UpdateBusinessBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }
  const [updated] = await db
    .update(businessesTable)
    .set({ ...bodyParsed.data, updatedAt: new Date() })
    .where(eq(businessesTable.id, paramsParsed.data.id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const parsed = DeleteBusinessParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  await db.delete(businessesTable).where(eq(businessesTable.id, parsed.data.id));
  res.status(204).end();
});

export default router;
