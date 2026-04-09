import React, { useState } from "react";
import { useRoute, Link } from "wouter";
import {
  useGetBusiness,
  useGetBusinessPerformance, getGetBusinessPerformanceQueryKey,
  useUpdateBusinessPerformance,
  useListCustomerFeedback, getListCustomerFeedbackQueryKey,
  useCreateCustomerFeedback,
  useDeleteCustomerFeedback,
  useListCompetitors, getListCompetitorsQueryKey,
  useCreateCompetitor,
  useDeleteCompetitor,
  BusinessPerformance,
  CustomerFeedback,
  Competitor,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft, DollarSign, Users, TrendingUp, Target,
  ThumbsUp, ThumbsDown, Minus, Plus, Trash2, Loader2,
  Activity, BarChart2, Shield, Save, X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

function HealthBanner({ score }: { score: string | null | undefined }) {
  const s = score || "yellow";
  const config: Record<string, { bg: string; border: string; text: string; label: string }> = {
    green: { bg: "bg-green-500/10", border: "border-green-500/40", text: "text-green-400", label: "Healthy" },
    yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500/40", text: "text-yellow-400", label: "Needs Attention" },
    red: { bg: "bg-red-500/10", border: "border-red-500/40", text: "text-red-400", label: "At Risk" },
  };
  const c = config[s] || config.yellow;
  return (
    <div className={`rounded-lg border ${c.border} ${c.bg} p-4 flex items-center gap-3`}>
      <Activity className={`h-6 w-6 ${c.text}`} />
      <div>
        <p className={`text-lg font-bold font-mono ${c.text}`}>{c.label}</p>
        <p className="text-xs text-muted-foreground">Overall business health</p>
      </div>
      <div className="ml-auto flex gap-1">
        {["green", "yellow", "red"].map(v => (
          <span key={v} className={`h-3 w-3 rounded-full border ${v === s ? (v === "green" ? "bg-green-500 border-green-400" : v === "yellow" ? "bg-yellow-500 border-yellow-400" : "bg-red-500 border-red-400") : "bg-muted/30 border-border/40"}`} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value, prefix, suffix, icon: Icon }: {
  label: string; value: number | string | null | undefined; prefix?: string; suffix?: string; icon: React.ElementType;
}) {
  const display = value != null && value !== "" ? `${prefix || ""}${value}${suffix || ""}` : "—";
  return (
    <Card className="bg-card/40 border-border/40">
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground font-mono uppercase">{label}</span>
        </div>
        <p className="text-xl font-bold font-mono text-foreground">{display}</p>
      </CardContent>
    </Card>
  );
}

const SENTIMENT_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  positive: { icon: ThumbsUp, color: "text-green-400" },
  neutral: { icon: Minus, color: "text-yellow-400" },
  negative: { icon: ThumbsDown, color: "text-red-400" },
};

export default function BusinessPerformancePage() {
  const [, params] = useRoute("/businesses/:id/performance");
  const businessId = Number(params?.id);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: business } = useGetBusiness(businessId);
  const { data: perf, isLoading: perfLoading } = useGetBusinessPerformance(businessId, {
    query: { queryKey: getGetBusinessPerformanceQueryKey(businessId), enabled: !!businessId },
  });
  const { data: feedbackList } = useListCustomerFeedback(businessId, {
    query: { queryKey: getListCustomerFeedbackQueryKey(businessId), enabled: !!businessId },
  });
  const { data: competitorsList } = useListCompetitors(businessId, {
    query: { queryKey: getListCompetitorsQueryKey(businessId), enabled: !!businessId },
  });

  const updatePerf = useUpdateBusinessPerformance();
  const createFeedback = useCreateCustomerFeedback();
  const deleteFeedback = useDeleteCustomerFeedback();
  const createCompetitor = useCreateCompetitor();
  const deleteCompetitorMut = useDeleteCompetitor();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [fbForm, setFbForm] = useState({ source: "", text: "", sentiment: "neutral" });
  const [showCompForm, setShowCompForm] = useState(false);
  const [compForm, setCompForm] = useState({ name: "", strengths: "", weaknesses: "", pricing: "", notes: "" });

  const startEdit = () => {
    if (!perf) return;
    setForm({
      income: String(perf.income ?? ""),
      monthlySpend: String(perf.monthlySpend ?? ""),
      netBurnProfit: String(perf.netBurnProfit ?? ""),
      runwayDays: String(perf.runwayDays ?? ""),
      reached: String(perf.reached ?? ""),
      signups: String(perf.signups ?? ""),
      activeUsers: String(perf.activeUsers ?? ""),
      arpu: String(perf.arpu ?? ""),
      churnRate: String(perf.churnRate ?? ""),
      npsScore: String(perf.npsScore ?? ""),
      healthScore: perf.healthScore ?? "yellow",
      topSources: perf.topSources ?? "",
      notes: perf.notes ?? "",
    });
    setEditing(true);
  };

  const saveEdit = () => {
    const body: Record<string, unknown> = {};
    const numFields = ["income", "monthlySpend", "netBurnProfit", "arpu", "churnRate", "npsScore"];
    const intFields = ["runwayDays", "reached", "signups", "activeUsers"];
    for (const key of numFields) {
      if (form[key] !== "") body[key] = parseFloat(form[key]);
    }
    for (const key of intFields) {
      if (form[key] !== "") body[key] = parseInt(form[key], 10);
    }
    if (form.healthScore) body.healthScore = form.healthScore;
    body.topSources = form.topSources || "";
    body.notes = form.notes || "";

    updatePerf.mutate({ businessId, data: body as any }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetBusinessPerformanceQueryKey(businessId) });
        setEditing(false);
        toast({ title: "Saved", description: "Performance metrics updated." });
      },
      onError: () => toast({ title: "Error", description: "Failed to save.", variant: "destructive" }),
    });
  };

  const handleAddFeedback = () => {
    if (!fbForm.text.trim()) return;
    createFeedback.mutate({ businessId, data: fbForm }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCustomerFeedbackQueryKey(businessId) });
        setFbForm({ source: "", text: "", sentiment: "neutral" });
        setShowFeedbackForm(false);
        toast({ title: "Added", description: "Feedback entry added." });
      },
      onError: () => toast({ title: "Error", description: "Failed to add feedback.", variant: "destructive" }),
    });
  };

  const handleDeleteFeedback = (id: number) => {
    deleteFeedback.mutate({ businessId, feedbackId: id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCustomerFeedbackQueryKey(businessId) });
        toast({ title: "Deleted" });
      },
    });
  };

  const handleAddCompetitor = () => {
    if (!compForm.name.trim()) return;
    createCompetitor.mutate({ businessId, data: compForm }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCompetitorsQueryKey(businessId) });
        setCompForm({ name: "", strengths: "", weaknesses: "", pricing: "", notes: "" });
        setShowCompForm(false);
        toast({ title: "Added", description: "Competitor added." });
      },
      onError: () => toast({ title: "Error", description: "Failed to add competitor.", variant: "destructive" }),
    });
  };

  const handleDeleteCompetitor = (id: number) => {
    deleteCompetitorMut.mutate({ businessId, competitorId: id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListCompetitorsQueryKey(businessId) });
        toast({ title: "Deleted" });
      },
    });
  };

  const signupConversion = perf && perf.reached && perf.reached > 0 && perf.signups != null
    ? ((perf.signups / perf.reached) * 100).toFixed(1) : null;

  const feedbackSentiments = feedbackList || [];
  const posCount = feedbackSentiments.filter(f => f.sentiment === "positive").length;
  const negCount = feedbackSentiments.filter(f => f.sentiment === "negative").length;
  const total = feedbackSentiments.length;
  const npsDisplay = perf?.npsScore != null ? perf.npsScore : (total > 0 ? Math.round(((posCount - negCount) / total) * 100) : null);

  if (perfLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex items-center gap-3">
        <Link to={`/businesses/${businessId}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-lg font-bold font-mono">{business?.name || "Business"} — Performance</h1>
          <p className="text-xs text-muted-foreground">Business health overview and metrics</p>
        </div>
        {!editing ? (
          <Button size="sm" variant="outline" onClick={startEdit} className="text-xs font-mono">
            Edit Metrics
          </Button>
        ) : (
          <div className="flex gap-1.5">
            <Button size="sm" onClick={saveEdit} disabled={updatePerf.isPending} className="text-xs font-mono">
              {updatePerf.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Save className="h-3 w-3 mr-1" />}
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)} className="text-xs font-mono">
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
          </div>
        )}
      </div>

      <HealthBanner score={editing ? form.healthScore : perf?.healthScore} />

      {editing && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">Health:</span>
          {["green", "yellow", "red"].map(v => (
            <Button key={v} size="sm" variant={form.healthScore === v ? "default" : "outline"}
              onClick={() => setForm(f => ({ ...f, healthScore: v }))}
              className={`text-xs font-mono capitalize h-7 px-3 ${form.healthScore === v ? "" : ""}`}>
              {v}
            </Button>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-sm font-bold font-mono uppercase text-muted-foreground mb-2 flex items-center gap-2">
          <DollarSign className="h-4 w-4" /> Financials
        </h2>
        {editing ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: "income", label: "Income to Date ($)" },
              { key: "monthlySpend", label: "Monthly Spend ($)" },
              { key: "netBurnProfit", label: "Net Burn/Profit ($)" },
              { key: "runwayDays", label: "Runway (days)" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">{f.label}</label>
                <Input value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="h-8 text-xs font-mono" type="number" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard label="Income to Date" value={perf?.income} prefix="$" icon={DollarSign} />
            <MetricCard label="Monthly Spend" value={perf?.monthlySpend} prefix="$" icon={DollarSign} />
            <MetricCard label="Net Burn/Profit" value={perf?.netBurnProfit} prefix="$" icon={TrendingUp} />
            <MetricCard label="Runway" value={perf?.runwayDays} suffix=" days" icon={Target} />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-bold font-mono uppercase text-muted-foreground mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" /> Growth
        </h2>
        {editing ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: "reached", label: "Outreach Count" },
              { key: "signups", label: "Signups" },
              { key: "activeUsers", label: "Active Users" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">{f.label}</label>
                <Input value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="h-8 text-xs font-mono" type="number" />
              </div>
            ))}
            <div>
              <label className="text-[10px] text-muted-foreground font-mono block mb-1">Conversion Rate</label>
              <Input value={signupConversion ? `${signupConversion}%` : "—"} disabled className="h-8 text-xs font-mono" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard label="Reached" value={perf?.reached} icon={Users} />
            <MetricCard label="Signups" value={perf?.signups} icon={Users} />
            <MetricCard label="Active Users" value={perf?.activeUsers} icon={Users} />
            <MetricCard label="Conversion" value={signupConversion} suffix="%" icon={TrendingUp} />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold font-mono uppercase text-muted-foreground flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" /> Customer Feedback
            {npsDisplay != null && (
              <Badge variant="outline" className="ml-2 text-[10px] font-mono">NPS: {npsDisplay}</Badge>
            )}
          </h2>
          <Button size="sm" variant="outline" onClick={() => setShowFeedbackForm(v => !v)} className="text-xs font-mono h-7">
            {showFeedbackForm ? <><X className="h-3 w-3 mr-1" /> Cancel</> : <><Plus className="h-3 w-3 mr-1" /> Add</>}
          </Button>
        </div>

        {showFeedbackForm && (
          <Card className="bg-card/40 border-border/40 mb-3">
            <CardContent className="p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Source</label>
                  <Input value={fbForm.source} onChange={e => setFbForm(f => ({ ...f, source: e.target.value }))}
                    placeholder="e.g. Email, Twitter" className="h-8 text-xs font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Sentiment</label>
                  <div className="flex gap-1">
                    {(["positive", "neutral", "negative"] as const).map(s => (
                      <Button key={s} size="sm" variant={fbForm.sentiment === s ? "default" : "outline"}
                        onClick={() => setFbForm(f => ({ ...f, sentiment: s }))}
                        className={`text-[10px] font-mono capitalize h-8 flex-1`}>
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">Feedback</label>
                <Textarea value={fbForm.text} onChange={e => setFbForm(f => ({ ...f, text: e.target.value }))}
                  placeholder="Customer feedback text..." className="text-xs font-mono min-h-[60px]" />
              </div>
              <Button size="sm" onClick={handleAddFeedback} disabled={createFeedback.isPending} className="text-xs font-mono">
                {createFeedback.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                Add Feedback
              </Button>
            </CardContent>
          </Card>
        )}

        {feedbackSentiments.length === 0 ? (
          <p className="text-xs text-muted-foreground/60 font-mono py-4 text-center">No feedback entries yet</p>
        ) : (
          <div className="space-y-2">
            {feedbackSentiments.map(fb => {
              const si = SENTIMENT_ICONS[fb.sentiment] || SENTIMENT_ICONS.neutral;
              const SIcon = si.icon;
              return (
                <Card key={fb.id} className="bg-card/40 border-border/40">
                  <CardContent className="p-3 flex items-start gap-3">
                    <SIcon className={`h-4 w-4 mt-0.5 shrink-0 ${si.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-foreground">{fb.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[9px] font-mono capitalize">{fb.sentiment}</Badge>
                        {fb.source && <span className="text-[9px] text-muted-foreground font-mono">{fb.source}</span>}
                        <span className="text-[9px] text-muted-foreground/60 font-mono">
                          {new Date(fb.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0 text-muted-foreground hover:text-red-400"
                      onClick={() => handleDeleteFeedback(fb.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-bold font-mono uppercase text-muted-foreground mb-2 flex items-center gap-2">
          <BarChart2 className="h-4 w-4" /> Business Metrics
        </h2>
        {editing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: "arpu", label: "Avg Revenue/User ($)" },
              { key: "churnRate", label: "Churn Rate (%)" },
              { key: "npsScore", label: "NPS Score" },
            ].map(f => (
              <div key={f.key}>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">{f.label}</label>
                <Input value={form[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="h-8 text-xs font-mono" type="number" step="0.01" />
              </div>
            ))}
            <div className="col-span-2 md:col-span-3">
              <label className="text-[10px] text-muted-foreground font-mono block mb-1">Top Acquisition Sources</label>
              <Input value={form.topSources} onChange={e => setForm(prev => ({ ...prev, topSources: e.target.value }))}
                placeholder="e.g. Google, Reddit, Word of Mouth" className="h-8 text-xs font-mono" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <MetricCard label="Avg Revenue/User" value={perf?.arpu} prefix="$" icon={DollarSign} />
              <MetricCard label="Churn Rate" value={perf?.churnRate} suffix="%" icon={TrendingUp} />
              <MetricCard label="NPS Score" value={npsDisplay} icon={ThumbsUp} />
            </div>
            {perf?.topSources && (
              <div className="mt-2">
                <span className="text-[10px] text-muted-foreground font-mono">Top Sources: </span>
                <span className="text-xs font-mono text-foreground">{perf.topSources}</span>
              </div>
            )}
          </>
        )}
      </div>

      {editing && (
        <div>
          <label className="text-[10px] text-muted-foreground font-mono block mb-1">Notes</label>
          <Textarea value={form.notes} onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Any additional notes..." className="text-xs font-mono min-h-[60px]" />
        </div>
      )}
      {!editing && perf?.notes && (
        <div>
          <h2 className="text-sm font-bold font-mono uppercase text-muted-foreground mb-1">Notes</h2>
          <p className="text-xs text-foreground font-mono whitespace-pre-wrap">{perf.notes}</p>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold font-mono uppercase text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" /> Competition
          </h2>
          <Button size="sm" variant="outline" onClick={() => setShowCompForm(v => !v)} className="text-xs font-mono h-7">
            {showCompForm ? <><X className="h-3 w-3 mr-1" /> Cancel</> : <><Plus className="h-3 w-3 mr-1" /> Add</>}
          </Button>
        </div>

        {showCompForm && (
          <Card className="bg-card/40 border-border/40 mb-3">
            <CardContent className="p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Name *</label>
                  <Input value={compForm.name} onChange={e => setCompForm(f => ({ ...f, name: e.target.value }))}
                    className="h-8 text-xs font-mono" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Pricing</label>
                  <Input value={compForm.pricing} onChange={e => setCompForm(f => ({ ...f, pricing: e.target.value }))}
                    className="h-8 text-xs font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Strengths</label>
                  <Textarea value={compForm.strengths} onChange={e => setCompForm(f => ({ ...f, strengths: e.target.value }))}
                    className="text-xs font-mono min-h-[48px]" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground font-mono block mb-1">Weaknesses</label>
                  <Textarea value={compForm.weaknesses} onChange={e => setCompForm(f => ({ ...f, weaknesses: e.target.value }))}
                    className="text-xs font-mono min-h-[48px]" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground font-mono block mb-1">Notes</label>
                <Input value={compForm.notes} onChange={e => setCompForm(f => ({ ...f, notes: e.target.value }))}
                  className="h-8 text-xs font-mono" />
              </div>
              <Button size="sm" onClick={handleAddCompetitor} disabled={createCompetitor.isPending} className="text-xs font-mono">
                {createCompetitor.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                Add Competitor
              </Button>
            </CardContent>
          </Card>
        )}

        {(!competitorsList || competitorsList.length === 0) ? (
          <p className="text-xs text-muted-foreground/60 font-mono py-4 text-center">No competitors tracked yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-border/40 text-muted-foreground text-left">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Strengths</th>
                  <th className="py-2 pr-3">Weaknesses</th>
                  <th className="py-2 pr-3">Pricing</th>
                  <th className="py-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {competitorsList.map(comp => (
                  <tr key={comp.id} className="border-b border-border/20 hover:bg-muted/10">
                    <td className="py-2 pr-3 font-semibold text-foreground">{comp.name}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{comp.strengths || "—"}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{comp.weaknesses || "—"}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{comp.pricing || "—"}</td>
                    <td className="py-2">
                      <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-red-400"
                        onClick={() => handleDeleteCompetitor(comp.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
