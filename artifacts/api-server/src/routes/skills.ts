import { Router } from "express";
import { eq, isNull, or } from "drizzle-orm";
import { db, skillsTable } from "@workspace/db";
import { logger } from "../lib/logger";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const skills = await db
      .select()
      .from(skillsTable)
      .orderBy(skillsTable.installedAt);
    res.json(skills);
  } catch (err) {
    logger.error({ err }, "Failed to list skills");
    res.status(500).json({ error: "Failed to list skills" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();

    const githubToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "bob-agent",
    };
    if (githubToken) headers["Authorization"] = `token ${githubToken}`;

    const searchQuery = query
      ? `${query} in:name,description,readme filename:SKILL.md`
      : `SKILL.md in:path filename:SKILL.md`;

    const ghUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(searchQuery)}&sort=stars&order=desc&per_page=20`;

    const ghRes = await fetch(ghUrl, { headers });

    if (!ghRes.ok) {
      const body = await ghRes.text();
      logger.warn({ status: ghRes.status, body }, "GitHub search failed");
      res.json({ results: [], error: "GitHub search unavailable" });
      return;
    }

    const ghData = await ghRes.json() as { items?: Array<{
      full_name: string;
      name: string;
      description: string | null;
      stargazers_count: number;
      html_url: string;
    }> };

    const results = (ghData.items ?? []).map(item => ({
      name: item.name,
      source: item.full_name,
      description: item.description ?? "",
      installCount: item.stargazers_count,
      url: item.html_url,
    }));

    res.json({ results });
  } catch (err) {
    logger.error({ err }, "Skills search failed");
    res.status(500).json({ error: "Search failed" });
  }
});

router.post("/install", async (req, res) => {
  try {
    const { source, name, description } = req.body as {
      source: string;
      name?: string;
      description?: string;
    };

    if (!source) {
      res.status(400).json({ error: "source is required (e.g. 'owner/repo')" });
      return;
    }

    const slug = source.replace(/[^a-z0-9]/gi, "-").toLowerCase();

    const existing = await db
      .select()
      .from(skillsTable)
      .where(eq(skillsTable.slug, slug));

    if (existing.length > 0) {
      res.json({ skill: existing[0], installed: false, message: "Already installed" });
      return;
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "bob-agent",
    };
    if (githubToken) headers["Authorization"] = `token ${githubToken}`;

    let skillContent = "";
    let skillName = name ?? source.split("/").pop() ?? source;
    let skillDescription = description ?? "";

    const rawUrl = `https://raw.githubusercontent.com/${source}/main/SKILL.md`;
    const rawRes = await fetch(rawUrl, { headers });

    if (rawRes.ok) {
      skillContent = await rawRes.text();

      const firstHeading = skillContent.match(/^#+\s+(.+)$/m);
      if (firstHeading && !name) skillName = firstHeading[1].trim();

      const firstParagraph = skillContent.match(/^(?!#)[^\n]+/m);
      if (firstParagraph && !description) skillDescription = firstParagraph[0].trim().slice(0, 300);
    } else {
      const masterUrl = `https://raw.githubusercontent.com/${source}/master/SKILL.md`;
      const masterRes = await fetch(masterUrl, { headers });
      if (masterRes.ok) {
        skillContent = await masterRes.text();
        const firstHeading = skillContent.match(/^#+\s+(.+)$/m);
        if (firstHeading && !name) skillName = firstHeading[1].trim();
        const firstParagraph = skillContent.match(/^(?!#)[^\n]+/m);
        if (firstParagraph && !description) skillDescription = firstParagraph[0].trim().slice(0, 300);
      }
    }

    const [skill] = await db
      .insert(skillsTable)
      .values({
        name: skillName,
        slug,
        source,
        description: skillDescription,
        content: skillContent,
        status: "active",
        businessId: null,
      })
      .returning();

    logger.info({ skillId: skill.id, source }, "Skill installed");
    res.status(201).json({ skill, installed: true });
  } catch (err) {
    logger.error({ err }, "Failed to install skill");
    res.status(500).json({ error: "Failed to install skill" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status?: string };

    if (!status) {
      res.status(400).json({ error: "status is required" });
      return;
    }

    const [updated] = await db
      .update(skillsTable)
      .set({ status, updatedAt: new Date() })
      .where(eq(skillsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Skill not found" });
      return;
    }

    res.json(updated);
  } catch (err) {
    logger.error({ err }, "Failed to update skill");
    res.status(500).json({ error: "Failed to update skill" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(skillsTable).where(eq(skillsTable.id, id));
    res.status(204).end();
  } catch (err) {
    logger.error({ err }, "Failed to delete skill");
    res.status(500).json({ error: "Failed to delete skill" });
  }
});

export default router;
