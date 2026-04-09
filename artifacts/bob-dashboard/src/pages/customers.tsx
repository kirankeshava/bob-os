import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, CheckCircle, XCircle, AlertTriangle, ExternalLink, RefreshCw, Mail, Star, BarChart2, ChevronDown, ChevronUp, Send, Eye, CreditCard, DollarSign, Check } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  businessName: string;
  platforms: string[];
  googleUrl: string | null;
  yelpUrl: string | null;
  stripeCustomerId: string | null;
  paymentMethod: string;
  paypalSubscriptionId: string | null;
  subscriptionStatus: string;
  trialStartAt: string;
  trialEndAt: string;
  createdAt: string;
}

interface Review {
  id: number;
  customerId: number;
  platform: string;
  rating: number;
  authorName: string;
  reviewText: string;
  reviewDate: string;
  proposedReplyText: string | null;
  respondedAt: string | null;
}

interface DailyReport {
  id: number;
  customerId: number;
  dayNumber: number;
  sentAt: string | null;
  emailMessageId: string | null;
  reportData: Record<string, unknown> | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  trial: { label: "Trial", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Clock },
  active: { label: "Active", color: "bg-green-500/20 text-green-300 border-green-500/30", icon: CheckCircle },
  trial_expired: { label: "Trial Expired", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: AlertTriangle },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-300 border-red-500/30", icon: XCircle },
};

const PAYMENT_METHOD_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  stripe: { label: "Stripe", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30", icon: CreditCard },
  paypal: { label: "PayPal", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: CreditCard },
  zelle: { label: "Zelle", color: "bg-green-500/20 text-green-300 border-green-500/30", icon: DollarSign },
};

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-xs">
      {"★".repeat(Math.min(5, Math.max(0, rating)))}{"☆".repeat(5 - Math.min(5, Math.max(0, rating)))}
    </span>
  );
}

