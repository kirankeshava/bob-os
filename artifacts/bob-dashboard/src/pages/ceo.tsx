import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Circle,
  RefreshCw,
  Loader2,
  Send,
  ShieldAlert,
  Flag,
  Calendar,
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

interface Goal {
  title: string;
  description: string;
  target: string;
  deadline: string;
  status: "on_track" | "at_risk" | "behind" | "achieved";
}

interface Milestone {
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  progress: number;
}

interface CeoPlan {
  id: number;
  overallStrategy: string;
  goals: Goal[];
  milestones: Milestone[];
  profitabilityStrategy: string;
  gaps: string[];
  threats: string[];
  concerns: string[];
  generatedAt: string;
  updatedAt: string;
}

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

const GOAL_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  on_track: { label: "On Track", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30" },
  at_risk: { label: "At Risk", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  behind: { label: "Behind", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
  achieved: { label: "Achieved", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" },
};

export default function CeoPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: plan, isLoading: isPlanLoading } = useQuery<CeoPlan>({
    queryKey: ["ceo-plan"],
    queryFn: () => apiFetch("/api/ceo/plan"),
    staleTime: 5 * 60 * 1000,
  });

  const { data: chatMessages = [], isLoading: isChatLoading } = useQuery<ChatMessage[]>({
    queryKey: ["ceo-chat"],
    queryFn: () => apiFetch("/api/ceo/chat"),
    staleTime: 0,
  });

  const refreshPlan = useMutation({
    mutationFn: () => apiFetch("/api/ceo/plan/refresh", { method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ceo-plan"] });
      toast({ title: "Plan Refreshed", description: "Bob has regenerated the strategic CEO plan." });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const sendMessage = useMutation({
    mutationFn: (message: string) =>
      apiFetch("/api/ceo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ceo-chat"] });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    const trimmed = chatInput.trim();
    if (!trimmed || sendMessage.isPending) return;
    setChatInput("");
    sendMessage.mutate(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const goals = (plan?.goals ?? []) as Goal[];
  const milestones = (plan?.milestones ?? []) as Milestone[];
  const gaps = (plan?.gaps ?? []) as string[];
  const threats = (plan?.threats ?? []) as string[];
  const concerns = (plan?.concerns ?? []) as string[];

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase flex items-center gap-2" data-testid="heading-ceo">
            <Crown className="h-6 w-6 text-primary" />
            CEO Command
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Bob's strategic operating layer — plan, goals, and portfolio health</p>
        </div>
        <Button
          onClick={() => refreshPlan.mutate()}
          disabled={refreshPlan.isPending || isPlanLoading}
          variant="outline"
          className="font-mono text-xs border-primary/30 hover:border-primary text-primary"
          data-testid="button-refresh-plan"
        >
          {refreshPlan.isPending ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="mr-2 h-3.5 w-3.5" />}
          Regenerate Plan
        </Button>
      </div>

      {isPlanLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse bg-muted/20 border-border/50 h-36" />
          ))}
        </div>
      ) : (
        <>
          {/* Overall Strategy */}
          {plan?.overallStrategy && (
            <Card className="bg-card/50 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-mono mb-2">
                  <Crown className="h-3.5 w-3.5 text-primary" />
                  Current Strategy
                </div>
                <p className="text-sm text-foreground leading-relaxed">{plan.overallStrategy}</p>
                <p className="text-[10px] text-muted-foreground/50 font-mono mt-2">
                  Generated {new Date(plan.generatedAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Goals & Milestones */}
            <div className="space-y-4">
              {/* Goals */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="p-4 pb-2 border-b border-border/30">
                  <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                    <Target className="h-4 w-4 text-primary" />
                    Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {goals.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground text-sm">No goals yet</div>
                  ) : (
                    <ul className="divide-y divide-border/30">
                      {goals.map((goal, i) => {
                        const cfg = GOAL_STATUS_CONFIG[goal.status] ?? GOAL_STATUS_CONFIG.at_risk;
                        return (
                          <li key={i} className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground">{goal.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{goal.description}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span className="text-[10px] font-mono bg-muted/40 border border-border/40 px-1.5 py-0.5 rounded text-foreground/70">
                                    {goal.target}
                                  </span>
                                  <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground/60 font-mono">
                                    <Calendar className="h-2.5 w-2.5" />
                                    {goal.deadline}
                                  </span>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={`text-[9px] font-mono uppercase shrink-0 ${cfg.bg} ${cfg.color}`}
                              >
                                {cfg.label}
                              </Badge>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="p-4 pb-2 border-b border-border/30">
                  <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                    <Flag className="h-4 w-4 text-blue-400" />
                    Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {milestones.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground text-sm">No milestones yet</div>
                  ) : (
                    <ul className="divide-y divide-border/30">
                      {milestones.map((m, i) => (
                        <li key={i} className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0">
                              {m.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-400" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground/50" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className={`text-sm font-medium ${m.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                  {m.title}
                                </p>
                                <span className="text-[10px] text-muted-foreground/50 font-mono shrink-0">{m.targetDate}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{m.description}</p>
                              {!m.completed && m.progress > 0 && (
                                <div className="mt-1.5">
                                  <Progress value={m.progress} className="h-1" />
                                  <p className="text-[9px] text-muted-foreground/50 font-mono mt-0.5">{m.progress}% complete</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right column: Profitability + Gaps/Threats */}
            <div className="space-y-4">
              {/* Profitability Roadmap */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader className="p-4 pb-2 border-b border-border/30">
                  <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    Profitability Roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {plan?.profitabilityStrategy ? (
                    <p className="text-sm text-foreground/90 leading-relaxed">{plan.profitabilityStrategy}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">Not yet generated</p>
                  )}
                </CardContent>
              </Card>

              {/* Gaps, Threats & Concerns */}
              <Card className="bg-card/50 border-amber-500/20">
                <CardHeader className="p-4 pb-2 border-b border-amber-500/20">
                  <CardTitle className="text-sm font-mono uppercase flex items-center gap-2 text-amber-400">
                    <ShieldAlert className="h-4 w-4" />
                    Gaps, Threats &amp; Concerns
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {gaps.length === 0 && threats.length === 0 && concerns.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">None identified yet</p>
                  ) : (
                    <>
                      {gaps.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-muted-foreground/60 mb-1.5">Capability Gaps</p>
                          <ul className="space-y-1.5">
                            {gaps.map((g, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                                <span className="shrink-0 mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-400" />
                                {g}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {threats.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-muted-foreground/60 mb-1.5">Threats</p>
                          <ul className="space-y-1.5">
                            {threats.map((t, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                                <span className="shrink-0 mt-0.5 h-1.5 w-1.5 rounded-full bg-red-400" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {concerns.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase font-mono text-muted-foreground/60 mb-1.5">Concerns</p>
                          <ul className="space-y-1.5">
                            {concerns.map((c, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                                <span className="shrink-0 mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* CEO Chat */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="p-4 pb-3 border-b border-border/30">
          <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" />
            Chat with Bob (CEO)
            <span className="text-[10px] normal-case font-normal text-muted-foreground ml-1">— discuss strategy, business health, or anything on your mind</span>
          </CardTitle>
        </CardHeader>

        {/* Messages */}
        <CardContent className="p-0">
          <div className="h-80 overflow-y-auto p-4 space-y-3" data-testid="chat-messages">
            {isChatLoading ? (
              <div className="flex justify-center pt-8">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                <Crown className="h-8 w-8 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">No messages yet.</p>
                <p className="text-xs text-muted-foreground/60">Ask Bob about strategy, goals, business health, or next steps.</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 mr-2 shrink-0 mt-0.5">
                      <span className="text-primary font-bold text-[10px]">B</span>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary/20 text-foreground border border-primary/30"
                        : "bg-muted/30 text-foreground border border-border/30"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {sendMessage.isPending && (
              <div className="flex justify-start">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 mr-2 shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-[10px]">B</span>
                </div>
                <div className="bg-muted/30 border border-border/30 rounded-lg px-3 py-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/30 flex gap-2">
            <Input
              ref={inputRef}
              placeholder="Ask Bob about strategy, goals, or business health..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sendMessage.isPending}
              className="flex-1 bg-muted/10 border-border/50 text-sm"
              data-testid="chat-input"
            />
            <Button
              onClick={handleSend}
              disabled={sendMessage.isPending || !chatInput.trim()}
              size="icon"
              className="shrink-0"
              data-testid="chat-send-btn"
            >
              {sendMessage.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
