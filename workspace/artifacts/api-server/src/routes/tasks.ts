import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, tasksTable } from "@workspace/db";
import {
  ListBusinessTasksParams,
  CreateTaskBody,
  CreateTaskParams,
  GetTaskParams,
  UpdateTaskParams,
  UpdateTaskBody,
  DeleteTaskParams,
} from "@workspace/api-zod";
import { dispatchTaskNow } from "../services/task-executor";

const router = Router();

router.get("/businesses/:id/tasks", async (req, res) => {
  const parsed = ListBusinessTasksParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const tasks = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.businessId, parsed.data.id))
    .orderBy(tasksTable.createdAt);
  res.json(tasks);
});

router.post("/businesses/:id/tasks", async (req, res) => {
  const paramsParsed = CreateTaskParams.safeParse({ id: Number(req.params.id) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = CreateTaskBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }
  const [task] = await db
    .insert(tasksTable)
    .values({ ...bodyParsed.data, businessId: paramsParsed.data.id })
    .returning();
  res.status(201).json(task);
});

router.get("/tasks/:id", async (req, res) => {
  const parsed = GetTaskParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [task] = await db
    .select()
    .from(tasksTable)
    .where(eq(tasksTable.id, parsed.data.id));
  if (!task) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(task);
});

router.patch("/tasks/:id", async (req, res) => {
  const paramsParsed = UpdateTaskParams.safeParse({ id: Number(req.params.id) });
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = UpdateTaskBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  // Capture previous status so we can detect approval/activation
  const [before] = await db.select().from(tasksTable).where(eq(tasksTable.id, paramsParsed.data.id));

  const [updated] = await db
    .update(tasksTable)
    .set({ ...bodyParsed.data, updatedAt: new Date() })
    .where(eq(tasksTable.id, paramsParsed.data.id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  // If the task just became in_progress (approval granted or manually started), kick it off now
  if (updated.status === "in_progress" && before?.status !== "in_progress") {
    dispatchTaskNow(updated.id);
  }

  res.json(updated);
});

router.delete("/tasks/:id", async (req, res) => {
  const parsed = DeleteTaskParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  await db.delete(tasksTable).where(eq(tasksTable.id, parsed.data.id));
  res.status(204).end();
});

export default router;
