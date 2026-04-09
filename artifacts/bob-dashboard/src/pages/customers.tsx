import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, CheckCircle, XCircle, AlertTriangle, ExternalLink, RefreshCw } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  businessName: string;
  platforms: string[];
  googleUrl: string | null;
  yelpUrl: string | null;
  stripeCustomerId: string | null;
  subscriptionStatus: string;
  trialStartAt: string;
  trialEndAt: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  trial: { label: "Trial", color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Clock },
  active: { label: "Active", color: "bg-green-500/20 text-green-300 border-green-500/30", icon: CheckCircle },
  trial_expired: { label: "Trial Expired", color: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: AlertTriangle },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-300 border-red-500/30", icon: XCircle },
};

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function CustomersPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const { data: customers = [], isLoading, refetch } = useQuery<Customer[]>({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await fetch("/api/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    },
    refetchInterval: 30000,
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

                return (
                  <div key={customer.id} className="p-4 hover:bg-muted/10 transition-colors">
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
                        <Badge variant="outline" className={`text-[10px] font-mono uppercase flex items-center gap-1 ${cfg.color}`}>
                          <Icon className="h-2.5 w-2.5" />
                          {cfg.label}
                        </Badge>
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
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
