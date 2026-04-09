import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, businessSitesTable, outreachEmailsTable } from "@workspace/db";
import { sendEmail, listMessages, listInboxes } from "../lib/agentmail";
import { logger } from "../lib/logger";

const router = Router({ mergeParams: true });

// GET /businesses/:businessId/inbox  — list received messages
router.get("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
  if (!site?.emailInboxId) { res.status(404).json({ error: "No inbox set up for this business" }); return; }

  const messages = await listMessages(site.emailInboxId);
  const logged = await db.select().from(outreachEmailsTable)
    .where(eq(outreachEmailsTable.businessId, businessId))
    .orderBy(desc(outreachEmailsTable.createdAt))
    .limit(50);

  res.json({ inboxId: site.emailInboxId, emailAddress: site.emailAddress, messages, logged });
});

// POST /businesses/:businessId/inbox/send  — send an outreach email
router.post("/send", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const { to, subject, body, agentType } = req.body;
  if (!to || !subject || !body) {
    res.status(400).json({ error: "to, subject, and body are required" });
    return;
  }

  const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
  if (!site?.emailInboxId) {
    res.status(400).json({ error: "No inbox set up — generate the business site first to create an inbox" });
    return;
  }

  const result = await sendEmail(site.emailInboxId, to, subject, body);
  if (!result) {
    res.status(500).json({ error: "Failed to send email via AgentMail" });
    return;
  }

  const [logged] = await db.insert(outreachEmailsTable).values({
    businessId,
    inboxId: site.emailInboxId,
    messageId: result.messageId,
    threadId: result.threadId,
    direction: "outbound",
    toAddress: to,
    fromAddress: site.emailAddress ?? undefined,
    subject,
    body,
    status: "sent",
    agentType: agentType ?? null,
    sentAt: new Date(),
  }).returning();

  logger.info({ businessId, to, subject }, "Outreach email sent");
  res.json({ success: true, messageId: result.messageId, logged });
});

// GET /businesses/:businessId/inbox/log  — list logged sent emails
router.get("/log", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const emails = await db.select().from(outreachEmailsTable)
    .where(eq(outreachEmailsTable.businessId, businessId))
    .orderBy(desc(outreachEmailsTable.createdAt))
    .limit(100);

  res.json(emails);
});

export default router;
