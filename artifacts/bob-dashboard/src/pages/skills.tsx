import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2, Search, Plus, Trash2, ToggleLeft, ToggleRight,
  BookOpen, Package, Star, CheckCircle, AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  id: number;
  name: string;
  slug: string;
  source: string;
  description: string;
  content: string;
  status: string;
  installedAt: string;
}

interface SearchResult {
  name: string;
  source: string;
  description: string;
  installCount: number;
  url: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export default function SkillsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: () => apiFetch("/api/skills"),
    refetchInterval: 30000,
  });

  const toggleSkill = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      apiFetch(`/api/skills/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const removeSkill = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/skills/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast({ title: "Skill removed", description: "Skill has been uninstalled." });
    },
    onError: (err: Error) => {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    },
  });

  const installSkill = useMutation({
    mutationFn: ({ source, name, description }: { source: string; name: string; description: string }) =>
      apiFetch("/api/skills/install", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, name, description }),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      if (data?.installed) {
        toast({ title: "Skill installed!", description: `${data.skill.name} is now active.` });
      } else {
        toast({ title: "Already installed", description: data?.message });
      }
    },
    onError: (err: Error) => {
      toast({ title: "Install failed", description: err.message, variant: "destructive" });
    },
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const data = await apiFetch(`/api/skills/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(data.results ?? []);
      if ((data.results ?? []).length === 0) {
        toast({ title: "No results", description: "No skills found for that query." });
      }
    } catch (err: unknown) {
      toast({
        title: "Search failed",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const installedSources = new Set(skills.map(s => s.source));

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-mono uppercase" data-testid="heading-skills">
            Skills
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Discover and manage capability extensions for Bob's agents
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono bg-primary/10 px-3 py-1.5 rounded border border-primary/20 text-primary">
          <BookOpen className="h-4 w-4" />
          {skills.filter(s => s.status === "active").length} Active
        </div>
      </div>

      {/* Installed Skills */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="border-b border-border/30 bg-muted/5 pb-3">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" />
            Installed Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : skills.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No skills installed yet.</p>
              <p className="text-xs mt-1">Search for skills below to augment Bob's agents.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border/30">
              {skills.map(skill => (
                <li key={skill.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-foreground">{skill.name}</span>
                        <Badge
                          variant="outline"
                          className={
                            skill.status === "active"
                              ? "text-green-400 border-green-500/30 bg-green-500/10 text-xs"
                              : "text-muted-foreground border-border/50 text-xs"
                          }
                        >
                          {skill.status}
                        </Badge>
                        <a
                          href={`https://github.com/${skill.source}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary font-mono truncate max-w-48"
                        >
                          {skill.source}
                        </a>
                      </div>
                      {skill.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{skill.description}</p>
                      )}
                      {skill.content && (
                        <button
                          className="text-xs text-primary mt-1 hover:underline"
                          onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                        >
                          {expandedSkill === skill.id ? "Hide SKILL.md" : "View SKILL.md"}
                        </button>
                      )}
                      {expandedSkill === skill.id && (
                        <pre className="mt-2 p-3 bg-muted/20 rounded text-xs text-muted-foreground whitespace-pre-wrap font-mono max-h-48 overflow-y-auto border border-border/30">
                          {skill.content}
                        </pre>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs"
                        disabled={toggleSkill.isPending}
                        onClick={() =>
                          toggleSkill.mutate({
                            id: skill.id,
                            status: skill.status === "active" ? "disabled" : "active",
                          })
                        }
                        title={skill.status === "active" ? "Disable skill" : "Enable skill"}
                      >
                        {skill.status === "active" ? (
                          <ToggleRight className="h-4 w-4 text-green-400" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={removeSkill.isPending}
                        onClick={() => removeSkill.mutate(skill.id)}
                        title="Remove skill"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Skill Discovery */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="border-b border-border/30 bg-muted/5 pb-3">
          <CardTitle className="text-sm font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Search className="h-4 w-4" />
            Discover Skills from GitHub
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search for skills (e.g. 'marketing', 'seo', 'email')…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              className="flex-1 bg-muted/10 border-border/50 text-sm"
              data-testid="skills-search-input"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
              className="gap-1.5"
              data-testid="skills-search-btn"
            >
              {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Search
            </Button>
          </div>

          {searchResults.length > 0 && (
            <ul className="space-y-3">
              {searchResults.map(result => {
                const alreadyInstalled = installedSources.has(result.source);
                return (
                  <li
                    key={result.source}
                    className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border/30 bg-muted/5"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-foreground">{result.name}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {result.installCount}
                        </div>
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary font-mono truncate max-w-48"
                        >
                          {result.source}
                        </a>
                      </div>
                      {result.description && (
                        <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {alreadyInstalled ? (
                        <div className="flex items-center gap-1 text-xs text-green-400 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded">
                          <CheckCircle className="h-3 w-3" />
                          Installed
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          className="gap-1 h-7 text-xs"
                          disabled={installSkill.isPending}
                          onClick={() =>
                            installSkill.mutate({
                              source: result.source,
                              name: result.name,
                              description: result.description,
                            })
                          }
                          data-testid={`install-skill-${result.source.replace(/\//g, "-")}`}
                        >
                          {installSkill.isPending ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Plus className="h-3 w-3" />
                          )}
                          Add to Bob
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {searchResults.length === 0 && !isSearching && searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No results found. Try a different search term.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
