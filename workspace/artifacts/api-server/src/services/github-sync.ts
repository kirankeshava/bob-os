import { ReplitConnectors } from "@replit/connectors-sdk";
import { createHash } from "crypto";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";
import { db, businessArtifactsTable, businessesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
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

function collectSourceFiles(rootDir: string): Map<string, Buffer> {
  const files = new Map<string, Buffer>();

  function walk(dir: string) {
    let entries: ReturnType<typeof readdirSync>;
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.startsWith(".") && entry !== ".replit") continue;
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

function hashContent(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
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

const lastHashes = new Map<string, string>();

async function githubRequest(
  connectors: ReplitConnectors,
  path: string,
  options: { method: string; body?: unknown }
): Promise<unknown> {
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
  return data;
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

    const repoRoot = process.cwd().includes("artifacts/api-server")
      ? join(process.cwd(), "../../..")
      : join(process.cwd());

    const sourceFiles = collectSourceFiles(repoRoot);
    const generatedFiles = await buildGeneratedArtifacts();

    const allFiles = new Map<string, Buffer>([...sourceFiles, ...generatedFiles]);

    const changed: Map<string, Buffer> = new Map();
    for (const [path, content] of allFiles) {
      const hash = hashContent(content);
      if (lastHashes.get(path) !== hash) {
        changed.set(path, content);
      }
    }

    if (changed.size === 0) {
      logger.info("GitHub sync: nothing changed, skipping");
      syncStatus.status = "skipped";
      syncStatus.lastSyncAt = new Date().toISOString();
      return;
    }

    const repoData = (await githubRequest(connectors, `/repos/${owner}/${repoName}`, {
      method: "GET",
    })) as { default_branch: string };
    const defaultBranch = repoData.default_branch;

    const refData = (await githubRequest(
      connectors,
      `/repos/${owner}/${repoName}/git/ref/heads/${defaultBranch}`,
      { method: "GET" }
    )) as { object: { sha: string } };
    const headSha = refData.object.sha;

    const commitData = (await githubRequest(
      connectors,
      `/repos/${owner}/${repoName}/git/commits/${headSha}`,
      { method: "GET" }
    )) as { tree: { sha: string } };
    const baseTreeSha = commitData.tree.sha;

    const treeItems: Array<{
      path: string;
      mode: string;
      type: string;
      sha: string;
    }> = [];

    for (const [filePath, content] of changed) {
      const blobData = (await githubRequest(
        connectors,
        `/repos/${owner}/${repoName}/git/blobs`,
        {
          method: "POST",
          body: {
            content: content.toString("base64"),
            encoding: "base64",
          },
        }
      )) as { sha: string };

      treeItems.push({
        path: filePath,
        mode: "100644",
        type: "blob",
        sha: blobData.sha,
      });
    }

    const treeData = (await githubRequest(
      connectors,
      `/repos/${owner}/${repoName}/git/trees`,
      {
        method: "POST",
        body: { base_tree: baseTreeSha, tree: treeItems },
      }
    )) as { sha: string };

    const now = new Date();
    const utcStr = now.toISOString().slice(0, 16).replace("T", " ") + " UTC";
    const sourceCount = [...changed.keys()].filter(
      (p) => !p.startsWith("generated/")
    ).length;
    const artifactCount = [...changed.keys()].filter((p) =>
      p.startsWith("generated/")
    ).length;

    const commitMessage =
      `chore: auto-sync [${utcStr}] — ` +
      `${sourceCount} source files, ${artifactCount} artifacts`;

    const newCommitData = (await githubRequest(
      connectors,
      `/repos/${owner}/${repoName}/git/commits`,
      {
        method: "POST",
        body: {
          message: commitMessage,
          tree: treeData.sha,
          parents: [headSha],
        },
      }
    )) as { sha: string; html_url: string };

    await githubRequest(
      connectors,
      `/repos/${owner}/${repoName}/git/refs/heads/${defaultBranch}`,
      {
        method: "PATCH",
        body: { sha: newCommitData.sha, force: false },
      }
    );

    for (const [path, content] of changed) {
      lastHashes.set(path, hashContent(content));
    }

    syncStatus = {
      lastSyncAt: now.toISOString(),
      status: "success",
      commitUrl: `https://github.com/${owner}/${repoName}/commit/${newCommitData.sha}`,
      commitMessage,
      artifactsCount: [...allFiles.keys()].filter((p) =>
        p.startsWith("generated/")
      ).length,
      sourceFilesCount: [...allFiles.keys()].filter(
        (p) => !p.startsWith("generated/")
      ).length,
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
