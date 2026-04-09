import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, taskCommentsTable } from "@workspace/db";
import {
  ListTaskCommentsParams,
  CreateTaskCommentParams,
  CreateTaskCommentBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/tasks/:id/comments", async (req, res) => {
  const parsed = ListTaskCommentsParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const comments = await db
    .select()
    .from(taskCommentsTable)
    .where(eq(taskCommentsTable.taskId, parsed.data.id))
    .orderBy(taskCommentsTable.createdAt);
  res.json(comments);
});

router.post("/tasks/:id/comments", async (req, res) => {
  const paramsParsed = CreateTaskCommentParams.safeParse({ id: Number(req.params.id) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = CreateTaskCommentBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }
  const [comment] = await db
    .insert(taskCommentsTable)
    .values({ ...bodyParsed.data, taskId: paramsParsed.data.id })
    .returning();
  res.status(201).json(comment);
});

export default router;
