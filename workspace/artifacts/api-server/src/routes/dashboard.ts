import { Router } from "express";
import { eq, count, sql, and } from "drizzle-orm";
import { db, businessesTable, tasksTable, agentRunsTable } from "@workspace/db";

const router = Router();

router.get("/agent-activity", async (_req, res) => {
  const businesses = await db.select().from(businessesTable).orderBy(businessesTable.rank);
  const result = [];

  for (const biz of businesses) {
    const tasks = await db.select().from(tasksTable).where(eq(tasksTable.businessId, biz.id));
    const activeTasks = tasks
      .filter((t) => t.status === "in_progress")
      .map((t) => ({
        taskId: t.id,
        title: t.title,
        agentType: t.agentType,
        assignedAgent: t.assignedAgent,
        status: t.status,
        priority: t.priority,
        updatedAt: t.updatedAt.toISOString(),
      }));

    const openCount = tasks.filter((t) => t.status === "open").length;
    const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
    const closedCount = tasks.filter((t) => t.status === "closed").length;

    result.push({
      businessId: biz.id,
      businessName: biz.name,
      businessStatus: biz.status,
      activeTasks,
      totalTasks: tasks.length,
      openCount,
      inProgressCount,
      closedCount,
    });
  }

  res.json(result);
});

router.get("/summary", async (req, res) => {
  const [businessStats] = await db
    .select({ count: count() })
    .from(businessesTable)
    .where(eq(businessesTable.status, "active"));

  const taskStats = await db
    .select({ status: tasksTable.status, count: count() })
    .from(tasksTable)
    .groupBy(tasksTable.status);

  const [agentStats] = await db
    .select({ count: count() })
    .from(agentRunsTable)
    .where(sql`${agentRunsTable.status} IN ('pending', 'running')`);

  const openTasks = taskStats.find((t) => t.status === "open")?.count ?? 0;
  const inProgressTasks = taskStats.find((t) => t.status === "in_progress")?.count ?? 0;
  const closedTasks = taskStats.find((t) => t.status === "closed")?.count ?? 0;
  const totalTasks = Number(openTasks) + Number(inProgressTasks) + Number(closedTasks);

  const startDate = new Date("2026-04-08");
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  res.json({
    totalBudget: 1000,
    totalRevenuePotential: "$100,000",
    activeBusinesses: Number(businessStats?.count ?? 0),
    totalTasks,
    openTasks: Number(openTasks),
    inProgressTasks: Number(inProgressTasks),
    closedTasks: Number(closedTasks),
    activeAgentRuns: Number(agentStats?.count ?? 0),
    daysRemaining,
  });
});

export default router;
