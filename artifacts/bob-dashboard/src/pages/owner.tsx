import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentBadge } from "@/components/agent-badge";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Loader2,
  X,
  MessageSquare,
  DollarSign,
  Banknote,
  UserPlus,
  ShieldAlert,
  Zap,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Target,
  BarChart2,
  Circle,
  ArrowRight,
  Filter,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatWait(mins: number): string {
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function parseOptions(content: string): string[] {
  const lines = content.split("\n");
  const options: string[] = [];
  for (const line of lines) {
    const match = line.match(/^(\d+[\.\)]\s+|[-*]\s+)(.+)$/);
    if (match) options.push(match[2].trim());
  }
  return options.length >= 2 ? options : [];
}

function parseCostImpact(content: string): string {
  const regex = /\*\*Cost Impact\*\*[:\s]*([^\n]+)/i;
  const match = content.match(regex);
  return match ? match[1].trim() : "";
}

type ApprovalType = "payment" | "account" | "other";

function detectApprovalType(title: string, description?: string | null): ApprovalType {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  if (text.match(/\$[\d,]+|budget|spend|payment|fund|invest|cost|fee|price|money|cash|transfer/))
    return "payment";
  if (text.match(/upwork|fiverr|linkedin|facebook|google ads|stripe|account|sign.?up|register|platform|profile/))
    return "account";
  return "other";
}

const APPROVAL_STYLES: Record<ApprovalType, {
  card: string; badge: string; icon: React.ElementType; label: string; pulseColor: string; title: string;
}> = {
  payment: {
    card: "border-red-500/60 bg-red-950/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]",
    badge: "bg-red-500/20 text-red-300 border-red-500/40",
    icon: Banknote,
    label: "PAYMENT REQUIRED",
    pulseColor: "bg-red-500",
    title: "text-red-300",
  },
  account: {
    card: "border-orange-500/50 bg-orange-950/15 shadow-[0_0_8px_rgba(249,115,22,0.1)]",
    badge: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    icon: UserPlus,
    label: "ACCOUNT CREATION",
    pulseColor: "bg-orange-500",
    title: "text-orange-300",
  },
  other: {
    card: "border-amber-500/40 bg-amber-500/5",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    icon: ShieldAlert,
    label: "NEEDS APPROVAL",
    pulseColor: "bg-amber-400",
    title: "text-amber-300",
  },
};

const URGENCY_CONFIG = {
  critical: { label: "24h+", color: "text-red-400", bg: "bg-red-500/20 border-red-500/40", pulse: true },
  high: { label: "4h+", color: "text-orange-400", bg: "bg-orange-500/20 border-orange-500/40", pulse: false },
  medium: { label: "1h+", color: "text-amber-400", bg: "bg-amber-500/20 border-amber-500/40", pulse: false },
  low: { label: "new", color: "text-green-400", bg: "bg-green-500/20 border-green-500/30", pulse: false },
};

interface WaitingTask {
  taskId: number;
  businessId: number;
  businessName: string;
  title: string;
  agentType: string;
  assignedAgent: string | null;
  priority: string;
  waitMins: number;
  urgency: "critical" | "high" | "medium" | "low";
  actionNeeded: string;
  whyBlocked: string;
  valueAdd: string;
  latestCommentContent: string | null;
  updatedAt: string;
}

interface ProjectHealth {
  businessId: number;
  businessName: string;
  businessStatus: string;
  totalTasks: number;
  completionPct: number;
  waitingCount: number;
  inProgressCount: number;
  closedCount: number;
  activeAgentsCount: number;
  daysSinceProgress: number;
  stallStatus: "stalled_waiting" | "stalled_inactive" | "healthy" | "no_tasks";
}

interface AgentRosterItem {
  runId: number;
  agentType: string;
  businessId: number | null;
  businessName: string;
  currentTask: { taskId: number; title: string; status: string } | null;
  lastUpdate: string;
  status: string;
}

