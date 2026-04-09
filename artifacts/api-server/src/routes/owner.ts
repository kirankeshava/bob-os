import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, businessesTable, tasksTable, taskCommentsTable, agentRunsTable, businessSitesTable, knowledgeBaseEntriesTable } from "@workspace/db";

const router = Router();

router.get("/dashboard", async (_req, res) => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const sixHoursMs = 6 * 60 * 60 * 1000;
  const staleThresholdMs = 2 * 60 * 60 * 1000;

  const businesses = await db.select().from(businessesTable).orderBy(businessesTable.rank);
  const allTasks = await db.select().from(tasksTable).orderBy(tasksTable.updatedAt);
  const allSites = await db.select().from(businessSitesTable);
  const allKb = await db.select().from(knowledgeBaseEntriesTable);

  const waitingTasks = allTasks.filter((t) => t.status === "waiting_approval");
  const inProgressTasks = allTasks.filter((t) => t.status === "in_progress");
  const openTasks = allTasks.filter((t) => t.status === "open");

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

  interface ActionItem {
    priority: number;
    category: string;
    taskId: number | null;
    businessId: number;
    businessName: string;
    title: string;
    description: string;
    agentType: string | null;
    color: string;
    icon: string;
    urgency: "critical" | "high" | "medium" | "low";
    waitMins: number;
    actionNeeded: string;
    whyBlocked: string;
    valueAdd: string;
    latestCommentContent: string | null;
    updatedAt: string;
  }

  const ownerActionItems: ActionItem[] = [];

  for (const task of waitingTasks) {
    const business = businesses.find((b) => b.id === task.businessId);
    const agentComment = agentCommentsByTask.get(task.id) ?? null;
    const latestComment = latestCommentsByTask.get(task.id) ?? null;
    const waitMs = now - new Date(task.updatedAt).getTime();
    const waitMins = Math.floor(waitMs / 60000);

    const taskText = `${task.title} ${task.description ?? ""}`.toLowerCase();
    const isPayment = /\$[\d,]+|budget|spend|payment|fund|invest|cost|fee|money/.test(taskText);

    let actionNeeded = "";
    let whyBlocked = "";
    let valueAdd = "";

    if (agentComment) {
      const content = agentComment.content;
      const actionMatch = content.match(/action[:\s]+([^\n]+)/i) ??
        content.match(/needs?[:\s]+([^\n]+)/i) ??
        content.match(/please[:\s]+([^\n]+)/i);
      actionNeeded = actionMatch ? actionMatch[1].trim().slice(0, 120) : content.split("\n").find((l) => l.trim().length > 10)?.trim().slice(0, 120) ?? "Review and approve this task";

      const whyMatch = content.match(/why[:\s]+([^\n]+)/i) ?? content.match(/blocked[:\s]+([^\n]+)/i);
      whyBlocked = whyMatch ? whyMatch[1].trim().slice(0, 120) : isPayment ? "Requires financial authorization" : "Requires owner decision";

      const valueMatch = content.match(/value[:\s]+([^\n]+)/i) ?? content.match(/impact[:\s]+([^\n]+)/i) ?? content.match(/unlock[s]?[:\s]+([^\n]+)/i);
      valueAdd = valueMatch ? valueMatch[1].trim().slice(0, 120) : `Unblocks ${task.agentType ?? "agent"} on ${business?.name ?? "this project"}`;
    } else {
      actionNeeded = isPayment ? `Approve spend: ${task.title}` : `Review & approve: ${task.title}`;
      whyBlocked = isPayment ? "Requires financial authorization" : "Requires owner decision";
      valueAdd = `Unblocks progress on ${business?.name ?? "this project"}`;
    }

    let urgency: "critical" | "high" | "medium" | "low" = "low";
    if (waitMins >= 60 * 24) urgency = "critical";
    else if (waitMins >= 60 * 4) urgency = "high";
    else if (waitMins >= 60) urgency = "medium";

    ownerActionItems.push({
      priority: isPayment ? 0 : 1,
      category: isPayment ? "payment_approval" : "approval",
      taskId: task.id,
      businessId: task.businessId,
      businessName: business?.name ?? "Unknown",
      title: task.title,
      description: task.description ?? "",
      agentType: task.agentType,
      color: isPayment ? "red" : "amber",
      icon: isPayment ? "dollar" : "shield",
      urgency,
      waitMins,
      actionNeeded,
      whyBlocked,
      valueAdd,
      latestCommentContent: latestComment?.content ?? null,
      updatedAt: task.updatedAt.toISOString(),
    });
  }

  for (const task of [...inProgressTasks, ...openTasks]) {
    if (task.priority === "critical") {
      const business = businesses.find((b) => b.id === task.businessId);
      ownerActionItems.push({
        priority: 2,
        category: "critical_task",
        taskId: task.id,
        businessId: task.businessId,
        businessName: business?.name ?? "Unknown",
        title: task.title,
        description: task.description ?? "",
        agentType: task.agentType,
        color: "red",
        icon: "flame",
        urgency: "high",
        waitMins: 0,
        actionNeeded: `Monitor critical task: ${task.title}`,
        whyBlocked: `Status: ${task.status} — needs attention due to critical priority`,
        valueAdd: `Directly impacts revenue target for ${business?.name ?? "this project"}`,
        latestCommentContent: latestCommentsByTask.get(task.id)?.content ?? null,
        updatedAt: task.updatedAt.toISOString(),
      });
    }
  }

  for (const task of openTasks.filter((t) => t.priority === "high")) {
    const business = businesses.find((b) => b.id === task.businessId);
    ownerActionItems.push({
      priority: 3,
      category: "high_priority_unstarted",
      taskId: task.id,
      businessId: task.businessId,
      businessName: business?.name ?? "Unknown",
      title: task.title,
      description: task.description ?? "",
      agentType: task.agentType,
      color: "orange",
      icon: "alert",
      urgency: "medium",
      waitMins: 0,
      actionNeeded: `High-priority task not started: ${task.title}`,
      whyBlocked: "Sitting in Open queue — not yet picked up by an agent",
      valueAdd: `Getting this started accelerates ${business?.name ?? "this project"}`,
      latestCommentContent: null,
      updatedAt: task.updatedAt.toISOString(),
    });
  }

  for (const task of inProgressTasks) {
    const lastUpdate = task.lastProgressUpdate ? new Date(task.lastProgressUpdate).getTime() : 0;
    if (lastUpdate > 0 && now - lastUpdate > staleThresholdMs && task.priority !== "critical") {
      const business = businesses.find((b) => b.id === task.businessId);
      const staleHours = Math.floor((now - lastUpdate) / (60 * 60 * 1000));
      ownerActionItems.push({
        priority: 4,
        category: "stale_task",
        taskId: task.id,
        businessId: task.businessId,
        businessName: business?.name ?? "Unknown",
        title: task.title,
        description: task.description ?? "",
        agentType: task.agentType,
        color: "yellow",
        icon: "clock",
        urgency: staleHours >= 24 ? "high" : "medium",
        waitMins: staleHours * 60,
        actionNeeded: `Stale for ${staleHours}h — may need a nudge or reassignment`,
        whyBlocked: "No progress update received — agent may be stuck",
        valueAdd: `Re-activating this keeps ${business?.name ?? "this project"} on track`,
        latestCommentContent: latestCommentsByTask.get(task.id)?.content ?? null,
        updatedAt: task.updatedAt.toISOString(),
      });
    }
  }

  for (const biz of businesses) {
    const hasSite = allSites.some((s) => s.businessId === biz.id);
    const kbCount = allKb.filter((k) => k.businessId === biz.id).length;

    if (!hasSite) {
      ownerActionItems.push({
        priority: 5,
        category: "setup_gap",
        taskId: null,
        businessId: biz.id,
        businessName: biz.name,
        title: "Generate public website",
        description: "",
        agentType: null,
        color: "blue",
        icon: "globe",
        urgency: "low",
        waitMins: 0,
        actionNeeded: "Generate a public website to start acquiring customers",
        whyBlocked: "No website exists — prospects have nowhere to convert",
        valueAdd: "Enables inbound leads and gives outreach credibility",
        latestCommentContent: null,
        updatedAt: new Date().toISOString(),
      });
    }

    if (kbCount === 0 && hasSite) {
      ownerActionItems.push({
        priority: 6,
        category: "setup_gap",
        taskId: null,
        businessId: biz.id,
        businessName: biz.name,
        title: "Add knowledge base content",
        description: "",
        agentType: null,
        color: "purple",
        icon: "book",
        urgency: "low",
        waitMins: 0,
        actionNeeded: "Add knowledge base entries so AI responses are grounded",
        whyBlocked: "Empty knowledge base — AI can't answer business-specific questions",
        valueAdd: "Improves customer support quality and agent autonomy",
        latestCommentContent: null,
        updatedAt: new Date().toISOString(),
      });
    }
  }

  ownerActionItems.sort((a, b) => a.priority - b.priority || b.waitMins - a.waitMins);

  const agentRoster: Array<{
    agentType: string;
    businessId: number;
    businessName: string;
    currentTask: { taskId: number; title: string; status: string } | null;
    lastUpdate: string;
    status: string;
  }> = [];

  const seenAgentBiz = new Set<string>();
  for (const task of inProgressTasks) {
    const key = `${task.agentType ?? "agent"}-${task.businessId}`;
    if (seenAgentBiz.has(key)) continue;
    seenAgentBiz.add(key);

    const biz = businesses.find((b) => b.id === task.businessId);
    agentRoster.push({
      agentType: task.agentType ?? "agent",
      businessId: task.businessId,
      businessName: biz?.name ?? "Unknown",
      currentTask: { taskId: task.id, title: task.title, status: task.status },
      lastUpdate: (task.lastProgressUpdate ?? task.updatedAt).toISOString(),
      status: "working",
    });
  }

  const activeAgentsByBusiness = new Map<number, number>();
  for (const item of agentRoster) {
    activeAgentsByBusiness.set(item.businessId, (activeAgentsByBusiness.get(item.businessId) ?? 0) + 1);
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

  const totalWaiting = waitingTasks.length;
  const avgWaitMins = totalWaiting > 0
    ? Math.round(waitingTasks.reduce((s, t) => s + Math.floor((now - new Date(t.updatedAt).getTime()) / 60000), 0) / totalWaiting)
    : 0;
  const activeAgentsCount = agentRoster.length;
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
    ownerActionItems,
    waitingApprovalItems: ownerActionItems.filter((i) => i.category === "payment_approval" || i.category === "approval"),
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
      totalActionItems: ownerActionItems.length,
    },
    recentApprovals,
  });
});

export default router;
