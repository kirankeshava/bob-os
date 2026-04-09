import { ReplitConnectors } from "@replit/connectors-sdk";
import { createHash } from "crypto";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { db, businessArtifactsTable, businessesTable } from "@workspace/db";
import { logger } from "../lib/logger";

const SYNC_INTERVAL_MS = 60 * 60 * 1000;

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  ".local",
  ".cache",
  "coverage",
  ".turbo",
  ".pnpm-store",
]);

const SKIP_EXTENSIONS = new Set([".map", ".log"]);

export interface SyncStatus {
  lastSyncAt: string | null;
  status: "idle" | "syncing" | "success" | "error" | "skipped";
  commitUrl: string | null;
  commitMessage: string | null;
  artifactsCount: number;
  sourceFilesCount: number;
  errorMessage: string | null;
}

let syncStatus: SyncStatus = {
  lastSyncAt: null,
  status: "idle",
  commitUrl: null,
  commitMessage: null,
  artifactsCount: 0,
  sourceFilesCount: 0,
  errorMessage: null,
};

export function getSyncStatus(): SyncStatus {
  return { ...syncStatus };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function githubBlobSha(content: Buffer): string {
  const header = `blob ${content.length}\0`;
  const hash = createHash("sha1");
  hash.update(Buffer.from(header, "binary"));
  hash.update(content);
  return hash.digest("hex");
}

function collectSourceFiles(rootDir: string): Map<string, Buffer> {
  const files = new Map<string, Buffer>();

  function walk(dir: string) {
    let entries: string[];
    try {
      entries = readdirSync(dir) as string[];
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      let stat;
      try {
        stat = statSync(fullPath);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        if (SKIP_DIRS.has(entry)) continue;
        walk(fullPath);
      } else if (stat.isFile()) {
        const ext = entry.includes(".") ? "." + entry.split(".").pop() : "";
        if (SKIP_EXTENSIONS.has(ext)) continue;
        if (stat.size > 5 * 1024 * 1024) continue;
        try {
          const content = readFileSync(fullPath);
          const relPath = relative(rootDir, fullPath);
          files.set(relPath, content);
        } catch {
          // skip unreadable files
        }
      }
    }
  }

  walk(rootDir);
  return files;
}

async function buildGeneratedArtifacts(): Promise<Map<string, Buffer>> {
  const files = new Map<string, Buffer>();

  const businesses = await db.select().from(businessesTable);
  const artifacts = await db.select().from(businessArtifactsTable);

  const bizMap = new Map(businesses.map((b) => [b.id, b]));

  for (const artifact of artifacts) {
    const biz = bizMap.get(artifact.businessId);
    if (!biz) continue;
    const bizSlug = slugify(biz.name);
    const titleSlug = slugify(artifact.title);
    const filePath = `generated/${bizSlug}/${titleSlug}.md`;

    const md = [
      `# ${artifact.title}`,
      ``,
      `**Business:** ${biz.name}`,
      `**Type:** ${artifact.artifactType}`,
      artifact.agentType ? `**Agent:** ${artifact.agentType}` : null,
      artifact.createdBy ? `**Created by:** ${artifact.createdBy}` : null,
      `**Created:** ${new Date(artifact.createdAt).toISOString()}`,
      ``,
      `---`,
      ``,
      artifact.content,
    ]
      .filter((l) => l !== null)
      .join("\n");

    files.set(filePath, Buffer.from(md, "utf8"));
  }

  return files;
}

const lastBlobShas = new Map<string, string>();
let baselineLoaded = false;

async function githubRequest(
  connectors: ReplitConnectors,
  path: string,
  options: { method: string; body?: unknown }
): Promise<{ ok: boolean; status: number; json: () => Promise<unknown> }> {
  const res = await connectors.proxy("github", path, {
    method: options.method,
    headers: { "Content-Type": "application/json" },
    ...(options.body !== undefined
      ? { body: JSON.stringify(options.body) }
      : {}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      `GitHub API ${options.method} ${path} failed (${res.status}): ${JSON.stringify(data)}`
    );
  }
  return { ok: res.ok, status: res.status, json: async () => data };
}

async function githubGet<T>(connectors: ReplitConnectors, path: string): Promise<T> {
  const res = await githubRequest(connectors, path, { method: "GET" });
  return res.json() as Promise<T>;
}

async function githubPost<T>(connectors: ReplitConnectors, path: string, body: unknown): Promise<T> {
  const res = await githubRequest(connectors, path, { method: "POST", body });
  return res.json() as Promise<T>;
}

async function githubPatch<T>(connectors: ReplitConnectors, path: string, body: unknown): Promise<T> {
  const res = await githubRequest(connectors, path, { method: "PATCH", body });
  return res.json() as Promise<T>;
}

async function loadBaseline(
  connectors: ReplitConnectors,
  owner: string,
  repoName: string
): Promise<void> {
  try {
    const repoData = await githubGet<{ default_branch: string }>(
      connectors,
      `/repos/${owner}/${repoName}`
    );
    const branch = repoData.default_branch;

    const refData = await githubGet<{ object: { sha: string } }>(
      connectors,
      `/repos/${owner}/${repoName}/git/ref/heads/${branch}`
    );

    const commitData = await githubGet<{ tree: { sha: string } }>(
      connectors,
      `/repos/${owner}/${repoName}/git/commits/${refData.object.sha}`
    );

    const treeData = await githubGet<{
      tree: Array<{ path: string; type: string; sha: string }>;
      truncated: boolean;
    }>(
      connectors,
      `/repos/${owner}/${repoName}/git/trees/${commitData.tree.sha}?recursive=1`
    );

    lastBlobShas.clear();
    for (const item of treeData.tree) {
      if (item.type === "blob") {
        lastBlobShas.set(item.path, item.sha);
      }
    }

    if (treeData.truncated) {
      logger.warn("GitHub sync: baseline tree was truncated — will reprocess all files this run");
    } else {
      logger.info(
        { count: lastBlobShas.size },
        "GitHub sync: loaded baseline from existing repo tree"
      );
    }

    baselineLoaded = true;
  } catch (err) {
    logger.warn({ err }, "GitHub sync: could not load baseline, will treat all files as new");
    baselineLoaded = true;
  }
}

async function runSync() {
  const repo = process.env.GITHUB_SYNC_REPO;
  if (!repo) {
    logger.warn("GitHub sync disabled — set GITHUB_SYNC_REPO=owner/repo");
    return;
  }

  syncStatus.status = "syncing";
  logger.info({ repo }, "GitHub sync: starting run");

  try {
    const connectors = new ReplitConnectors();
    const [owner, repoName] = repo.split("/");

    if (!baselineLoaded) {
      await loadBaseline(connectors, owner, repoName);
    }

    const repoRoot = join(process.cwd(), "..", "..", "..");
    const sourceFiles = collectSourceFiles(repoRoot);
    const generatedFiles = await buildGeneratedArtifacts();
    const allFiles = new Map<string, Buffer>([...sourceFiles, ...generatedFiles]);

    const changedOrNew: Map<string, Buffer> = new Map();
    for (const [filePath, content] of allFiles) {
      const localSha = githubBlobSha(content);
      if (lastBlobShas.get(filePath) !== localSha) {
        changedOrNew.set(filePath, content);
      }
    }

    const deletedPaths: string[] = [];
    for (const trackedPath of lastBlobShas.keys()) {
      if (!allFiles.has(trackedPath)) {
        deletedPaths.push(trackedPath);
      }
    }

    if (changedOrNew.size === 0 && deletedPaths.length === 0) {
      logger.info("GitHub sync: nothing changed, skipping");
      syncStatus.status = "skipped";
      syncStatus.lastSyncAt = new Date().toISOString();
      return;
    }

    const repoData = await githubGet<{ default_branch: string }>(
      connectors,
      `/repos/${owner}/${repoName}`
    );
    const defaultBranch = repoData.default_branch;

    const refData = await githubGet<{ object: { sha: string } }>(
      connectors,
      `/repos/${owner}/${repoName}/git/ref/heads/${defaultBranch}`
    );
    const headSha = refData.object.sha;

    const commitData = await githubGet<{ tree: { sha: string } }>(
      connectors,
      `/repos/${owner}/${repoName}/git/commits/${headSha}`
    );
    const baseTreeSha = commitData.tree.sha;

    const treeItems: Array<{
      path: string;
      mode: string;
      type: string;
      sha: string | null;
    }> = [];

    for (const [filePath, content] of changedOrNew) {
      const blobData = await githubPost<{ sha: string }>(
        connectors,
        `/repos/${owner}/${repoName}/git/blobs`,
        { content: content.toString("base64"), encoding: "base64" }
      );
      treeItems.push({ path: filePath, mode: "100644", type: "blob", sha: blobData.sha });
    }

    for (const filePath of deletedPaths) {
      treeItems.push({ path: filePath, mode: "100644", type: "blob", sha: null });
    }

    const treeData = await githubPost<{ sha: string }>(
      connectors,
      `/repos/${owner}/${repoName}/git/trees`,
      { base_tree: baseTreeSha, tree: treeItems }
    );

    const now = new Date();
    const utcStr = now.toISOString().slice(0, 16).replace("T", " ") + " UTC";
    const sourceChangedCount = [...changedOrNew.keys()].filter(
      (p) => !p.startsWith("generated/")
    ).length + deletedPaths.filter((p) => !p.startsWith("generated/")).length;
    const artifactChangedCount = [...changedOrNew.keys()].filter((p) =>
      p.startsWith("generated/")
    ).length + deletedPaths.filter((p) => p.startsWith("generated/")).length;

    const commitMessage =
      `chore: auto-sync [${utcStr}] — ` +
      `${sourceChangedCount} source files, ${artifactChangedCount} artifacts`;

    const newCommitData = await githubPost<{ sha: string }>(
      connectors,
      `/repos/${owner}/${repoName}/git/commits`,
      { message: commitMessage, tree: treeData.sha, parents: [headSha] }
    );

    await githubPatch<unknown>(
      connectors,
      `/repos/${owner}/${repoName}/git/refs/heads/${defaultBranch}`,
      { sha: newCommitData.sha, force: false }
    );

    for (const [filePath, content] of changedOrNew) {
      lastBlobShas.set(filePath, githubBlobSha(content));
    }
    for (const filePath of deletedPaths) {
      lastBlobShas.delete(filePath);
    }

    syncStatus = {
      lastSyncAt: now.toISOString(),
      status: "success",
      commitUrl: `https://github.com/${owner}/${repoName}/commit/${newCommitData.sha}`,
      commitMessage,
      artifactsCount: [...allFiles.keys()].filter((p) => p.startsWith("generated/")).length,
      sourceFilesCount: [...allFiles.keys()].filter((p) => !p.startsWith("generated/")).length,
      errorMessage: null,
    };

    logger.info(
      { commitUrl: syncStatus.commitUrl, commitMessage },
      "GitHub sync: committed successfully"
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.error({ err }, "GitHub sync: error during sync");
    syncStatus = {
      ...syncStatus,
      status: "error",
      lastSyncAt: new Date().toISOString(),
      errorMessage: msg,
    };
  }
}

export function startGithubSync() {
  const repo = process.env.GITHUB_SYNC_REPO;
  if (!repo) {
    logger.warn("GitHub sync disabled — set GITHUB_SYNC_REPO=owner/repo to enable");
    return;
  }

  logger.info({ repo }, "GitHub sync: starting hourly auto-sync");

  runSync().catch((err) =>
    logger.error({ err }, "GitHub sync: unhandled error in initial run")
  );

  setInterval(() => {
    runSync().catch((err) =>
      logger.error({ err }, "GitHub sync: unhandled error in scheduled run")
    );
  }, SYNC_INTERVAL_MS);
}
