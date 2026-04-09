import { Link, useLocation } from "wouter";
import { Activity, Briefcase, LayoutDashboard, Github, CheckCircle, AlertCircle, Loader2, Clock, BookOpen, Users } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

interface SyncStatus {
  lastSyncAt: string | null;
  status: "idle" | "syncing" | "success" | "error" | "skipped";
  commitUrl: string | null;
  commitMessage: string | null;
  artifactsCount: number;
  sourceFilesCount: number;
  errorMessage: string | null;
}

function GithubSyncBadge() {
  const { data } = useQuery<SyncStatus>({
    queryKey: ["sync-status"],
    queryFn: async () => {
      const res = await fetch("/api/sync/status");
      if (!res.ok) throw new Error("Failed to fetch sync status");
      return res.json();
    },
    refetchInterval: 5 * 60 * 1000,
    staleTime: 4 * 60 * 1000,
  });

  if (!data) return null;

  const { status, lastSyncAt, commitUrl } = data;

  const Icon =
    status === "syncing"
      ? Loader2
      : status === "success" || status === "skipped"
        ? CheckCircle
        : status === "error"
          ? AlertCircle
          : Clock;

  const iconColor =
    status === "syncing"
      ? "text-yellow-500 animate-spin"
      : status === "success" || status === "skipped"
        ? "text-green-500"
        : status === "error"
          ? "text-red-500"
          : "text-muted-foreground";

  const label = lastSyncAt
    ? new Date(lastSyncAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Never";

  const badge = (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Github className="h-3.5 w-3.5" />
      <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
      <span>{label}</span>
    </div>
  );

  if (commitUrl && (status === "success" || status === "skipped")) {
    return (
      <a
        href={commitUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={status === "skipped" ? "No changes — last commit" : (data.commitMessage ?? "View commit")}
        className="block hover:opacity-80 transition-opacity"
      >
        {badge}
      </a>
    );
  }

  return <div title={data.errorMessage ?? status}>{badge}</div>;
}

export function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const navigation = [
    { name: "Mission Control", href: "/", icon: LayoutDashboard },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Agent Runs", href: "/agent-runs", icon: Activity },
    { name: "Skills", href: "/skills", icon: BookOpen },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      <div className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="flex h-14 items-center border-b border-border px-4">
          <Briefcase className="h-5 w-5 text-primary mr-2" />
          <span className="font-bold text-lg tracking-tight text-card-foreground">BOB_OS</span>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
              return (
                <Link key={item.name} href={item.href} className="block">
                  <div
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    data-testid={`nav-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-border space-y-3">
          <GithubSyncBadge />
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="text-primary font-bold text-xs">B</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">Bob (AI)</p>
              <p className="text-xs text-muted-foreground">Chief Executive</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
