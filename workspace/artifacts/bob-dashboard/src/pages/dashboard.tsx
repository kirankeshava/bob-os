import { 
  useGetDashboardSummary, 
  getGetDashboardSummaryQueryKey,
  useListBusinesses,
  getListBusinessesQueryKey,
  useTriggerResearch,
  useListAgentRuns,
  getListAgentRunsQueryKey,
  useTriggerOrchestrate,
  useGetAgentActivity,
  getGetAgentActivityQueryKey,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, Activity, Play, Briefcase, Plus, Loader2, 
  Cpu, CheckCircle2, Circle, Clock, AlertTriangle, TrendingUp, Calendar
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AgentBadge } from "@/components/agent-badge";

export default function Dashboard() {
  const { data: summary } = useGetDashboardSummary({
    query: { queryKey: getGetDashboardSummaryQueryKey(), refetchInterval: 15000 }
  });
  const { data: businesses, isLoading: isLoadingBusinesses } = useListBusinesses({
    query: { queryKey: getListBusinessesQueryKey(), refetchInterval: 15000 }
  });
  const { data: agentRuns, isLoading: isLoadingRuns } = useListAgentRuns({
    query: { queryKey: getListAgentRunsQueryKey() }
  });
  const { data: agentActivity, isLoading: isLoadingActivity } = useGetAgentActivity({
    query: { queryKey: getGetAgentActivityQueryKey(), refetchInterval: 10000 }
  });

  const { toast } = useToast();
  const triggerResearch = useTriggerResearch();
  const triggerOrchestrate = useTriggerOrchestrate();
  
  const [isResearching, setIsResearching] = useState(false);
  const [orchestratingId, setOrchestratingId] = useState<number | null>(null);

  const handleResearch = () => {
    setIsResearching(true);
    triggerResearch.mutate({ data: { prompt: null } }, {
      onSuccess: () => {
        toast({ title: "Research Agent Dispatched", description: "Bob is scanning for top 5 business opportunities. Takes ~30s." });
        setIsResearching(false);
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to dispatch research agent.", variant: "destructive" });
        setIsResearching(false);
      }
    });
  };

  const handleOrchestrate = (businessId: number) => {
    setOrchestratingId(businessId);
    triggerOrchestrate.mutate({ businessId }, {
      onSuccess: () => {
        toast({ title: "Orchestrator Running", description: "Planning and assigning tasks to agents." });
        setOrchestratingId(null);
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to trigger orchestrator.", variant: "destructive" });
        setOrchestratingId(null);
      }
    });
  };

  const goalAmount = 100000;
  const currentAmount = summary?.totalBudget || 1000;
  const progressPercent = Math.min(100, Math.max(0, (currentAmount / goalAmount) * 100));
  const totalActiveAgents = agentActivity?.reduce((sum, b) => sum + b.activeTasks.length, 0) ?? 0;
  const totalApprovalNeeded = agentActivity?.reduce((sum, b) => 
    sum + b.activeTasks.filter(t => t.status === "waiting_approval").length, 0
  ) ?? 0;

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase" data-testid="heading-dashboard">Mission Control</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Bob OS v1.0.0 // $1k → $100k in 30 Days</p>
        </div>
        <Button
          onClick={handleResearch}
          disabled={isResearching}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono uppercase tracking-wider text-sm"
          data-testid="button-research"
        >
          {isResearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Target className="mr-2 h-4 w-4" />}
          Deploy Research Agent
        </Button>
      </div>

      {/* Approval Alert */}
      {totalApprovalNeeded > 0 && (
        <Card className="border-amber-500/50 bg-amber-500/10 animate-pulse-border">
          <CardContent className="p-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-300">{totalApprovalNeeded} task{totalApprovalNeeded !== 1 ? "s" : ""} waiting for your approval</p>
              <p className="text-xs text-muted-foreground">Agents are blocked and need your decision to continue.</p>
            </div>
            <div className="flex gap-1 flex-wrap">
              {agentActivity?.filter(b => b.activeTasks.some(t => t.status === "waiting_approval")).map(b => (
                <Link key={b.businessId} href={`/businesses/${b.businessId}`}>
                  <Button size="sm" variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/20 text-xs h-7 font-mono">
                    {b.businessName.split(" ").slice(0, 2).join(" ")} →
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Row - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Capital Progress (compact) */}
        <Card className="col-span-2 md:col-span-2 bg-card/50 border-primary/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
              <TrendingUp className="h-3 w-3 text-primary" /> Capital
            </div>
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="text-xl font-black font-mono text-foreground" data-testid="text-current-budget">
                ${currentAmount.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground font-mono" data-testid="text-goal-budget">/ $100k</span>
            </div>
            <Progress value={progressPercent} className="h-1.5 bg-secondary" />
            <p className="text-[10px] text-muted-foreground font-mono mt-1">{progressPercent.toFixed(1)}% of goal</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
              <Calendar className="h-3 w-3" /> Days Left
            </div>
            <p className="text-2xl font-bold font-mono" data-testid="text-days-remaining">{summary?.daysRemaining || 30}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
              <Briefcase className="h-3 w-3 text-primary" /> Active Ops
            </div>
            <p className="text-2xl font-bold font-mono text-foreground" data-testid="text-active-businesses">{summary?.activeBusinesses || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
              <Cpu className="h-3 w-3 text-blue-400" /> Live Agents
            </div>
            <p className="text-2xl font-bold font-mono text-foreground" data-testid="text-active-agents">{totalActiveAgents}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
              <Activity className="h-3 w-3 text-green-400" /> Tasks
            </div>
            <p className="text-base font-bold font-mono text-foreground" data-testid="text-tasks-summary">
              {summary?.openTasks || 0}<span className="text-muted-foreground/50 text-sm"> / </span>{summary?.inProgressTasks || 0}<span className="text-muted-foreground/50 text-sm"> / </span>{summary?.closedTasks || 0}
            </p>
            <p className="text-[10px] text-muted-foreground/60 font-mono">O / P / C</p>
          </CardContent>
        </Card>
      </div>

      {/* Live Agent Operations */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-blue-500 pl-3 flex items-center gap-2" data-testid="heading-agent-ops">
            Live Agent Operations
            {totalActiveAgents > 0 && <span className="inline-flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />}
          </h2>
          <span className="text-[10px] text-muted-foreground font-mono">Auto-refreshes every 10s</span>
        </div>

        {isLoadingActivity ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <Card key={i} className="animate-pulse bg-muted/20 border-border/50 h-28" />)}
          </div>
        ) : agentActivity && agentActivity.length > 0 ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {agentActivity.map((biz) => {
              const approvalCount = biz.activeTasks.filter(t => t.status === "waiting_approval").length;
              return (
                <Card
                  key={biz.businessId}
                  className={`bg-card/40 border-border/50 hover:border-primary/30 transition-colors ${approvalCount > 0 ? "border-amber-500/30 bg-amber-500/5" : ""}`}
                  data-testid={`agent-activity-biz-${biz.businessId}`}
                >
                  <CardHeader className="p-3 pb-2">
                    <div className="flex items-center justify-between gap-1">
                      <Link href={`/businesses/${biz.businessId}`}>
                        <CardTitle className="text-sm font-bold font-mono uppercase hover:text-primary cursor-pointer truncate max-w-[140px]">
                          {biz.businessName}
                        </CardTitle>
                      </Link>
                      <div className="flex items-center gap-1 shrink-0">
                        {approvalCount > 0 && (
                          <Badge className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border-amber-500/30 px-1 py-0">
                            <AlertTriangle className="h-2 w-2 mr-0.5" />{approvalCount} approval
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-[9px] font-mono uppercase border-border/50 px-1 py-0">
                          {biz.businessStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mt-1">
                      <span className="flex items-center gap-0.5"><Circle className="h-2 w-2 text-yellow-500/70" /> {biz.openCount}</span>
                      <span className="flex items-center gap-0.5"><Clock className="h-2 w-2 text-blue-500/70" /> {biz.inProgressCount}</span>
                      <span className="flex items-center gap-0.5"><CheckCircle2 className="h-2 w-2 text-green-500/70" /> {biz.closedCount}</span>
                      <span className="text-muted-foreground/40">tasks</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 space-y-1.5">
                    {biz.activeTasks.length === 0 ? (
                      <div className="text-xs text-muted-foreground/60 italic py-2 text-center">
                        {biz.totalTasks === 0 ? "No tasks — run Orchestrator to start" : "No active agents right now"}
                      </div>
                    ) : (
                      biz.activeTasks.slice(0, 3).map((task) => (
                        <Link key={task.taskId} href={`/businesses/${biz.businessId}/tasks/${task.taskId}`}>
                          <div
                            className={`flex items-start gap-2 p-2 rounded-md border transition-colors cursor-pointer ${
                              task.status === "waiting_approval"
                                ? "bg-amber-500/10 border-amber-500/30 hover:border-amber-400/50"
                                : "bg-muted/20 border-border/30 hover:border-primary/30"
                            }`}
                            data-testid={`active-task-${task.taskId}`}
                          >
                            <span className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 ${task.status === "waiting_approval" ? "bg-amber-400" : "bg-blue-500 animate-pulse"}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                                <AgentBadge type={task.agentType} className="text-[9px]" />
                                {task.status === "waiting_approval" && (
                                  <span className="text-[9px] font-mono text-amber-400 uppercase">⚠ awaiting</span>
                                )}
                              </div>
                              <p className="text-xs text-foreground/80 truncate">{task.title}</p>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                    {biz.activeTasks.length > 3 && (
                      <Link href={`/businesses/${biz.businessId}`}>
                        <p className="text-[10px] text-muted-foreground text-center hover:text-foreground cursor-pointer">
                          +{biz.activeTasks.length - 3} more active →
                        </p>
                      </Link>
                    )}
                    {biz.totalTasks === 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs text-primary/70 hover:text-primary border border-dashed border-primary/20 hover:border-primary/40 mt-1 h-7"
                        onClick={() => handleOrchestrate(biz.businessId)}
                        disabled={orchestratingId === biz.businessId}
                        data-testid={`button-orchestrate-activity-${biz.businessId}`}
                      >
                        {orchestratingId === biz.businessId ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Play className="mr-1 h-3 w-3" />}
                        Run Orchestrator
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-card/20 border-dashed border-blue-500/20 py-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="h-8 w-8 text-blue-500/30" />
              <p className="text-sm text-muted-foreground">No businesses found yet.</p>
              <p className="text-xs text-muted-foreground/70">Deploy the Research Agent to discover opportunities.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Active Portfolio */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-primary pl-3" data-testid="heading-portfolio">
            Active Portfolio
          </h2>
        </div>

        {isLoadingBusinesses ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => <Card key={i} className="animate-pulse bg-muted/20 border-border/50 h-36" />)}
          </div>
        ) : businesses && businesses.length > 0 ? (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((biz) => {
              const activity = agentActivity?.find(a => a.businessId === biz.id);
              const hasApproval = (activity?.activeTasks ?? []).some(t => t.status === "waiting_approval");
              return (
                <Card
                  key={biz.id}
                  className={`bg-card/50 border-border/60 hover:border-primary/40 transition-colors flex flex-col ${hasApproval ? "border-amber-500/30" : ""}`}
                  data-testid={`card-business-${biz.id}`}
                >
                  <CardHeader className="p-3 pb-1">
                    <div className="flex justify-between items-start gap-1">
                      <CardTitle className="text-sm truncate pr-1">{biz.name}</CardTitle>
                      <div className="flex items-center gap-1 shrink-0">
                        {hasApproval && <AlertTriangle className="h-3 w-3 text-amber-400" />}
                        <Badge variant={biz.status === "active" ? "default" : "secondary"} className="uppercase text-[9px]">
                          {biz.status}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-1 text-xs">{biz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-1 flex-1">
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-mono mb-2">
                      <div className="bg-muted/30 p-1.5 rounded border border-border/50">
                        <span className="block text-[9px] text-muted-foreground mb-0.5">TARGET REV</span>
                        <span className="font-semibold text-xs">{biz.targetRevenue30d || "N/A"}</span>
                      </div>
                      <div className="bg-muted/30 p-1.5 rounded border border-border/50">
                        <span className="block text-[9px] text-muted-foreground mb-0.5">PLATFORM</span>
                        <span className="font-semibold text-xs truncate block">{biz.platform || "-"}</span>
                      </div>
                    </div>
                    {activity && activity.totalTasks > 0 && (
                      <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                        <span className="flex items-center gap-0.5"><Circle className="h-2 w-2 text-yellow-500/70" /> {activity.openCount}</span>
                        <span className="flex items-center gap-0.5"><Clock className="h-2 w-2 text-blue-500 animate-pulse" /> {activity.inProgressCount}</span>
                        <span className="flex items-center gap-0.5"><CheckCircle2 className="h-2 w-2 text-green-500/70" /> {activity.closedCount}</span>
                        <span className="text-muted-foreground/40">tasks</span>
                        {activity.inProgressCount > 0 && (
                          <span className="text-blue-400/70">• {activity.inProgressCount} agent{activity.inProgressCount !== 1 ? "s" : ""} working</span>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-2 flex gap-2 border-t border-border/30">
                    <Link href={`/businesses/${biz.id}`} className="flex-1">
                      <Button variant="secondary" className="w-full text-xs font-mono uppercase h-7" data-testid={`link-business-${biz.id}`}>
                        Open Project
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-primary/20 hover:bg-primary/10 text-primary h-7 w-7 shrink-0"
                      onClick={() => handleOrchestrate(biz.id)}
                      disabled={orchestratingId === biz.id}
                      title="Run Orchestrator"
                      data-testid={`button-orchestrate-${biz.id}`}
                    >
                      {orchestratingId === biz.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-card/30 border-dashed py-10 flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Briefcase className="h-5 w-5 text-primary/50" />
            </div>
            <p className="text-muted-foreground font-medium mb-1">No Active Businesses</p>
            <p className="text-sm text-muted-foreground/70 mb-3 max-w-sm">Deploy the Research Agent to identify new opportunities.</p>
            <Button onClick={handleResearch} disabled={isResearching} variant="outline" className="border-primary/30 text-primary">
              {isResearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Start Research
            </Button>
          </Card>
        )}
      </div>

      {/* Recent Agent Runs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight uppercase font-mono border-l-2 border-secondary pl-3" data-testid="heading-recent-activity">
            Recent Agent Runs
          </h2>
          <Link href="/agent-runs">
            <Button variant="link" className="text-xs text-muted-foreground hover:text-foreground pr-0">View All</Button>
          </Link>
        </div>

        <Card className="bg-card/40 border-border/50">
          <div className="divide-y divide-border/30">
            {isLoadingRuns ? (
              <div className="p-4 text-center text-sm text-muted-foreground animate-pulse">Loading logs...</div>
            ) : agentRuns && agentRuns.length > 0 ? (
              agentRuns.slice(0, 5).map((run) => (
                <div key={run.id} className="p-3 flex items-center justify-between hover:bg-muted/10 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                      run.status === "running" ? "bg-primary animate-pulse" :
                      run.status === "completed" ? "bg-green-500" :
                      run.status === "failed" ? "bg-destructive" : "bg-yellow-500"
                    }`} />
                    <div>
                      <p className="text-sm font-medium capitalize">
                        {run.agentType} Agent <span className="text-xs text-muted-foreground font-mono">#{run.id}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {run.businessId ? `Business #${run.businessId}` : "Global Research"}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] uppercase font-mono ${
                    run.status === "running" ? "border-primary/50 text-primary" :
                    run.status === "completed" ? "border-green-500/50 text-green-400" :
                    run.status === "failed" ? "border-destructive/50 text-destructive" :
                    "border-yellow-500/50 text-yellow-400"
                  }`}>
                    {run.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No agent runs yet. Click "Deploy Research Agent" to start.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
