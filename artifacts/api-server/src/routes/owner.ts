import { Router } from "express";
import { eq, desc, and, lt, gte } from "drizzle-orm";
import { db, businessesTable, tasksTable, taskCommentsTable, agentRunsTable } from "@workspace/db";

const router = Router();

router.get("/dashboard", async (_req, res) => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const sixHoursMs = 6 * 60 * 60 * 1000;

  const businesses = await db.select().from(businessesTable).orderBy(businessesTable.rank);
  const allTasks = await db.select().from(tasksTable).orderBy(tasksTable.updatedAt);

  const waitingTasks = allTasks.filter((t) => t.status === "waiting_approval");

  const allComments = await db
    .select()
    .from(taskCommentsTable)
    .orderBy(desc(taskCommentsTable.createdAt));

  const agentCommentsByTask = new Map<number, typeof allComments[0]>();
  for (const comment of allComments) {
    if (!agentCommentsByTask.has(comment.taskId)) {
      const isAgent = comment.author === "orchestrator" || comment.author === "agent";
      if (isAgent) {
        agentCommentsByTask.set(comment.taskId, comment);
      }
    }
  }

  const latestCommentsByTask = new Map<number, typeof allComments[0]>();
  for (const comment of allComments) {
    if (!latestCommentsByTask.has(comment.taskId)) {
      latestCommentsByTask.set(comment.taskId, comment);
    }
  }

  const waitingApprovalItems = waitingTasks.map((task) => {
    const business = businesses.find((b) => b.id === task.businessId);
    const agentComment = agentCommentsByTask.get(task.id) ?? null;
    const latestComment = latestCommentsByTask.get(task.id) ?? null;
    const waitMs = now - new Date(task.updatedAt).getTime();
    const waitMins = Math.floor(waitMs / 60000);

    let actionNeeded = "";
    let whyBlocked = "";
    let valueAdd = "";

    if (agentComment) {
      const content = agentComment.content;

      const actionMatch = content.match(/action[:\s]+([^\n]+)/i) ??
        content.match(/needs?[:\s]+([^\n]+)/i) ??
        content.match(/please[:\s]+([^\n]+)/i) ??
        content.match(/requesting[:\s]+([^\n]+)/i);
      if (actionMatch) {
        actionNeeded = actionMatch[1].trim().slice(0, 120);
      } else {
        const firstLine = content.split("\n").find((l) => l.trim().length > 10);
        actionNeeded = firstLine ? firstLine.trim().slice(0, 120) : "Review and approve this task";
      }

      const whyMatch = content.match(/why[:\s]+([^\n]+)/i) ??
        content.match(/because[:\s]+([^\n]+)/i) ??
        content.match(/reason[:\s]+([^\n]+)/i) ??
        content.match(/blocked[:\s]+([^\n]+)/i);
      if (whyMatch) {
        whyBlocked = whyMatch[1].trim().slice(0, 120);
      } else {
        const taskDesc = task.description ?? "";
        const isPayment = taskDesc.match(/\$[\d,]+|budget|spend|payment|fund|invest/i);
        const isAccount = taskDesc.match(/account|sign.?up|register|platform|profile/i);
        if (isPayment) {
          whyBlocked = "Requires financial authorization — spending real money";
        } else if (isAccount) {
          whyBlocked = "Needs owner credentials or external account access";
        } else {
          whyBlocked = "Requires owner decision before agent can continue";
        }
      }

      const valueMatch = content.match(/value[:\s]+([^\n]+)/i) ??
        content.match(/impact[:\s]+([^\n]+)/i) ??
        content.match(/benefit[:\s]+([^\n]+)/i) ??
        content.match(/unlock[s]?[:\s]+([^\n]+)/i) ??
        content.match(/enable[s]?[:\s]+([^\n]+)/i);
      if (valueMatch) {
        valueAdd = valueMatch[1].trim().slice(0, 120);
      } else {
        valueAdd = `Unblocks ${task.agentType ?? "agent"} from continuing on ${business?.name ?? "this project"}`;
      }
    } else {
      const taskDesc = task.description ?? "";
      actionNeeded = `Review and approve: ${task.title}`;
      const isPayment = taskDesc.match(/\$[\d,]+|budget|spend|payment|fund|invest/i);
      whyBlocked = isPayment
        ? "Requires financial authorization — spending real money"
        : "Requires owner decision before agent can continue";
      valueAdd = `Unblocks progress on ${business?.name ?? "this project"}`;
    }

    let urgency: "critical" | "high" | "medium" | "low" = "low";
    if (waitMins >= 60 * 24) urgency = "critical";
    else if (waitMins >= 60 * 4) urgency = "high";
    else if (waitMins >= 60) urgency = "medium";

    return {
      taskId: task.id,
      businessId: task.businessId,
      businessName: business?.name ?? "Unknown",
      title: task.title,
      agentType: task.agentType ?? "agent",
      assignedAgent: task.assignedAgent ?? null,
      priority: task.priority,
      waitMins,
      urgency,
      actionNeeded,
      whyBlocked,
      valueAdd,
      latestCommentContent: latestComment?.content ?? null,
      updatedAt: task.updatedAt.toISOString(),
    };
  });

  waitingApprovalItems.sort((a, b) => b.waitMins - a.waitMins);

  const activeAgentRuns = await db
    .select()
    .from(agentRunsTable)
    .where(eq(agentRunsTable.status, "running"))
    .orderBy(desc(agentRunsTable.updatedAt));

  const activeAgentsByBusiness = new Map<number, number>();
  for (const run of activeAgentRuns) {
    if (run.businessId != null) {
      activeAgentsByBusiness.set(run.businessId, (activeAgentsByBusiness.get(run.businessId) ?? 0) + 1);
    }
  }

  const projectHealth = businesses.map((biz) => {
    const tasks = allTasks.filter((t) => t.businessId === biz.id);
    const totalTasks = tasks.length;
    const closedTasks = tasks.filter((t) => t.status === "closed").length;
    const waitingCount = tasks.filter((t) => t.status === "waiting_approval").length;
    const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
    const completionPct = totalTasks > 0 ? Math.round((closedTasks / totalTasks) * 100) : 0;
    const activeAgentsCount = activeAgentsByBusiness.get(biz.id) ?? 0;

    const mostRecentUpdate = tasks.reduce((latest, t) => {
      const d = new Date(t.updatedAt).getTime();
      return d > latest ? d : latest;
    }, 0);
    const daysSinceProgress = mostRecentUpdate > 0
      ? Math.floor((now - mostRecentUpdate) / oneDayMs)
      : -1;

    const allWaiting = totalTasks > 0 && tasks.every((t) => t.status === "waiting_approval");
    const noActivity = totalTasks > 0 && daysSinceProgress >= 1;
    let stallStatus: "stalled_waiting" | "stalled_inactive" | "healthy" | "no_tasks" = "no_tasks";
    if (totalTasks === 0) {
      stallStatus = "no_tasks";
    } else if (allWaiting || (waitingCount > 0 && inProgressCount === 0 && waitingCount === totalTasks - closedTasks)) {
      stallStatus = "stalled_waiting";
    } else if (noActivity) {
      stallStatus = "stalled_inactive";
    } else {
      stallStatus = "healthy";
    }

    return {
      businessId: biz.id,
      businessName: biz.name,
      businessStatus: biz.status,
      totalTasks,
      completionPct,
      waitingCount,
      inProgressCount,
      closedCount: closedTasks,
      activeAgentsCount,
      daysSinceProgress,
      stallStatus,
    };
  });

  const agentRoster = activeAgentRuns.map((run) => {
    const biz = businesses.find((b) => b.id === run.businessId);
    const currentTask = allTasks.find(
      (t) => t.businessId === run.businessId && t.status === "in_progress" && t.agentType === run.agentType
    );
    return {
      runId: run.id,
      agentType: run.agentType,
      businessId: run.businessId,
      businessName: biz?.name ?? "Global",
      currentTask: currentTask ? { taskId: currentTask.id, title: currentTask.title, status: currentTask.status } : null,
      lastUpdate: run.updatedAt.toISOString(),
      status: run.status,
    };
  });

  const totalWaiting = waitingApprovalItems.length;
  const avgWaitMins = totalWaiting > 0
    ? Math.round(waitingApprovalItems.reduce((s, t) => s + t.waitMins, 0) / totalWaiting)
    : 0;
  const activeAgentsCount = activeAgentRuns.length;
  const projectsAtRisk = projectHealth.filter(
    (p) => p.stallStatus === "stalled_waiting" || p.stallStatus === "stalled_inactive"
  ).length;

  const sixHoursAgo = new Date(now - sixHoursMs);
  const recentlyWaiting = allTasks.filter(
    (t) => t.status === "waiting_approval" && new Date(t.updatedAt) >= sixHoursAgo
  ).length;
  const olderWaiting = totalWaiting - recentlyWaiting;
  let waitingTrend: "increasing" | "decreasing" | "stable" = "stable";
  if (recentlyWaiting > 0 && olderWaiting === 0) waitingTrend = "increasing";
  else if (olderWaiting > recentlyWaiting) waitingTrend = "decreasing";
  else if (recentlyWaiting > olderWaiting && totalWaiting > 1) waitingTrend = "increasing";

  const startDate = new Date("2026-04-08");
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now) / oneDayMs));
  const initialBudget = 1000;
  const budgetUsed = 0;
  const budgetUtilizationPct = Math.round((budgetUsed / initialBudget) * 100);
  const runwayDays = daysRemaining;

  const recentApprovals = allTasks
    .filter((t) => t.status === "in_progress" || t.status === "closed")
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10)
    .map((t) => {
      const biz = businesses.find((b) => b.id === t.businessId);
      return {
        taskId: t.id,
        businessId: t.businessId,
        businessName: biz?.name ?? "Unknown",
        title: t.title,
        status: t.status,
        updatedAt: t.updatedAt.toISOString(),
      };
    });

  res.json({
    waitingApprovalItems,
    projectHealth,
    agentRoster,
    portfolioMetrics: {
      totalWaiting,
      waitingTrend,
      avgWaitMins,
      activeAgentsCount,
      projectsAtRisk,
      budgetUsed,
      initialBudget,
      budgetUtilizationPct,
      runwayDays,
      daysRemaining,
    },
    recentApprovals,
  });
});

export default router;
