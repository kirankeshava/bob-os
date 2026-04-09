import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, businessesTable, businessSitesTable, businessArtifactsTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import { createInbox } from "../lib/agentmail";
import { logger } from "../lib/logger";

const router = Router({ mergeParams: true });

// GET /businesses/:businessId/site
router.get("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
  if (!site) { res.status(404).json({ error: "Site not found" }); return; }
  res.json(site);
});

// GET /businesses/:businessId/site/public  (no auth required, returns business + site data for public rendering)
router.get("/public", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
  if (!business) { res.status(404).json({ error: "Business not found" }); return; }

  const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));

  const artifacts = await db.select().from(businessArtifactsTable)
    .where(eq(businessArtifactsTable.businessId, businessId));

  res.json({ business, site: site ?? null, artifacts });
});

// POST /businesses/:businessId/site/generate  — generate or regenerate site content using AI
router.post("/generate", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
  if (!business) { res.status(404).json({ error: "Business not found" }); return; }

  const artifacts = await db.select().from(businessArtifactsTable)
    .where(eq(businessArtifactsTable.businessId, businessId));

  const artifactSummary = artifacts.slice(0, 5)
    .map(a => `[${a.artifactType}] ${a.title}: ${a.content.slice(0, 300)}`)
    .join("\n");

  // Generate slug from business name
  const slug = business.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  const prompt = `You are a professional website copywriter. Generate compelling website content for this business.

Business: ${business.name}
Description: ${business.description}
Platform: ${business.platform}
Target Revenue: ${business.targetRevenue30d}
Investment Needed: ${business.investmentNeeded}
Effort Level: ${business.effortLevel}

Existing work artifacts:
${artifactSummary || "None yet"}

Generate JSON with this EXACT structure:
{
  "tagline": "One punchy sentence tagline under 10 words",
  "heroTitle": "Main headline, bold and benefit-focused, 5-8 words",
  "heroSubtitle": "2 sentences explaining the value proposition clearly for customers",
  "accentColor": "#hexcolor — choose a color that fits the business personality",
  "services": [
    { "title": "Service name", "description": "2-sentence description of what customer gets", "icon": "emoji" },
    { "title": "Service name", "description": "...", "icon": "emoji" },
    { "title": "Service name", "description": "...", "icon": "emoji" }
  ],
  "pricing": [
    { "name": "Starter", "price": "$X", "description": "Who it's for", "features": ["feature 1", "feature 2", "feature 3"] },
    { "name": "Pro", "price": "$X", "description": "Who it's for", "features": ["feature 1", "feature 2", "feature 3", "feature 4"] }
  ],
  "howItWorks": [
    { "step": 1, "title": "Step title", "description": "Brief description" },
    { "step": 2, "title": "Step title", "description": "Brief description" },
    { "step": 3, "title": "Step title", "description": "Brief description" }
  ]
}

Make the content specific, compelling, and customer-focused. Respond ONLY with valid JSON.`;

  let siteContent: {
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
    accentColor: string;
    services: { title: string; description: string; icon?: string }[];
    pricing: { name: string; price: string; description: string; features: string[] }[];
    howItWorks: { step: number; title: string; description: string }[];
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.choices[0]?.message?.content ?? "{}";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    siteContent = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
  } catch (err) {
    logger.error({ err }, "Failed to generate site content");
    res.status(500).json({ error: "AI generation failed" });
    return;
  }

  // Check for existing site
  const [existing] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));

  let emailInboxId = existing?.emailInboxId ?? null;
  let emailAddress = existing?.emailAddress ?? null;

  // Create AgentMail inbox if not already created
  if (!emailInboxId) {
    const inbox = await createInbox(`${business.name} — Bob AI`);
    if (inbox) {
      emailInboxId = inbox.id;
      emailAddress = inbox.emailAddress;
      logger.info({ businessId, emailAddress }, "AgentMail inbox created for business");
    }
  }

  const siteData = {
    businessId,
    slug,
    tagline: siteContent.tagline,
    heroTitle: siteContent.heroTitle,
    heroSubtitle: siteContent.heroSubtitle,
    accentColor: siteContent.accentColor ?? "#6366f1",
    services: siteContent.services ?? [],
    pricing: siteContent.pricing ?? [],
    howItWorks: siteContent.howItWorks ?? [],
    emailInboxId,
    emailAddress,
    contactEmail: emailAddress,
    published: true,
    generatedAt: new Date(),
    updatedAt: new Date(),
  };

  let site;
  if (existing) {
    [site] = await db.update(businessSitesTable).set(siteData).where(eq(businessSitesTable.businessId, businessId)).returning();
  } else {
    [site] = await db.insert(businessSitesTable).values(siteData).returning();
  }

  logger.info({ businessId, slug }, "Business site generated");
  res.json(site);
});

// PATCH /businesses/:businessId/site
router.patch("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const [existing] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
  if (!existing) { res.status(404).json({ error: "Site not found" }); return; }

  const [updated] = await db.update(businessSitesTable)
    .set({ ...req.body, updatedAt: new Date() })
    .where(eq(businessSitesTable.businessId, businessId))
    .returning();
  res.json(updated);
});

export default router;