function ReportsPanel({ customerId, customerName }: { customerId: number; customerName: string }) {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);

  const { data: reports = [], isLoading: reportsLoading } = useQuery<DailyReport[]>({
    queryKey: ["customer-reports", customerId],
    queryFn: async () => {
      const res = await fetch(`/api/customers/${customerId}/reports`);
      if (!res.ok) throw new Error("Failed to fetch reports");
      return res.json();
    },
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery<Review[]>({
    queryKey: ["customer-reviews", customerId],
    queryFn: async () => {
      const res = await fetch(`/api/customers/${customerId}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const sentReports = reports.filter(r => r.sentAt);
  const pendingReports = reports.filter(r => !r.sentAt);
  const selectedReportData = selectedReport !== null ? reports.find(r => r.dayNumber === selectedReport) : null;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  if (reportsLoading || reviewsLoading) {
    return <div className="p-4 text-xs text-muted-foreground animate-pulse">Loading reports...</div>;
  }

  return (
    <div className="p-4 border-t border-border/20 space-y-4">
      <div className="flex items-center gap-2">
        <BarChart2 className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-mono font-semibold uppercase text-foreground">Reports & Reviews</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-muted/20 border border-border/30 rounded-md p-2 text-center">
          <div className="text-xl font-bold font-mono text-amber-400">{avgRating}</div>
          <div className="text-[10px] text-muted-foreground uppercase font-mono">Avg Rating</div>
        </div>
        <div className="bg-muted/20 border border-border/30 rounded-md p-2 text-center">
          <div className="text-xl font-bold font-mono text-blue-400">{reviews.length}</div>
          <div className="text-[10px] text-muted-foreground uppercase font-mono">Reviews</div>
        </div>
        <div className="bg-muted/20 border border-border/30 rounded-md p-2 text-center">
          <div className="text-xl font-bold font-mono text-green-400">{sentReports.length}</div>
          <div className="text-[10px] text-muted-foreground uppercase font-mono">Reports Sent</div>
        </div>
      </div>

      {reports.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-mono mb-2">7-Day Report Schedule</p>
          <div className="flex gap-1 flex-wrap">
            {reports.map(r => (
              <button
                key={r.dayNumber}
                onClick={() => setSelectedReport(selectedReport === r.dayNumber ? null : r.dayNumber)}
                className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-mono transition-colors ${
                  r.sentAt
                    ? selectedReport === r.dayNumber
                      ? "bg-green-500/30 border-green-400/60 text-green-200"
                      : "bg-green-500/15 border-green-500/30 text-green-400 hover:border-green-400/60"
                    : "bg-muted/20 border-border/30 text-muted-foreground/60"
                }`}
              >
                {r.sentAt ? <Send className="h-2.5 w-2.5" /> : <Clock className="h-2.5 w-2.5" />}
                Day {r.dayNumber}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedReportData?.reportData && (
        <ReportPreview report={selectedReportData} />
      )}

      {selectedReportData && !selectedReportData.reportData && (
        <div className="p-3 bg-muted/10 border border-border/20 rounded-md">
          <p className="text-xs text-muted-foreground">Day {selectedReportData.dayNumber} report is scheduled but not yet sent.</p>
          {selectedReportData.sentAt && (
            <p className="text-xs text-muted-foreground/60 mt-1">Sent: {formatDate(selectedReportData.sentAt)}</p>
          )}
        </div>
      )}

      {reviews.length > 0 && (
        <div>
          <p className="text-[10px] text-muted-foreground uppercase font-mono mb-2">Recent Reviews ({reviews.length})</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {reviews.slice(0, 5).map(review => (
              <div key={review.id} className="bg-muted/10 border border-border/20 rounded-md p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={review.rating} />
                    <span className="text-[10px] text-muted-foreground font-mono uppercase">{review.platform}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground/60">{formatDate(review.reviewDate)}</span>
                </div>
                <p className="text-xs font-semibold text-foreground mb-0.5">{review.authorName}</p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">"{review.reviewText}"</p>
                {review.proposedReplyText && (
                  <div className="mt-1.5 p-1.5 bg-blue-500/10 border border-blue-500/20 rounded">
                    <p className="text-[9px] text-blue-400 font-mono uppercase mb-0.5">Proposed Reply</p>
                    <p className="text-[10px] text-blue-300/80 leading-relaxed line-clamp-2">{review.proposedReplyText}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {reports.length === 0 && reviews.length === 0 && (
        <div className="text-center py-4">
          <Mail className="h-6 w-6 text-muted-foreground/30 mx-auto mb-1" />
          <p className="text-xs text-muted-foreground">No reports scheduled yet</p>
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">Reports are generated automatically after sign-up</p>
        </div>
      )}
    </div>
  );
}

function ReportPreview({ report }: { report: DailyReport }) {
  const data = report.reportData as {
    metrics?: { avgRating: number; totalCount: number; trend: string };
    latestReviews?: Array<{ authorName: string; rating: number; reviewText: string; proposedReplyText: string | null; platform: string }>;
    lowestRatedReviews?: Array<{ authorName: string; rating: number; reviewText: string; proposedReplyText: string | null; platform: string }>;
  } | null;

  if (!data) return null;

  return (
    <div className="border border-border/40 rounded-md bg-muted/5 overflow-hidden">
      <div className="bg-muted/20 px-3 py-2 border-b border-border/30 flex items-center gap-2">
        <Eye className="h-3 w-3 text-primary" />
        <span className="text-[10px] font-mono uppercase text-foreground font-semibold">Day {report.dayNumber} Report Preview</span>
        {report.sentAt && <span className="text-[9px] text-green-400 font-mono ml-auto">Sent {formatDate(report.sentAt)}</span>}
      </div>
      <div className="p-3 space-y-3">
        {data.metrics && (
          <div className="grid grid-cols-3 gap-1.5">
            <div className="text-center">
              <div className="text-lg font-bold text-amber-400 font-mono">{data.metrics.avgRating}</div>
              <div className="text-[9px] text-muted-foreground uppercase">Avg</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400 font-mono">{data.metrics.totalCount}</div>
              <div className="text-[9px] text-muted-foreground uppercase">Total</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary font-mono">
                {data.metrics.trend === "improving" ? "📈" : data.metrics.trend === "declining" ? "📉" : "➡️"}
              </div>
              <div className="text-[9px] text-muted-foreground uppercase capitalize">{data.metrics.trend}</div>
            </div>
          </div>
        )}
        {data.latestReviews && data.latestReviews.length > 0 && (
          <div>
            <p className="text-[9px] text-muted-foreground uppercase font-mono mb-1.5">Latest Reviews</p>
            {data.latestReviews.slice(0, 2).map((r, i) => (
              <div key={i} className="mb-1.5 bg-muted/10 rounded p-1.5">
                <div className="flex items-center gap-1 mb-0.5">
                  <StarRating rating={r.rating} />
                  <span className="text-[9px] text-muted-foreground font-mono">{r.platform}</span>
                </div>
                <p className="text-[10px] font-semibold text-foreground">{r.authorName}</p>
                <p className="text-[10px] text-muted-foreground/70 line-clamp-1">"{r.reviewText}"</p>
                {r.proposedReplyText && (
                  <p className="text-[9px] text-blue-300/70 mt-0.5 line-clamp-1">Reply: {r.proposedReplyText}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [expandedCustomer, setExpandedCustomer] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: customers = [], isLoading, refetch } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch("/api/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    },
    refetchInterval: 30000,
  });

  const markPaidMutation = useMutation({
    mutationFn: async (customerId: number) => {
      const res = await fetch(`/api/customers/${customerId}/mark-paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: "Manually marked as paid by admin" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to mark as paid");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });

  const filtered = filter ? customers.filter(c => c.subscriptionStatus === filter) : customers;

  const counts = {
    trial: customers.filter(c => c.subscriptionStatus === "trial").length,
    active: customers.filter(c => c.subscriptionStatus === "active").length,
    trial_expired: customers.filter(c => c.subscriptionStatus === "trial_expired").length,
    cancelled: customers.filter(c => c.subscriptionStatus === "cancelled").length,
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase" data-testid="heading-customers">
            Customers
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {customers.length} total — trial status, subscriptions, and billing
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="font-mono text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(Object.entries(counts) as [string, number][]).map(([status, count]) => {
          const cfg = STATUS_CONFIG[status];
          const Icon = cfg.icon;
          const isActive = filter === status;
          return (
            <Card
              key={status}
              className={`cursor-pointer border transition-colors ${isActive ? "border-primary/50 bg-primary/5" : "border-border/50 bg-card/40 hover:border-primary/30"}`}
              onClick={() => setFilter(isActive ? null : status)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-mono mb-1">
                  <Icon className="h-3 w-3" /> {cfg.label}
                </div>
                <p className="text-2xl font-bold font-mono">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filter && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Showing:</span>
          <Badge variant="outline" className="font-mono text-xs">
            {STATUS_CONFIG[filter]?.label ?? filter}
          </Badge>
          <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => setFilter(null)}>
            Clear filter
          </Button>
        </div>
      )}

      <Card className="bg-card/40 border-border/50">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-mono uppercase flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Customer List
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">Loading customers...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {filter ? `No customers with status "${STATUS_CONFIG[filter]?.label ?? filter}"` : "No customers yet"}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">Customers appear here when they sign up from the business site</p>
            </div>
          ) : (
            <div className="divide-y divide-border/30">
              {filtered.map((customer) => {
                const cfg = STATUS_CONFIG[customer.subscriptionStatus] ?? STATUS_CONFIG.trial;
                const Icon = cfg.icon;
                const daysLeft = daysUntil(customer.trialEndAt);
                const isTrialActive = customer.subscriptionStatus === "trial";
                const isExpanded = expandedCustomer === customer.id;
                const pmCfg = PAYMENT_METHOD_CONFIG[customer.paymentMethod] ?? PAYMENT_METHOD_CONFIG.stripe;
                const PmIcon = pmCfg.icon;
                const isZelle = customer.paymentMethod === "zelle";
                const canMarkPaid = isZelle && customer.subscriptionStatus !== "active";

                return (
                  <div key={customer.id}>
                    <div className="p-4 hover:bg-muted/10 transition-colors">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm text-foreground">{customer.name}</p>
                            <span className="text-muted-foreground text-xs">·</span>
                            <p className="text-sm text-muted-foreground">{customer.businessName}</p>
                          </div>
                          <p className="text-xs text-muted-foreground/70">{customer.email}</p>
                          <div className="flex items-center gap-2 flex-wrap mt-1">
                            {(customer.platforms as string[]).map((p: string) => (
                              <span key={p} className="text-[10px] font-mono bg-muted/40 border border-border/40 px-1.5 py-0.5 rounded uppercase">
                                {p}
                              </span>
                            ))}
                            {customer.googleUrl && (
                              <a href={customer.googleUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 flex items-center gap-0.5">
                                Google <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                            {customer.yelpUrl && (
                              <a href={customer.yelpUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-0.5">
                                Yelp <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <Badge variant="outline" className={`text-[10px] font-mono uppercase flex items-center gap-1 ${pmCfg.color}`}>
                              <PmIcon className="h-2.5 w-2.5" />
                              {pmCfg.label}
                            </Badge>
                            <Badge variant="outline" className={`text-[10px] font-mono uppercase flex items-center gap-1 ${cfg.color}`}>
                              <Icon className="h-2.5 w-2.5" />
                              {cfg.label}
                            </Badge>
                          </div>
                          {isTrialActive && (
                            <span className={`text-[10px] font-mono ${daysLeft <= 2 ? "text-amber-400" : "text-muted-foreground"}`}>
                              {daysLeft > 0 ? `${daysLeft}d left` : "Expires today"}
                            </span>
                          )}
                          <span className="text-[10px] text-muted-foreground/60 font-mono">
                            Joined {formatDate(customer.createdAt)}
                          </span>
                          {customer.stripeCustomerId && (
                            <span className="text-[9px] text-muted-foreground/40 font-mono">
                              {customer.stripeCustomerId.slice(0, 14)}…
                            </span>
                          )}
                          {customer.paypalSubscriptionId && (
                            <span className="text-[9px] text-muted-foreground/40 font-mono">
                              PP: {customer.paypalSubscriptionId.slice(0, 14)}…
                            </span>
                          )}
                          {canMarkPaid && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[10px] h-6 px-2 font-mono border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 mt-1"
                              disabled={markPaidMutation.isPending}
                              onClick={() => markPaidMutation.mutate(customer.id)}
                            >
                              {markPaidMutation.isPending ? (
                                <RefreshCw className="h-2.5 w-2.5 mr-1 animate-spin" />
                              ) : (
                                <Check className="h-2.5 w-2.5 mr-1" />
                              )}
                              Mark as Paid
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-[10px] font-mono text-muted-foreground hover:text-foreground px-2"
                            onClick={() => setExpandedCustomer(isExpanded ? null : customer.id)}
                          >
                            {isExpanded ? <><ChevronUp className="h-3 w-3 mr-0.5" />Hide Reports</> : <><ChevronDown className="h-3 w-3 mr-0.5" />View Reports</>}
                          </Button>
                        </div>
                      </div>
                      {isTrialActive && daysLeft <= 2 && (
                        <div className="mt-2 p-2 rounded-md bg-amber-500/10 border border-amber-500/20">
                          <p className="text-xs text-amber-300">
                            ⚠ Trial expiring soon — payment reminder will be sent automatically
                          </p>
                        </div>
                      )}
                    </div>

                    {isExpanded && (
                      <ReportsPanel customerId={customer.id} customerName={customer.name} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
