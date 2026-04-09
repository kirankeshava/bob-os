import { useRoute, Link } from "wouter";
import { useMemo, useState } from "react";
import {
  useGetBusiness,
  getGetBusinessQueryKey,
  useListBusinessArtifacts,
  getListBusinessArtifactsQueryKey,
  useListBusinessTasks,
  getListBusinessTasksQueryKey,
  BusinessArtifact,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileText,
  Code2,
  Search,
  LayoutTemplate,
  ClipboardList,
  PenLine,
  Table2,
  ScrollText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ARTIFACT_ICONS: Record<string, React.ElementType> = {
  document: FileText,
  template: LayoutTemplate,
  research: Search,
  script: ScrollText,
  plan: ClipboardList,
  copy: PenLine,
  code: Code2,
  spreadsheet: Table2,
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

type SortField = "title" | "artifactType" | "createdBy" | "createdAt";
type SortDir = "asc" | "desc";

export default function BusinessArtifactsPage() {
  const [, params] = useRoute("/businesses/:id/artifacts");
  const businessId = params?.id ? parseInt(params.id) : 0;

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const { data: business } = useGetBusiness(businessId, {
    query: { enabled: !!businessId, queryKey: getGetBusinessQueryKey(businessId) },
  });

  const { data: artifacts, isLoading } = useListBusinessArtifacts(businessId, {
    query: { enabled: !!businessId, queryKey: getListBusinessArtifactsQueryKey(businessId) },
  });

  const { data: tasks } = useListBusinessTasks(businessId, {
    query: { enabled: !!businessId, queryKey: getListBusinessTasksQueryKey(businessId) },
  });

  const taskMap = useMemo(() => {
    const m = new Map<number, string>();
    if (tasks) tasks.forEach((t) => m.set(t.id, t.title));
    return m;
  }, [tasks]);

  const sorted = useMemo(() => {
    if (!artifacts) return [];
    const copy = [...artifacts];
    copy.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "artifactType":
          cmp = a.artifactType.localeCompare(b.artifactType);
          break;
        case "createdBy":
          cmp = (a.createdBy ?? "").localeCompare(b.createdBy ?? "");
          break;
        case "createdAt":
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [artifacts, sortField, sortDir]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir(field === "createdAt" ? "desc" : "asc");
    }
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3 inline ml-0.5" />
    ) : (
      <ChevronDown className="h-3 w-3 inline ml-0.5" />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href={`/businesses/${businessId}`}>
          <button className="p-1.5 rounded-md hover:bg-muted/50 transition-colors">
            <ArrowLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        </Link>
        <div>
          <h1 className="text-lg font-bold font-mono tracking-tight">
            Artifacts
          </h1>
          {business && (
            <p className="text-xs text-muted-foreground">{business.name}</p>
          )}
        </div>
        {artifacts && artifacts.length > 0 && (
          <Badge variant="secondary" className="font-mono text-xs ml-auto">
            {artifacts.length} total
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              className="animate-pulse bg-muted/20 border-border/50 h-16"
            />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <Card className="bg-card/20 border-dashed border-yellow-500/20">
          <CardContent className="p-8 text-center">
            <FileText className="h-10 w-10 text-yellow-500/20 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-medium">
              No artifacts yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/30 border-b border-border/50">
                  <th
                    className="text-left px-3 py-2 font-mono font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => toggleSort("title")}
                  >
                    Title
                    <SortIcon field="title" />
                  </th>
                  <th
                    className="text-left px-3 py-2 font-mono font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => toggleSort("artifactType")}
                  >
                    Type
                    <SortIcon field="artifactType" />
                  </th>
                  <th
                    className="text-left px-3 py-2 font-mono font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => toggleSort("createdBy")}
                  >
                    Created By
                    <SortIcon field="createdBy" />
                  </th>
                  <th className="text-left px-3 py-2 font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    Task
                  </th>
                  <th
                    className="text-left px-3 py-2 font-mono font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => toggleSort("createdAt")}
                  >
                    Created
                    <SortIcon field="createdAt" />
                  </th>
                  <th className="text-left px-3 py-2 font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    Preview
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((a) => {
                  const Icon =
                    ARTIFACT_ICONS[a.artifactType] ?? FileText;
                  const colorClass =
                    ARTIFACT_COLORS[a.artifactType] ??
                    ARTIFACT_COLORS.document;
                  const taskTitle = a.taskId
                    ? taskMap.get(a.taskId)
                    : null;
                  return (
                    <tr
                      key={a.id}
                      className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-3 py-2.5 font-medium text-foreground max-w-[200px] truncate">
                        {a.title}
                      </td>
                      <td className="px-3 py-2.5">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-mono px-1.5 py-0 border ${colorClass}`}
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {a.artifactType}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">
                        {a.createdBy ?? "—"}
                      </td>
                      <td className="px-3 py-2.5 max-w-[180px] truncate">
                        {taskTitle ? (
                          <Link
                            href={`/businesses/${businessId}/tasks/${a.taskId}`}
                            className="text-primary/80 hover:text-primary hover:underline transition-colors"
                          >
                            {taskTitle}
                          </Link>
                        ) : (
                          <span className="text-muted-foreground/50">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap">
                        {timeAgo(a.createdAt)}
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground/70 max-w-[250px] truncate font-mono text-[10px]">
                        {a.content.slice(0, 120).trim() || "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
