import { Router } from "express";
import { eq, desc, isNull, lt } from "drizzle-orm";
import { db, businessesTable, businessSitesTable, outreachEmailsTable } from "@workspace/db";
import { sendEmail, listMessages, listInboxes, ensureInbox } from "../lib/agentmail";
import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "../lib/logger";

const router = Router({ mergeParams: true });

async function getBusinessInbox(businessId: number): Promise<{ inboxId: string; emailAddress: string | null } | null> {
  // Prefer business-level inbox
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
  if (business?.emailInboxId) {
    return { inboxId: business.emailInboxId, emailAddress: business.emailAddress };
  }
  // Fall back to site-level inbox
  const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
  if (site?.emailInboxId) {
    return { inboxId: site.emailInboxId, emailAddress: site.emailAddress };
  }
  return null;
}

// GET /businesses/:businessId/inbox  — list received messages
router.get("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const inbox = await getBusinessInbox(businessId);
  if (!inbox) { res.status(404).json({ error: "No inbox set up for this business" }); return; }

  const messages = await listMessages(inbox.inboxId);
  const logged = await db.select().from(outreachEmailsTable)
    .where(eq(outreachEmailsTable.businessId, businessId))
    .orderBy(desc(outreachEmailsTable.createdAt))
    .limit(50);

  res.json({ inboxId: inbox.inboxId, emailAddress: inbox.emailAddress, messages, logged });
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

  const inbox = await getBusinessInbox(businessId);
  if (!inbox) {
    res.status(400).json({ error: "No inbox set up — business inbox not yet provisioned" });
    return;
  }

  const result = await sendEmail(inbox.inboxId, to, subject, body);
  if (!result) {
    res.status(500).json({ error: "Failed to send email via AgentMail" });
    return;
  }

  const [logged] = await db.insert(outreachEmailsTable).values({
    businessId,
    inboxId: inbox.inboxId,
    messageId: result.messageId,
    threadId: result.threadId,
    direction: "outbound",
    toAddress: to,
    fromAddress: inbox.emailAddress ?? undefined,
    subject,
    body,
    status: "sent",
    agentType: agentType ?? null,
    sentAt: new Date(),
  }).returning();

  logger.info({ businessId, to, subject }, "Outreach email sent");
  res.json({ success: true, messageId: result.messageId, logged });
});

// POST /businesses/:businessId/inbox/onboard  — start an AI-generated onboarding sequence
router.post("/onboard", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) { res.status(400).json({ error: "Invalid businessId" }); return; }

  const { to, contactName, context } = req.body;
  if (!to) { res.status(400).json({ error: "to is required" }); return; }

  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
  if (!business) { res.status(404).json({ error: "Business not found" }); return; }

  let inbox = await getBusinessInbox(businessId);
  if (!inbox) {
    const provisioned = await ensureInbox(businessId, business.name);
    if (!provisioned) {
      res.status(400).json({ error: "No inbox available for this business" });
      return;
    }
    inbox = { inboxId: provisioned.id, emailAddress: provisioned.emailAddress };
  }

  const prompt = `You are a professional email copywriter for "${business.name}". Generate a 3-email onboarding sequence for a new contact.

Business: ${business.name}
Description: ${business.description}
Platform: ${business.platform}
Contact Name: ${contactName || "there"}
Additional Context: ${context || "none"}

Create 3 emails:
1. Immediate welcome email (sent now)
2. Value proposition follow-up (sent in 2 days)
3. Call-to-action email (sent in 5 days)

Respond with ONLY valid JSON array:
[
  {
    "subject": "Subject line",
    "body": "Full email body text (plain text, professional, 100-200 words)",
    "delayDays": 0
  },
  {
    "subject": "Subject line",
    "body": "Full email body text",
    "delayDays": 2
  },
  {
    "subject": "Subject line",
    "body": "Full email body text",
    "delayDays": 5
  }
]`;

  let emails: { subject: string; body: string; delayDays: number }[] = [];
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });
    const raw = response.choices[0]?.message?.content ?? "[]";
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    emails = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch (err) {
    logger.error({ err }, "Failed to generate onboarding sequence");
    res.status(500).json({ error: "AI generation failed" });
    return;
  }

  const now = new Date();
  const inserted = [];

  for (const email of emails) {
    const scheduledFor = new Date(now.getTime() + email.delayDays * 24 * 60 * 60 * 1000);
    const isImmediate = email.delayDays === 0;

    let messageId: string | undefined;
    let threadId: string | undefined;
    let status = "pending";

    if (isImmediate) {
      const result = await sendEmail(inbox.inboxId, to, email.subject, email.body);
      if (result) {
        messageId = result.messageId;
        threadId = result.threadId;
        status = "sent";
      }
    }

    const [row] = await db.insert(outreachEmailsTable).values({
      businessId,
      inboxId: inbox.inboxId,
      messageId: messageId ?? null,
      threadId: threadId ?? null,
      direction: "outbound",
      toAddress: to,
      fromAddress: inbox.emailAddress ?? null,
      subject: email.subject,
      body: email.body,
      status,
      agentType: "sales",
      sentAt: isImmediate && status === "sent" ? now : null,
      scheduledFor: isImmediate ? null : scheduledFor,
    }).returning();

    inserted.push(row);
  }

  logger.info({ businessId, to, count: inserted.length }, "Onboarding sequence created");
  res.json({ success: true, sequenceCount: inserted.length, emails: inserted });
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

// ─── Scheduled email sender (called from the task executor hourly) ────────────

export async function sendScheduledEmails() {
  try {
    const now = new Date();
    const pending = await db.select().from(outreachEmailsTable)
      .where(eq(outreachEmailsTable.status, "pending"));

    const due = pending.filter(e => e.scheduledFor && new Date(e.scheduledFor) <= now);

    for (const email of due) {
      if (!email.toAddress || !email.subject || !email.body) continue;
      const result = await sendEmail(email.inboxId, email.toAddress, email.subject, email.body);
      if (result) {
        await db.update(outreachEmailsTable)
          .set({ status: "sent", messageId: result.messageId, threadId: result.threadId, sentAt: now, updatedAt: now })
          .where(eq(outreachEmailsTable.id, email.id));
        logger.info({ emailId: email.id, to: email.toAddress }, "Scheduled email sent");
      } else {
        await db.update(outreachEmailsTable)
          .set({ status: "failed", updatedAt: now })
          .where(eq(outreachEmailsTable.id, email.id));
        logger.warn({ emailId: email.id }, "Scheduled email failed to send");
      }
    }

    if (due.length > 0) {
      logger.info({ count: due.length }, "Scheduled email batch complete");
    }
  } catch (err) {
    logger.error({ err }, "sendScheduledEmails error");
  }
}
