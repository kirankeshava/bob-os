import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, knowledgeBaseEntriesTable } from "@workspace/db";
import { logger } from "../lib/logger";
import multer from "multer";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router({ mergeParams: true });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

// GET /businesses/:businessId/knowledge-base
router.get("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const entries = await db
    .select()
    .from(knowledgeBaseEntriesTable)
    .where(eq(knowledgeBaseEntriesTable.businessId, businessId))
    .orderBy(desc(knowledgeBaseEntriesTable.createdAt));

  res.json(entries);
});

// POST /businesses/:businessId/knowledge-base/upload
router.post("/upload", upload.single("file"), async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  if (!req.file) { res.status(400).json({ error: "No file uploaded" }); return; }

  const { originalname, mimetype, buffer } = req.file;
  const ext = originalname.split(".").pop()?.toLowerCase() ?? "";

  const [entry] = await db.insert(knowledgeBaseEntriesTable).values({
    businessId,
    entryType: "file",
    sourceName: originalname,
    sourceUrl: null,
    rawText: "",
    status: "processing",
  }).returning();

  // Extract text asynchronously
  extractFileText(buffer, mimetype, ext).then(async (rawText) => {
    await db.update(knowledgeBaseEntriesTable)
      .set({ rawText, status: "ready", updatedAt: new Date() })
      .where(eq(knowledgeBaseEntriesTable.id, entry.id));
    logger.info({ entryId: entry.id, businessId }, "KB file entry ready");
  }).catch(async (err) => {
    logger.error({ err, entryId: entry.id }, "KB file extraction failed");
    await db.update(knowledgeBaseEntriesTable)
      .set({ status: "error", errorMessage: String(err?.message ?? err), updatedAt: new Date() })
      .where(eq(knowledgeBaseEntriesTable.id, entry.id));
  });

  res.status(201).json(entry);
});

// POST /businesses/:businessId/knowledge-base/url
router.post("/url", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const { url } = req.body as { url?: string };
  if (!url) { res.status(400).json({ error: "url is required" }); return; }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  const [entry] = await db.insert(knowledgeBaseEntriesTable).values({
    businessId,
    entryType: "url",
    sourceName: parsedUrl.hostname + parsedUrl.pathname,
    sourceUrl: url,
    rawText: "",
    status: "processing",
  }).returning();

  // Crawl and extract text asynchronously
  extractUrlText(url).then(async (rawText) => {
    await db.update(knowledgeBaseEntriesTable)
      .set({ rawText, status: "ready", updatedAt: new Date() })
      .where(eq(knowledgeBaseEntriesTable.id, entry.id));
    logger.info({ entryId: entry.id, businessId, url }, "KB URL entry ready");
  }).catch(async (err) => {
    logger.error({ err, entryId: entry.id }, "KB URL crawl failed");
    await db.update(knowledgeBaseEntriesTable)
      .set({ status: "error", errorMessage: String(err?.message ?? err), updatedAt: new Date() })
      .where(eq(knowledgeBaseEntriesTable.id, entry.id));
  });

  res.status(201).json(entry);
});

// DELETE /businesses/:businessId/knowledge-base/:entryId
router.delete("/:entryId", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  const entryId = parseInt(req.params.entryId);
  if (isNaN(businessId) || isNaN(entryId)) { res.status(400).json({ error: "Invalid id" }); return; }

  await db.delete(knowledgeBaseEntriesTable)
    .where(eq(knowledgeBaseEntriesTable.id, entryId));

  res.status(204).end();
});

export default router;

// ─── Extraction helpers ────────────────────────────────────────────────────────

async function extractFileText(buffer: Buffer, mimetype: string, ext: string): Promise<string> {
  if (ext === "txt" || mimetype === "text/plain") {
    return buffer.toString("utf-8");
  }

  if (ext === "pdf" || mimetype === "application/pdf") {
    const pdfParse = (await import("pdf-parse")).default;
    const result = await pdfParse(buffer);
    return result.text;
  }

  if (ext === "docx" || mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: ${ext || mimetype}`);
}

async function extractUrlText(url: string): Promise<string> {
  const response = await axios.get(url, {
    timeout: 15000,
    headers: { "User-Agent": "Mozilla/5.0 (compatible; KnowledgeBot/1.0)" },
    maxContentLength: 5 * 1024 * 1024,
  });

  const html = typeof response.data === "string" ? response.data : JSON.stringify(response.data);
  const $ = cheerio.load(html);

  $("script, style, nav, footer, header, noscript, iframe, svg").remove();

  const text = $("body").text()
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text.slice(0, 100000);
}
