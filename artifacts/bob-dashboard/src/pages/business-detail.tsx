import React, { useState, useRef, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useLocation } from "wouter";
import {
  useGetBusiness, getGetBusinessQueryKey,
  useListBusinessTasks, getListBusinessTasksQueryKey,
  useListBusinessArtifacts, getListBusinessArtifactsQueryKey,
  useGetBusinessSite, getGetBusinessSiteQueryKey,
  useGenerateBusinessSite,
  useUpdateTask,
  useCreateTaskComment,
  useTriggerOrchestrate,
  Task, TaskStatus, BusinessArtifact,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AgentBadge } from "@/components/agent-badge";
import {
  ArrowLeft, Play, AlertCircle, Loader2, CheckCircle2,
  Clock, Cpu, AlertTriangle, ThumbsUp, ChevronRight,
  FileText, Code2, Search, LayoutTemplate, ClipboardList,
  PenLine, Table2, ScrollText, ChevronDown, ChevronUp,
  MessageSquare, Send, DollarSign, UserPlus, X,
  Banknote, ShieldAlert, Globe, Mail, ExternalLink, Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(date: string | null | undefined): string {
  if (!date) return "never";
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

type ApprovalType = "payment" | "account" | "other";

function detectApprovalType(task: Task): ApprovalType {
  const text = `${task.title} ${task.description ?? ""}`.toLowerCase();
  if (text.match(/\$[\d,]+|budget|spend|payment|fund|invest|cost|fee|price|money|cash|transfer/))
    return "payment";
  if (text.match(/upwork|fiverr|linkedin|facebook|google ads|stripe|account|sign.?up|register|platform|profile/))
    return "account";
  return "other";
}

// ─── Artifact Panel ───────────────────────────────────────────────────────────

const ARTIFACT_ICONS: Record<string, React.ElementType> = {
  document: FileText, template: LayoutTemplate, research: Search,
  script: ScrollText, plan: ClipboardList, copy: PenLine,
  code: Code2, spreadsheet: Table2,
};
const ARTIFACT_COLORS: Record<string, string> = {
  document: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  template: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  research: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  script: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  plan: "text-primary bg-primary/10 border-primary/20",
  copy: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  code: "text-green-400 bg-green-500/10 border-green-500/20",
  spreadsheet: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

function ArtifactCard({ artifact }: { artifact: BusinessArtifact }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ARTIFACT_ICONS[artifact.artifactType] ?? FileText;
  const colorClass = ARTIFACT_COLORS[artifact.artifactType] ?? ARTIFACT_COLORS.document;
  const preview = artifact.content.slice(0, 200).trim();
  const hasMore = artifact.content.length > 200;
  return (
    <Card className="bg-card/40 border-border/40 hover:border-border/70 transition-colors">
      <CardContent className="p-3">
        <div className="flex items-start gap-2 mb-2">
          <div className={`p-1.5 rounded border ${colorClass} shrink-0`}><Icon className="h-3 w-3" /></div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-foreground leading-tight">{artifact.title}</h4>
            <div className="flex items-center gap-1 mt-0.5">
              <Badge variant="outline" className={`text-[9px] font-mono px-1 py-0 border ${colorClass}`}>{artifact.artifactType}</Badge>
              <span className="text-[9px] text-muted-foreground/60">{artifact.createdBy} • {timeAgo(artifact.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="bg-muted/20 rounded p-2 border border-border/20">
          <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed">
            {expanded ? artifact.content : preview}{!expanded && hasMore && "..."}
          </pre>
        </div>
        {hasMore && (
          <button onClick={() => setExpanded(e => !e)} className="flex items-center gap-1 text-[10px] text-primary/70 hover:text-primary mt-1.5 w-full justify-center transition-colors">
            {expanded ? <><ChevronUp className="h-3 w-3" />Collapse</> : <><ChevronDown className="h-3 w-3" />Read Full Document</>}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Approval Card ────────────────────────────────────────────────────────────

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

interface ApprovalCardProps {
  task: Task;
  onApprove: (taskId: number, instruction?: string) => void;
  onReview: (taskId: number) => void;
  isApproving: boolean;
}

function ApprovalCard({ task, onApprove, onReview, isApproving }: ApprovalCardProps) {
  const [showInput, setShowInput] = useState(false);
  const [instruction, setInstruction] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const approvalType = detectApprovalType(task);
  const style = APPROVAL_STYLES[approvalType];
  const Icon = style.icon;

  useEffect(() => { if (showInput) textRef.current?.focus(); }, [showInput]);

  const handleApprove = () => onApprove(task.id, instruction.trim() || undefined);

  return (
    <Card className={`${style.card} transition-all`} data-testid={`approval-task-${task.id}`}>
      <div className="p-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Pulsing indicator */}
            <span className="relative flex h-3 w-3 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${style.pulseColor} opacity-60`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${style.pulseColor}`} />
            </span>
            <Badge variant="outline" className={`text-[9px] font-mono uppercase shrink-0 ${style.badge}`}>
              <Icon className="h-2.5 w-2.5 mr-1" />{style.label}
            </Badge>
            <AgentBadge type={task.agentType} />
            <span className="text-xs font-mono text-muted-foreground">T-{task.id}</span>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <Button
              size="sm"
              variant="ghost"
              className={`text-[10px] font-mono h-6 px-2 ${style.title} hover:opacity-80`}
              onClick={() => onReview(task.id)}
            >
              Review <ChevronRight className="ml-0.5 h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Task title */}
        <p className={`text-sm font-semibold mt-2 mb-1 cursor-pointer hover:opacity-80 ${style.title}`} onClick={() => onReview(task.id)}>
          {task.title}
        </p>
        <p className="text-xs text-muted-foreground/70 mb-2.5">
          {task.assignedAgent} is waiting — click Review to read the full context and options
        </p>

        {/* Payment warning */}
        {approvalType === "payment" && (
          <div className="flex items-center gap-1.5 text-[10px] text-red-400/80 bg-red-500/10 border border-red-500/20 rounded px-2 py-1 mb-2.5 font-mono">
            <DollarSign className="h-3 w-3 shrink-0" />
            This agent is requesting a financial commitment. Review the amount and alternatives before approving.
          </div>
        )}

        {/* Instruction input (expandable) */}
        {showInput && (
          <div className="mb-2.5 space-y-1.5">
            <p className="text-[10px] text-muted-foreground font-mono uppercase">Your instructions to the agent:</p>
            <Textarea
              ref={textRef}
              value={instruction}
              onChange={e => setInstruction(e.target.value)}
              placeholder={
                approvalType === "payment"
                  ? "e.g. Explore the free/cheaper option first. Only spend if you can't get results for free."
                  : approvalType === "account"
                  ? "e.g. I'll create the account. Prepare the profile bio and gig description for me to paste in."
                  : "Add any direction or constraints for the agent..."
              }
              className="min-h-[64px] text-xs font-mono resize-none border-border/50 bg-muted/10 focus-visible:ring-primary/30"
              onKeyDown={e => { if (e.key === "Enter" && e.metaKey) handleApprove(); }}
            />
            <p className="text-[9px] text-muted-foreground/50 font-mono">Agent reads this on the next cycle • ⌘↵ to approve</p>
          </div>
        )}

        {/* Action row */}
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
            disabled={isApproving}
            data-testid={`approve-task-${task.id}`}
          >
            {isApproving ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <ThumbsUp className="mr-1 h-3 w-3" />}
            {instruction.trim() ? "Approve + Send Instructions" : "Approve"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-[10px] font-mono h-7 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => { setShowInput(v => !v); if (showInput) setInstruction(""); }}
          >
            {showInput ? <><X className="h-3 w-3 mr-0.5" />Cancel</> : <><MessageSquare className="h-3 w-3 mr-0.5" />Add Instructions</>}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ─── Inline Message Widget (on task cards) ────────────────────────────────────

interface InlineMessageProps {
  taskId: number;
  onSend: (taskId: number, text: string) => Promise<void>;
  onClose: () => void;
}

function InlineMessage({ taskId, onSend, onClose }: InlineMessageProps) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    setSending(true);
    await onSend(taskId, text.trim());
    setSending(false);
    onClose();
  };

  return (
    <div className="mt-2 border-t border-border/30 pt-2" onClick={e => e.stopPropagation()}>
      <p className="text-[9px] text-primary/60 font-mono uppercase mb-1">Direct instruction to agent:</p>
      <div className="flex gap-1.5">
        <Textarea
          ref={ref}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="e.g. Focus on organic options first, avoid paid ads for now..."
          className="min-h-[48px] text-[11px] font-mono resize-none border-primary/20 bg-primary/5 focus-visible:ring-primary/30 py-1.5"
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } if (e.key === "Escape") onClose(); }}
        />
        <div className="flex flex-col gap-1">
          <Button size="icon" className="h-6 w-6 shrink-0" onClick={handleSend} disabled={sending || !text.trim()}>
            {sending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
          </Button>
          <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0 text-muted-foreground" onClick={onClose}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <p className="text-[9px] text-muted-foreground/40 font-mono mt-1">↵ send • Esc cancel • Agent reads this next cycle</p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BusinessDetail() {
  const [, params] = useRoute("/businesses/:id");
  const businessId = params?.id ? parseInt(params.id) : 0;
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: business, isLoading: isLoadingBusiness } = useGetBusiness(businessId, {
    query: { enabled: !!businessId, queryKey: getGetBusinessQueryKey(businessId) },
  });
  const { data: tasks, isLoading: isLoadingTasks } = useListBusinessTasks(businessId, {
    query: { enabled: !!businessId, queryKey: getListBusinessTasksQueryKey(businessId), refetchInterval: 12000 },
  });
  const { data: artifacts, isLoading: isLoadingArtifacts } = useListBusinessArtifacts(businessId, {
    query: { enabled: !!businessId, queryKey: getListBusinessArtifactsQueryKey(businessId), refetchInterval: 20000 },
  });

  const { data: site, isLoading: isLoadingSite } = useGetBusinessSite(businessId, {
    query: { enabled: !!businessId, queryKey: getGetBusinessSiteQueryKey(businessId) },
  });

  const generateSite = useGenerateBusinessSite();
  const updateTask = useUpdateTask();
  const createComment = useCreateTaskComment();
  const triggerOrchestrate = useTriggerOrchestrate();

  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [messageOpenId, setMessageOpenId] = useState<number | null>(null);
  const [isGeneratingSite, setIsGeneratingSite] = useState(false);

  const siteUrl = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}/sites/${businessId}`;

  const handleGenerateSite = () => {
    setIsGeneratingSite(true);
    generateSite.mutate({ businessId }, {
      onSuccess: () => {
        toast({ title: "Website Generated!", description: "The business website is now live." });
        setIsGeneratingSite(false);
        queryClient.invalidateQueries({ queryKey: getGetBusinessSiteQueryKey(businessId) });
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to generate website.", variant: "destructive" });
        setIsGeneratingSite(false);
      },
    });
  };

  const invalidateTasks = () => queryClient.invalidateQueries({ queryKey: getListBusinessTasksQueryKey(businessId) });

  const handleOrchestrate = () => {
    setIsOrchestrating(true);
    triggerOrchestrate.mutate({ businessId }, {
      onSuccess: () => {
        toast({ title: "Orchestrator Running", description: "Creating task plan and assigning agents..." });
        setIsOrchestrating(false);
        invalidateTasks();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to trigger orchestrator.", variant: "destructive" });
        setIsOrchestrating(false);
      },
    });
  };

  const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
    updateTask.mutate({ id: taskId, data: { status: newStatus } }, { onSuccess: invalidateTasks });
  };

  const handleApprove = async (taskId: number, instruction?: string) => {
    setApprovingId(taskId);
    if (instruction) {
      await new Promise<void>((resolve, reject) =>
        createComment.mutate({ id: taskId, data: { author: "user", content: `**📋 Owner instruction:** ${instruction}` } }, {
          onSuccess: () => resolve(), onError: () => reject(),
        })
      );
    }
    updateTask.mutate({ id: taskId, data: { status: "in_progress" } }, {
      onSuccess: () => {
        toast({ title: "Approved!", description: instruction ? "Instructions sent. Agent continues next cycle." : "Agent continues next cycle." });
        setApprovingId(null);
        invalidateTasks();
      },
      onError: () => { setApprovingId(null); },
    });
  };

  const handleSendMessage = async (taskId: number, text: string) => {
    await new Promise<void>((resolve, reject) =>
      createComment.mutate({ id: taskId, data: { author: "user", content: `**📋 Owner instruction:** ${text}` } }, {
        onSuccess: () => {
          toast({ title: "Sent!", description: "Agent will read your instructions on the next cycle." });
          resolve();
        },
        onError: () => { toast({ title: "Error", description: "Failed to send.", variant: "destructive" }); reject(); },
      })
    );
  };

  if (isLoadingBusiness) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!business) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <h2 className="text-xl font-bold">Business Not Found</h2>
      <Link href="/"><Button variant="outline">Return to Mission Control</Button></Link>
    </div>
  );

  const waitingTasks = tasks?.filter(t => t.status === "waiting_approval") || [];
  const openTasks = tasks?.filter(t => t.status === "open") || [];
  const inProgressTasks = tasks?.filter(t => t.status === "in_progress") || [];
  const closedTasks = tasks?.filter(t => t.status === "closed") || [];
  const activeAgentCount = inProgressTasks.length;
  const recentMilestones = closedTasks.slice(0, 3);
  const hasTasks = (tasks?.length ?? 0) > 0;

  // Separate payment vs non-payment approvals for ordering (payments first)
  const sortedWaiting = [...waitingTasks].sort((a, b) => {
    const scoreA = detectApprovalType(a) === "payment" ? 0 : detectApprovalType(a) === "account" ? 1 : 2;
    const scoreB = detectApprovalType(b) === "payment" ? 0 : detectApprovalType(b) === "account" ? 1 : 2;
    return scoreA - scoreB;
  });

  const renderTaskCard = (task: Task) => {
    const isMessaging = messageOpenId === task.id;
    return (
      <Card
        key={task.id}
        className="mb-2.5 bg-card border-border/50 hover:border-primary/50 transition-colors relative group"
        data-testid={`task-card-${task.id}`}
      >
        <div className="p-3">
          <div
            className="cursor-pointer"
            onClick={() => { if (!isMessaging) navigate(`/businesses/${businessId}/tasks/${task.id}`); }}
          >
            <div className="flex justify-between items-start mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <AgentBadge type={task.agentType} />
                <Badge
                  variant={task.priority === "critical" ? "destructive" : task.priority === "high" ? "default" : "secondary"}
                  className="text-[10px] uppercase font-mono px-1 py-0"
                >
                  {task.priority}
                </Badge>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono shrink-0 ml-1">T-{task.id}</div>
            </div>
            <h4 className="text-sm font-semibold mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">{task.title}</h4>
            <div className="flex justify-between items-center">
              <span className="text-xs text-primary/80">{task.assignedAgent || "Unassigned"}</span>
              {task.lastProgressUpdate && (
                <span className="text-[10px] text-muted-foreground/60 font-mono flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />{timeAgo(task.lastProgressUpdate)}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons row */}
          <div className="flex gap-1 mt-1.5 items-center" onClick={e => e.stopPropagation()}>
            {task.status === "in_progress" && (
              <button
                className="flex items-center gap-1 text-[10px] text-primary/60 hover:text-primary font-mono transition-colors ml-auto"
                onClick={() => setMessageOpenId(isMessaging ? null : task.id)}
              >
                <MessageSquare className="h-3 w-3" />
                {isMessaging ? "Cancel" : "Message Agent"}
              </button>
            )}
            {!isMessaging && (
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                {task.status !== "open" && <Button variant="ghost" size="sm" className="h-5 px-1.5 text-[10px] text-muted-foreground" onClick={() => handleStatusChange(task.id, "open")}>← Open</Button>}
                {task.status !== "in_progress" && <Button variant="ghost" size="sm" className="h-5 px-1.5 text-[10px] text-blue-400" onClick={() => handleStatusChange(task.id, "in_progress")}>▶ Start</Button>}
                {task.status !== "closed" && <Button variant="ghost" size="sm" className="h-5 px-1.5 text-[10px] text-green-400" onClick={() => handleStatusChange(task.id, "closed")}>✓ Done</Button>}
              </div>
            )}
          </div>

          {/* Inline message input */}
          {isMessaging && (
            <InlineMessage
              taskId={task.id}
              onSend={handleSendMessage}
              onClose={() => setMessageOpenId(null)}
            />
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-start gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground shrink-0 mt-0.5">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold tracking-tight font-mono uppercase" data-testid="heading-business-title">{business.name}</h1>
              <Badge variant={business.status === "active" ? "default" : "secondary"} className="uppercase font-mono text-xs">{business.status}</Badge>
              {activeAgentCount > 0 && (
                <span className="flex items-center gap-1 text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-0.5">
                  <Cpu className="h-3 w-3 animate-pulse" />{activeAgentCount} agent{activeAgentCount !== 1 ? "s" : ""} working
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-0.5 text-sm font-mono">{business.platform} • Target: {business.targetRevenue30d}</p>
            <p className="text-[10px] text-muted-foreground/50 font-mono mt-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500/60 inline-block animate-pulse" />
              Orchestrator active — checks every 30s
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!hasTasks ? (
            <Button onClick={handleOrchestrate} disabled={isOrchestrating} className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase text-xs tracking-wider" data-testid="button-orchestrate">
              {isOrchestrating ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Play className="mr-2 h-3 w-3" />}
              Create Task Plan
            </Button>
          ) : (
            <Button onClick={handleOrchestrate} disabled={isOrchestrating} variant="outline" size="sm" className="border-border/50 text-muted-foreground hover:text-foreground font-mono text-xs" data-testid="button-orchestrate">
              {isOrchestrating ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Play className="mr-1 h-3 w-3" />}
              Add Tasks
            </Button>
          )}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-card/30 p-3 rounded-lg border border-border/50">
        <div><p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">Market Size</p><p className="font-semibold text-sm">{business.marketSize || "N/A"}</p></div>
        <div><p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">Inv. Needed</p><p className="font-semibold text-sm">{business.investmentNeeded || "N/A"}</p></div>
        <div><p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">Effort Level</p><p className="font-semibold text-sm capitalize">{business.effortLevel || "N/A"}</p></div>
        <div><p className="text-[10px] text-muted-foreground uppercase font-mono mb-0.5">Rank</p><p className="font-semibold text-sm">{business.rank} / 5</p></div>
      </div>

      {/* Website & Email Panel */}
      <Card className="border-border/50 bg-card/30">
        <CardContent className="p-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Globe className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-mono">Business Website & Inbox</p>
                {site ? (
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    <a
                      href={siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-mono transition-colors"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {siteUrl.replace(window.location.origin, "")}
                    </a>
                    {site.emailAddress && (
                      <span className="flex items-center gap-1 text-xs text-green-400 font-mono">
                        <Mail className="h-3 w-3" />
                        {site.emailAddress}
                      </span>
                    )}
                    <Badge variant="outline" className="text-[9px] font-mono border-green-500/30 text-green-400 bg-green-500/10 px-1.5 py-0">
                      ✓ Live
                    </Badge>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/70 mt-0.5">No website yet — generate one to get a public URL and contact email</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {site && (
                <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-indigo-500/30 text-indigo-400 hover:text-indigo-300 font-mono text-xs h-7">
                    <ExternalLink className="mr-1 h-3 w-3" /> View Site
                  </Button>
                </a>
              )}
              <Button
                onClick={handleGenerateSite}
                disabled={isGeneratingSite || isLoadingSite}
                size="sm"
                className={`font-mono text-xs h-7 ${site ? "border-border/50 text-muted-foreground hover:text-foreground" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`}
                variant={site ? "outline" : "default"}
              >
                {isGeneratingSite ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Zap className="mr-1 h-3 w-3" />}
                {site ? "Regenerate" : "Generate Website"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Section */}
      {sortedWaiting.length > 0 && (
        <div className="space-y-2.5" data-testid="section-approval">
          <div className="flex items-center gap-2 font-mono font-bold text-sm uppercase tracking-wider">
            {sortedWaiting.some(t => detectApprovalType(t) === "payment") ? (
              <><AlertCircle className="h-4 w-4 text-red-400" /><span className="text-red-400">Action Required</span></>
            ) : (
              <><AlertTriangle className="h-4 w-4 text-amber-400" /><span className="text-amber-400">Needs Your Approval</span></>
            )}
            <Badge variant="secondary" className="font-mono text-xs">{sortedWaiting.length}</Badge>
          </div>
          {sortedWaiting.map(task => (
            <ApprovalCard
              key={task.id}
              task={task}
              onApprove={handleApprove}
              onReview={(id) => navigate(`/businesses/${businessId}/tasks/${id}`)}
              isApproving={approvingId === task.id}
            />
          ))}
        </div>
      )}

      {/* Recent Milestones */}
      {recentMilestones.length > 0 && (
        <div data-testid="section-milestones">
          <div className="flex items-center gap-2 text-green-400 font-mono font-bold text-xs uppercase tracking-wider mb-2">
            <CheckCircle2 className="h-3.5 w-3.5" /> Recent Milestones ({closedTasks.length} completed)
          </div>
          <div className="flex gap-2 flex-wrap">
            {recentMilestones.map(task => (
              <div key={task.id} className="flex items-center gap-2 bg-green-900/10 border border-green-900/30 rounded-md px-3 py-1.5 cursor-pointer hover:border-green-500/40 transition-colors" onClick={() => navigate(`/businesses/${businessId}/tasks/${task.id}`)}>
                <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />
                <span className="text-green-300 font-medium text-xs truncate max-w-[180px]">{task.title}</span>
                <span className="text-muted-foreground/60 text-[10px] font-mono shrink-0">{timeAgo(task.lastProgressUpdate || task.updatedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main layout */}
      {isLoadingTasks ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="h-8 w-8 animate-spin text-primary/50" /></div>
      ) : !hasTasks ? (
        <Card className="bg-card/20 border-dashed py-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <Cpu className="h-10 w-10 text-primary/20" />
            <p className="text-muted-foreground font-medium">No tasks yet</p>
            <p className="text-sm text-muted-foreground/70 max-w-sm">Click "Create Task Plan" to have the Orchestrator assign agents to this business.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4 items-start">
          {/* Kanban */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Open */}
            <div className="bg-muted/10 rounded-lg p-3 border border-border/40">
              <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
                <h3 className="font-semibold font-mono uppercase text-xs tracking-wider">Open</h3>
                <Badge variant="secondary" className="font-mono text-xs">{openTasks.length}</Badge>
              </div>
              <div data-testid="kanban-col-open">
                {openTasks.map(renderTaskCard)}
                {openTasks.length === 0 && <div className="h-16 border border-dashed border-border/50 rounded flex items-center justify-center text-muted-foreground text-[10px] uppercase font-mono">No Open Tasks</div>}
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-blue-900/5 rounded-lg p-3 border border-blue-900/20">
              <div className="flex items-center justify-between mb-3 border-b border-blue-900/30 pb-2">
                <h3 className="font-semibold font-mono uppercase text-xs tracking-wider text-blue-400 flex items-center gap-1.5">
                  In Progress
                  {inProgressTasks.length > 0 && <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />}
                </h3>
                <Badge variant="secondary" className="font-mono text-xs bg-blue-900/40 text-blue-300">{inProgressTasks.length}</Badge>
              </div>
              <div data-testid="kanban-col-inprogress">
                {inProgressTasks.map(renderTaskCard)}
                {inProgressTasks.length === 0 && <div className="h-16 border border-dashed border-blue-900/30 rounded flex items-center justify-center text-blue-500/50 text-[10px] uppercase font-mono">Nothing In Progress</div>}
              </div>
            </div>

            {/* Closed */}
            <div className="bg-green-900/5 rounded-lg p-3 border border-green-900/20">
              <div className="flex items-center justify-between mb-3 border-b border-green-900/30 pb-2">
                <h3 className="font-semibold font-mono uppercase text-xs tracking-wider text-green-400">Closed</h3>
                <Badge variant="secondary" className="font-mono text-xs bg-green-900/40 text-green-300">{closedTasks.length}</Badge>
              </div>
              <div data-testid="kanban-col-closed">
                {closedTasks.map(renderTaskCard)}
                {closedTasks.length === 0 && <div className="h-16 border border-dashed border-green-900/30 rounded flex items-center justify-center text-green-500/50 text-[10px] uppercase font-mono">Nothing Closed Yet</div>}
              </div>
            </div>
          </div>

          {/* Artifacts Panel */}
          <div className="space-y-3" data-testid="artifacts-panel">
            <div className="flex items-center gap-2 border-l-2 border-yellow-500/60 pl-3">
              <FileText className="h-4 w-4 text-yellow-400" />
              <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-yellow-400">Project Documents</h2>
              {artifacts && artifacts.length > 0 && <Badge variant="secondary" className="font-mono text-xs ml-auto">{artifacts.length}</Badge>}
            </div>
            {isLoadingArtifacts ? (
              <div className="space-y-2">{[1, 2].map(i => <Card key={i} className="animate-pulse bg-muted/20 border-border/50 h-24" />)}</div>
            ) : artifacts && artifacts.length > 0 ? (
              <div className="space-y-2">{artifacts.map(a => <ArtifactCard key={a.id} artifact={a} />)}</div>
            ) : (
              <Card className="bg-card/20 border-dashed border-yellow-500/20">
                <CardContent className="p-4 text-center">
                  <FileText className="h-8 w-8 text-yellow-500/20 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-medium">No documents yet</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">Agents create documents, scripts, and templates as they work</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
