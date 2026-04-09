import { useListAgentRuns, getListAgentRunsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Activity, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Link } from "wouter";

export default function AgentRuns() {
  const { data: runs, isLoading } = useListAgentRuns({
    query: { 
      queryKey: getListAgentRunsQueryKey(),
      refetchInterval: 5000 // Poll every 5s for live updates
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-4 w-4 text-blue-400 animate-pulse" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case 'completed': return "bg-green-500/10 text-green-400 border-green-500/20";
      case 'failed': return "bg-destructive/10 text-destructive border-destructive/20";
      case 'pending': return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase" data-testid="heading-agent-runs">Agent Telemetry</h1>
          <p className="text-muted-foreground mt-1 text-sm">Live log of all automated operations</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary font-mono bg-primary/10 px-3 py-1.5 rounded border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Live Connection
        </div>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader className="border-b border-border/30 bg-muted/5">
          <div className="grid grid-cols-12 gap-4 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <div className="col-span-2">Run ID / Time</div>
            <div className="col-span-2">Agent Identity</div>
            <div className="col-span-2">Target</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-4">Latest Telemetry</div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
            </div>
          ) : runs && runs.length > 0 ? (
            <div className="divide-y divide-border/30" data-testid="list-agent-runs">
              {runs.map((run) => (
                <div key={run.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/10 transition-colors items-center text-sm group" data-testid={`row-run-${run.id}`}>
                  <div className="col-span-2 font-mono">
                    <div className="text-foreground font-bold">#{run.id}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {new Date(run.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="capitalize font-medium text-foreground">{run.agentType}</span>
                  </div>
                  <div className="col-span-2 font-mono text-xs">
                    {run.businessId ? (
                      <Link href={`/businesses/${run.businessId}`} className="text-primary hover:underline">
                        BIZ-{run.businessId}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">GLOBAL</span>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline" className={`uppercase font-mono text-[10px] flex w-fit items-center gap-1.5 ${getStatusColor(run.status)}`}>
                      {getStatusIcon(run.status)}
                      {run.status}
                    </Badge>
                  </div>
                  <div className="col-span-4">
                    <div className="font-mono text-xs text-muted-foreground truncate group-hover:text-foreground transition-colors bg-muted/20 px-2 py-1 rounded border border-border/30">
                      {run.log ? run.log.split('\n').pop() || 'Initializing...' : 'Awaiting telemetry...'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground font-mono uppercase tracking-widest text-sm">
              No telemetry data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