interface PortfolioMetrics {
  totalWaiting: number;
  waitingTrend: "increasing" | "decreasing" | "stable";
  avgWaitMins: number;
  activeAgentsCount: number;
  projectsAtRisk: number;
  budgetUsed: number;
  initialBudget: number;
  budgetUtilizationPct: number;
  runwayDays: number;
  daysRemaining: number;
}

interface RecentApproval {
  taskId: number;
  businessId: number;
  businessName: string;
  title: string;
  status: string;
  updatedAt: string;
}

interface OwnerDashboard {
  waitingApprovalItems: WaitingTask[];
  projectHealth: ProjectHealth[];
  agentRoster: AgentRosterItem[];
  portfolioMetrics: PortfolioMetrics;
  recentApprovals: RecentApproval[];
}

interface InlineApproveProps {
  task: WaitingTask;
  onApproved: () => void;
  onRejected: () => void;
}

function InlineApprove({ task, onApproved, onRejected }: InlineApproveProps) {
  const [showInput, setShowInput] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const approvalType = detectApprovalType(task.title);
  const style = APPROVAL_STYLES[approvalType];
  const Icon = style.icon;

  const options = React.useMemo(
    () => (task.latestCommentContent ? parseOptions(task.latestCommentContent) : []),
    [task.latestCommentContent]
  );

  const costImpact = React.useMemo(
    () => (task.latestCommentContent ? parseCostImpact(task.latestCommentContent) : ""),
    [task.latestCommentContent]
  );

  useEffect(() => {
    if (showInput) textRef.current?.focus();
  }, [showInput]);

  const handleApprove = async () => {
    setIsApproving(true);
    let finalInstruction = instruction.trim();
    if (options.length >= 2) {
      const optionText = `Option selected: ${options[selectedOption]}`;
      finalInstruction = finalInstruction ? `${optionText}\n\n${finalInstruction}` : optionText;
    }

    try {
      await apiFetch(`/api/tasks/${task.taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "in_progress" }),
      });

      if (finalInstruction) {
        await apiFetch(`/api/tasks/${task.taskId}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: finalInstruction, author: "user" }),
        });
      }

      toast({ title: "Task Approved", description: `"${task.title}" is now unblocked.` });
      onApproved();
    } catch {
      toast({ title: "Error", description: "Failed to approve task.", variant: "destructive" });
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await apiFetch(`/api/tasks/${task.taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "closed" }),
      });
      await apiFetch(`/api/tasks/${task.taskId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "Owner rejected this task.", author: "user" }),
      });
      toast({ title: "Task Rejected", description: `"${task.title}" has been closed.` });
      onRejected();
    } catch {
      toast({ title: "Error", description: "Failed to reject task.", variant: "destructive" });
    } finally {
      setIsRejecting(false);
    }
  };

  const urgency = URGENCY_CONFIG[task.urgency];

  return (
    <Card className={`${style.card} transition-all`}>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="relative flex h-3 w-3 shrink-0">
              {urgency.pulse && (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.pulseColor} opacity-60`} />
              )}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${style.pulseColor}`} />
            </span>
            <Badge variant="outline" className={`text-[9px] font-mono uppercase shrink-0 ${style.badge}`}>
              <Icon className="h-2.5 w-2.5 mr-1" />{style.label}
            </Badge>
            <AgentBadge type={task.agentType} />
            <Badge variant="outline" className={`text-[9px] font-mono ${urgency.bg} ${urgency.color}`}>
              <Clock className="h-2.5 w-2.5 mr-0.5" />
              {formatWait(task.waitMins)} waiting
            </Badge>
            {costImpact && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded border bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shrink-0">
                <DollarSign className="h-2.5 w-2.5" />{costImpact}
              </span>
            )}
          </div>
          <Link href={`/businesses/${task.businessId}/tasks/${task.taskId}`}>
            <Button size="sm" variant="ghost" className={`text-[10px] font-mono h-6 px-2 ${style.title} hover:opacity-80`}>
              Full Detail <ChevronRight className="ml-0.5 h-3 w-3" />
            </Button>
          </Link>
        </div>

        <p className={`text-sm font-semibold mt-2 mb-0.5 ${style.title}`}>{task.title}</p>
        <p className="text-[10px] font-mono text-muted-foreground/60 mb-2">
          <Link href={`/businesses/${task.businessId}`}>
            <span className="hover:text-primary cursor-pointer">{task.businessName}</span>
          </Link>
          {" · "}Priority: {task.priority}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mb-2.5 text-[10px]">
          <div className="bg-muted/20 border border-border/30 rounded p-1.5">
            <p className="font-mono uppercase text-muted-foreground/70 mb-0.5">What to do</p>
            <p className="text-foreground/80 leading-snug">{task.actionNeeded}</p>
          </div>
          <div className="bg-muted/20 border border-border/30 rounded p-1.5">
            <p className="font-mono uppercase text-muted-foreground/70 mb-0.5">Why blocked</p>
            <p className="text-foreground/80 leading-snug">{task.whyBlocked}</p>
          </div>
          <div className="bg-muted/20 border border-green-500/20 rounded p-1.5">
            <p className="font-mono uppercase text-muted-foreground/70 mb-0.5">Value add</p>
            <p className="text-green-400/80 leading-snug">{task.valueAdd}</p>
          </div>
        </div>

        {approvalType === "payment" ? (
          <div className="flex items-center gap-1.5 text-[10px] text-red-400/80 bg-red-500/10 border border-red-500/20 rounded px-2 py-1 mb-2.5 font-mono">
            <DollarSign className="h-3 w-3 shrink-0" />
            Financial commitment required — only tasks with real money spend reach the owner.
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] text-blue-400/80 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-1 mb-2.5 font-mono">
            <Zap className="h-3 w-3 shrink-0" />
            Non-financial blocks are handled by the orchestrator — only strategic items come here.
          </div>
        )}

        {options.length >= 2 && (
          <div className="mb-2.5 space-y-1.5">
            <p className="text-[10px] text-muted-foreground font-mono uppercase">Choose an option:</p>
            <div className="space-y-1">
              {options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-start gap-2 rounded border px-2.5 py-1.5 cursor-pointer transition-colors text-xs font-mono ${
                    selectedOption === i
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-border/30 bg-muted/10 text-muted-foreground hover:border-border/60"
                  }`}
                >
                  <input
                    type="radio"
                    name={`owner-approval-option-${task.taskId}`}
                    value={i}
                    checked={selectedOption === i}
                    onChange={() => setSelectedOption(i)}
                    className="mt-0.5 accent-primary shrink-0"
                  />
                  <span className="flex-1 leading-snug">{opt}</span>
                  {i === 0 && (
                    <span className="shrink-0 text-[8px] font-mono uppercase px-1 py-0.5 rounded bg-primary/20 text-primary border border-primary/30 leading-none self-center">
                      AI pick
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {showInput && (
          <div className="mb-2.5 space-y-1.5">
            <p className="text-[10px] text-muted-foreground font-mono uppercase">
              {options.length >= 2 ? "Override / additional instructions:" : "Your instructions to the agent:"}
            </p>
            <Textarea
              ref={textRef}
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Add direction or constraints for the agent..."
              className="min-h-[64px] text-xs font-mono resize-none border-border/50 bg-muted/10 focus-visible:ring-primary/30"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.metaKey) handleApprove();
              }}
            />
            <p className="text-[9px] text-muted-foreground/50 font-mono">Agent reads this on the next cycle • ⌘↵ to approve</p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className={`font-mono uppercase text-xs h-7 flex-1 ${
              approvalType === "payment"
                ? "bg-red-600 hover:bg-red-500 text-white"
                : approvalType === "account"
                ? "bg-orange-600 hover:bg-orange-500 text-white"
                : "bg-amber-500 hover:bg-amber-400 text-black"
            }`}
            onClick={handleApprove}
            disabled={isApproving || isRejecting}
          >
            {isApproving ? (
              <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            ) : (
              <ThumbsUp className="mr-1 h-3 w-3" />
            )}
            {options.length >= 2 || instruction.trim() ? "Approve + Send" : "Approve"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-[10px] font-mono h-7 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setShowInput((v) => !v);
              if (showInput) setInstruction("");
            }}
          >
            {showInput ? (
              <>
                <X className="h-3 w-3 mr-0.5" />Cancel
              </>
            ) : (
              <>
                <MessageSquare className="h-3 w-3 mr-0.5" />Instructions
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-[10px] font-mono h-7 px-2 text-red-400/60 hover:text-red-400"
            onClick={handleReject}
            disabled={isApproving || isRejecting}
          >
            {isRejecting ? <Loader2 className="h-3 w-3 animate-spin" /> : <ThumbsDown className="h-3 w-3 mr-0.5" />}
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function OwnerPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [bizFilter, setBizFilter] = useState<string>("all");

  const { data, isLoading, refetch, isFetching } = useQuery<OwnerDashboard>({
    queryKey: ["owner-dashboard"],
    queryFn: () => apiFetch("/api/owner/dashboard"),
    refetchInterval: 30000,
    staleTime: 15000,
  });

  const metrics = data?.portfolioMetrics;
  const waitingItems = data?.waitingApprovalItems ?? [];
  const projectHealth = data?.projectHealth ?? [];
  const agentRoster = data?.agentRoster ?? [];
  const recentApprovals = data?.recentApprovals ?? [];

  const agentTypes = Array.from(new Set(agentRoster.map((r) => r.agentType))).sort();
  const bizNames = Array.from(new Set(agentRoster.map((r) => r.businessName))).sort();

  const filteredRoster = agentRoster.filter((r) => {
    if (agentFilter !== "all" && r.agentType !== agentFilter) return false;
    if (bizFilter !== "all" && r.businessName !== bizFilter) return false;
    return true;
  });

  const groupedByBusiness = React.useMemo(() => {
    const map = new Map<string, WaitingTask[]>();
    for (const item of waitingItems) {
      const key = item.businessName;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return map;
  }, [waitingItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase">
            Owner Command Center
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Your action items, portfolio health, and agent roster — all in one place
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="font-mono text-xs border-border/50"
        >
          {isFetching ? <Loader2 className="mr-1.5 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-1.5 h-3 w-3" />}
          Refresh
        </Button>
      </div>

      {/* Portfolio Metrics */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card className={`col-span-2 md:col-span-1 bg-card/40 border-border/50 ${metrics.totalWaiting > 0 ? "border-amber-500/40 bg-amber-500/5" : ""}`}>
            <CardContent className="p-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                <AlertTriangle className="h-3 w-3 text-amber-400" /> Awaiting
              </div>
              <div className="flex items-end gap-1.5">
                <p className={`text-2xl font-bold font-mono ${metrics.totalWaiting > 0 ? "text-amber-300" : "text-foreground"}`}>
                  {metrics.totalWaiting}
                </p>
                {metrics.waitingTrend === "increasing" && (
                  <TrendingUp className="h-3.5 w-3.5 text-red-400 mb-1" />
                )}
                {metrics.waitingTrend === "decreasing" && (
                  <TrendingDown className="h-3.5 w-3.5 text-green-400 mb-1" />
                )}
                {metrics.waitingTrend === "stable" && (
                  <Minus className="h-3.5 w-3.5 text-muted-foreground/50 mb-1" />
                )}
              </div>
              <p className="text-[10px] text-muted-foreground font-mono">
                {metrics.waitingTrend === "increasing" ? "trending up" : metrics.waitingTrend === "decreasing" ? "trending down" : "stable"} · tasks waiting
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                <Clock className="h-3 w-3" /> Avg Wait
              </div>
              <p className="text-2xl font-bold font-mono text-foreground">{formatWait(metrics.avgWaitMins)}</p>
              <p className="text-[10px] text-muted-foreground font-mono">avg approval delay</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                <Cpu className="h-3 w-3 text-blue-400" /> Agents
              </div>
              <p className="text-2xl font-bold font-mono text-foreground">{metrics.activeAgentsCount}</p>
              <p className="text-[10px] text-muted-foreground font-mono">running now</p>
            </CardContent>
          </Card>

          <Card className={`bg-card/40 border-border/50 ${metrics.projectsAtRisk > 0 ? "border-red-500/30 bg-red-500/5" : ""}`}>
            <CardContent className="p-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                <AlertTriangle className={`h-3 w-3 ${metrics.projectsAtRisk > 0 ? "text-red-400" : ""}`} /> At Risk
              </div>
              <p className={`text-2xl font-bold font-mono ${metrics.projectsAtRisk > 0 ? "text-red-400" : "text-foreground"}`}>
                {metrics.projectsAtRisk}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono">projects stalling</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                <Wallet className="h-3 w-3 text-green-400" /> Budget
              </div>
              <p className="text-2xl font-bold font-mono text-foreground">${metrics.budgetUsed.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground font-mono">
                of ${metrics.initialBudget.toLocaleString()} · {metrics.budgetUtilizationPct}% used
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-3">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                <Activity className="h-3 w-3 text-primary" /> Runway
              </div>
              <p className="text-2xl font-bold font-mono text-foreground">{metrics.runwayDays}d</p>
              <p className="text-[10px] text-muted-foreground font-mono">days remaining</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Owner Action Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-amber-500 pl-3 flex items-center gap-2">
            Owner Action Items
            {waitingItems.length > 0 && (
              <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </h2>
          <span className="text-[10px] text-muted-foreground font-mono">{waitingItems.length} tasks waiting</span>
        </div>

        {waitingItems.length === 0 ? (
          <Card className="bg-card/30 border-dashed border-green-500/20 py-10 text-center">
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500/40" />
              <p className="text-sm text-muted-foreground">No action items — you're all caught up!</p>
              <p className="text-xs text-muted-foreground/60">Agents are running autonomously.</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {Array.from(groupedByBusiness.entries()).map(([bizName, tasks]) => (
              <div key={bizName} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase border-b border-border/30 pb-1">
                  <Target className="h-3 w-3 text-primary" />
                  {bizName}
                  <span className="text-muted-foreground/50">· {tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <InlineApprove
                      key={task.taskId}
                      task={task}
                      onApproved={() => queryClient.invalidateQueries({ queryKey: ["owner-dashboard"] })}
                      onRejected={() => queryClient.invalidateQueries({ queryKey: ["owner-dashboard"] })}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Health Overview */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-primary pl-3">
          Project Health
        </h2>

        <div className="rounded-lg border border-border/40 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/20 border-b border-border/30">
                <th className="text-left px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Project</th>
                <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Status</th>
                <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Tasks</th>
                <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Done %</th>
                <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Waiting</th>
                <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Agents</th>
                <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Last Progress</th>
                <th className="text-left px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Health</th>
              </tr>
            </thead>
            <tbody>
              {projectHealth.map((p) => {
                const isStalled = p.stallStatus === "stalled_waiting" || p.stallStatus === "stalled_inactive";
                const rowClass = isStalled
                  ? "bg-red-500/5 border-b border-red-500/10 hover:bg-red-500/10"
                  : p.stallStatus === "healthy"
                  ? "border-b border-border/20 hover:bg-muted/10"
                  : "border-b border-border/20 hover:bg-muted/10 opacity-60";

                return (
                  <tr key={p.businessId} className={rowClass}>
                    <td className="px-3 py-2">
                      <Link href={`/businesses/${p.businessId}`}>
                        <span className="font-medium text-foreground hover:text-primary cursor-pointer font-mono text-xs">
                          {p.businessName}
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <Badge variant="outline" className="text-[9px] font-mono uppercase px-1 py-0 border-border/40">
                        {p.businessStatus}
                      </Badge>
                    </td>
                    <td className="px-3 py-2 text-center font-mono text-muted-foreground">{p.totalTasks}</td>
                    <td className="px-3 py-2 text-center">
                      <span className={`font-mono font-semibold ${p.completionPct >= 75 ? "text-green-400" : p.completionPct >= 40 ? "text-amber-400" : "text-muted-foreground"}`}>
                        {p.completionPct}%
                      </span>
                    </td>
                    <td className="px-3 py-2 text-center">
                      {p.waitingCount > 0 ? (
                        <span className="text-amber-400 font-mono font-semibold">{p.waitingCount}</span>
                      ) : (
                        <span className="text-muted-foreground font-mono">0</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {p.activeAgentsCount > 0 ? (
                        <span className="text-blue-400 font-mono">{p.activeAgentsCount}</span>
                      ) : (
                        <span className="text-muted-foreground font-mono">0</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center font-mono text-muted-foreground text-[10px]">
                      {p.daysSinceProgress >= 0 ? `${p.daysSinceProgress}d ago` : "—"}
                    </td>
                    <td className="px-3 py-2">
                      {p.stallStatus === "stalled_waiting" ? (
                        <Badge className="text-[9px] font-mono bg-red-500/20 text-red-300 border-red-500/30 px-1.5 py-0.5">
                          <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                          STALLED — Waiting on you
                        </Badge>
                      ) : p.stallStatus === "stalled_inactive" ? (
                        <Badge className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border-amber-500/30 px-1.5 py-0.5">
                          <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                          STALLED — No agent activity
                        </Badge>
                      ) : p.stallStatus === "healthy" ? (
                        <Badge className="text-[9px] font-mono bg-green-500/20 text-green-300 border-green-500/30 px-1.5 py-0.5">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                          Healthy
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] font-mono text-muted-foreground px-1.5 py-0.5">
                          No Tasks
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Agent Roster */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-blue-500 pl-3">
            Agent Roster
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
              <Filter className="h-3 w-3" />
            </div>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-[10px] font-mono bg-card border border-border/40 rounded px-1.5 py-0.5 text-muted-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="all">All agents</option>
              {agentTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              value={bizFilter}
              onChange={(e) => setBizFilter(e.target.value)}
              className="text-[10px] font-mono bg-card border border-border/40 rounded px-1.5 py-0.5 text-muted-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="all">All projects</option>
              {bizNames.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredRoster.length === 0 ? (
          <Card className="bg-card/20 border-dashed border-blue-500/20 py-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="h-8 w-8 text-blue-500/30" />
              <p className="text-sm text-muted-foreground">No active agents right now.</p>
            </div>
          </Card>
        ) : (
          <div className="rounded-lg border border-border/40 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/20 border-b border-border/30">
                  <th className="text-left px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Agent</th>
                  <th className="text-left px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Project</th>
                  <th className="text-left px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Current Task</th>
                  <th className="text-center px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Task Status</th>
                  <th className="text-right px-3 py-2 font-mono text-muted-foreground uppercase text-[10px]">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoster.map((agent) => (
                  <tr key={agent.runId} className="border-b border-border/20 hover:bg-muted/10">
                    <td className="px-3 py-2">
                      <AgentBadge type={agent.agentType} />
                    </td>
                    <td className="px-3 py-2">
                      {agent.businessId ? (
                        <Link href={`/businesses/${agent.businessId}`}>
                          <span className="text-foreground/80 hover:text-primary cursor-pointer font-mono text-xs">
                            {agent.businessName}
                          </span>
                        </Link>
                      ) : (
                        <span className="text-muted-foreground font-mono text-xs">Global</span>
                      )}
                    </td>
                    <td className="px-3 py-2 max-w-[200px]">
                      {agent.currentTask ? (
                        <span className="text-foreground/70 truncate block text-xs">{agent.currentTask.title}</span>
                      ) : (
                        <span className="text-muted-foreground/50 italic text-xs">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {agent.currentTask ? (
                        <Badge variant="outline" className="text-[9px] font-mono uppercase px-1 py-0 border-blue-500/30 text-blue-400">
                          {agent.currentTask.status.replace("_", " ")}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] font-mono uppercase px-1 py-0 border-border/30 text-muted-foreground">
                          running
                        </Badge>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-[10px] text-muted-foreground">
                      {timeAgo(agent.lastUpdate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Approval Activity */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-secondary pl-3">
          Recent Activity
        </h2>

        <Card className="bg-card/40 border-border/50">
          <div className="divide-y divide-border/30">
            {recentApprovals.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No recent activity yet.</div>
            ) : (
              recentApprovals.map((item) => (
                <div key={item.taskId} className="p-3 flex items-center gap-3 hover:bg-muted/10 transition-colors">
                  <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                    item.status === "in_progress" ? "bg-blue-500 animate-pulse" :
                    item.status === "closed" ? "bg-green-500" : "bg-muted-foreground"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground/80 truncate">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{item.businessName}</p>
                  </div>
                  <Badge variant="outline" className={`text-[9px] font-mono uppercase px-1 py-0 shrink-0 ${
                    item.status === "in_progress" ? "border-blue-500/30 text-blue-400" :
                    item.status === "closed" ? "border-green-500/30 text-green-400" :
                    "border-border/30 text-muted-foreground"
                  }`}>
                    {item.status.replace("_", " ")}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground/60 font-mono shrink-0">
                    {timeAgo(item.updatedAt)}
                  </span>
                  <Link href={`/businesses/${item.businessId}/tasks/${item.taskId}`}>
                    <ArrowRight className="h-3 w-3 text-muted-foreground/40 hover:text-primary cursor-pointer" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      {/* Urgency escalation callouts */}
      {waitingItems.filter((t) => t.urgency !== "low").length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold font-mono uppercase text-muted-foreground border-l-2 border-red-500 pl-3">
            Escalation Alerts
          </h3>
          {waitingItems.filter((t) => t.urgency === "critical").length > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-red-500/40 bg-red-500/10 text-xs">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
              <p className="text-red-300 font-mono">
                <span className="font-bold">{waitingItems.filter((t) => t.urgency === "critical").length} task{waitingItems.filter((t) => t.urgency === "critical").length !== 1 ? "s" : ""}</span>{" "}
                waiting 24+ hours — agents have been blocked for over a day
              </p>
            </div>
          )}
          {waitingItems.filter((t) => t.urgency === "high").length > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-orange-500/30 bg-orange-500/8 text-xs">
              <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />
              <p className="text-orange-300 font-mono">
                <span className="font-bold">{waitingItems.filter((t) => t.urgency === "high").length} task{waitingItems.filter((t) => t.urgency === "high").length !== 1 ? "s" : ""}</span>{" "}
                waiting 4+ hours — consider reviewing soon
              </p>
            </div>
          )}
          {waitingItems.filter((t) => t.urgency === "medium").length > 0 && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-amber-500/25 bg-amber-500/5 text-xs">
              <Clock className="h-4 w-4 text-amber-400 shrink-0" />
              <p className="text-amber-300 font-mono">
                <span className="font-bold">{waitingItems.filter((t) => t.urgency === "medium").length} task{waitingItems.filter((t) => t.urgency === "medium").length !== 1 ? "s" : ""}</span>{" "}
                waiting 1+ hour — agents are paused
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
