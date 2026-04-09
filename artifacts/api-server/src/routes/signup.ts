import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, signupsTable, businessesTable, businessSitesTable, outreachEmailsTable } from "@workspace/db";
import { sendEmail, ensureInbox } from "../lib/agentmail";
import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "../lib/logger";

const router = Router();

router.post("/signup", async (req, res) => {
  const { fullName, email, businessName, platforms, googleListingUrl, yelpListingUrl, planName, businessId } = req.body;

  if (!fullName || !email || !businessName) {
    res.status(400).json({ error: "fullName, email, and businessName are required" });
    return;
  }

  if (!Array.isArray(platforms) || platforms.length === 0) {
    res.status(400).json({ error: "At least one platform must be selected" });
    return;
  }

  if (platforms.includes("Google") && !googleListingUrl) {
    res.status(400).json({ error: "Google Business listing URL is required when Google is selected" });
    return;
  }

  if (platforms.includes("Yelp") && !yelpListingUrl) {
    res.status(400).json({ error: "Yelp listing URL is required when Yelp is selected" });
    return;
  }

  // Validate businessId against a known public site to prevent cross-business abuse
  let resolvedBizId: number | null = null;
  if (businessId != null) {
    const parsedId = parseInt(String(businessId));
    if (!isNaN(parsedId)) {
      const [site] = await db.select({ businessId: businessSitesTable.businessId })
        .from(businessSitesTable)
        .where(eq(businessSitesTable.businessId, parsedId));
      if (site) {
        resolvedBizId = parsedId;
      }
    }
  }

  const [signup] = await db.insert(signupsTable).values({
    fullName,
    email,
    businessName,
    platforms,
    googleListingUrl: googleListingUrl ?? null,
    yelpListingUrl: yelpListingUrl ?? null,
    planName: planName ?? null,
    businessId: resolvedBizId != null ? String(resolvedBizId) : null,
    onboardingTriggered: false,
  }).returning();

  if (resolvedBizId == null) {
    logger.warn({ signupId: signup.id }, "No valid businessId — signup saved without onboarding emails");
    res.json({ success: true, signupId: signup.id, onboardingTriggered: false });
    return;
  }

  try {
    const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, resolvedBizId));
    if (!business) {
      logger.warn({ signupId: signup.id, resolvedBizId }, "Business not found — signup saved without onboarding emails");
      res.json({ success: true, signupId: signup.id, onboardingTriggered: false });
      return;
    }

    let inboxId = business.emailInboxId;
    let fromAddress = business.emailAddress;

    if (!inboxId) {
      const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, resolvedBizId));
      inboxId = site?.emailInboxId ?? null;
      fromAddress = site?.emailAddress ?? null;
    }

    if (!inboxId) {
      const provisioned = await ensureInbox(resolvedBizId, business.name);
      if (provisioned) {
        inboxId = provisioned.id;
        fromAddress = provisioned.emailAddress;
      }
    }

    if (!inboxId) {
      logger.warn({ signupId: signup.id }, "No inbox available — signup saved without onboarding emails");
      res.json({ success: true, signupId: signup.id, onboardingTriggered: false });
      return;
    }

    const platformList = platforms.join(" and ");
    const planContext = planName ? ` They selected the ${planName} plan.` : "";
    const platformContext = [
      platforms.includes("Google") && googleListingUrl ? `Google Business: ${googleListingUrl}` : null,
      platforms.includes("Yelp") && yelpListingUrl ? `Yelp: ${yelpListingUrl}` : null,
    ].filter(Boolean).join("\n");

    const prompt = `You are a professional email copywriter for an AI Review Reply & Reputation Autopilot service. Generate a 3-email onboarding sequence for a new customer.

New Customer: ${fullName}
Business: ${businessName}
Email: ${email}
Monitoring Platforms: ${platformList}${planContext}
Listing URLs:
${platformContext}

Create 3 emails:
1. Immediate welcome email (sent now) - warm, personal, confirms we received their info, tells them what to expect next
2. Value proposition follow-up (sent in 2 days) - explains how the AI review reply system works, benefits for ${platformList} reviews
3. Call-to-action email (sent in 5 days) - encourages them to reach out with questions, share testimonials, get more value

Respond with ONLY valid JSON array:
[
  {
    "subject": "Subject line",
    "body": "Full email body text (plain text, professional, 150-200 words)",
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

    let generatedEmails: { subject: string; body: string; delayDays: number }[] = [];
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-5.2",
        max_completion_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      });
      const raw = response.choices[0]?.message?.content ?? "[]";
      const jsonMatch = raw.match(/\[[\s\S]*\]/);
      generatedEmails = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (err) {
      logger.error({ err }, "Failed to generate onboarding sequence for signup");
      res.status(500).json({ error: "Failed to generate onboarding email sequence. Please try again." });
      return;
    }

    if (generatedEmails.length === 0) {
      logger.error({ signupId: signup.id }, "No emails generated for onboarding sequence");
      res.status(500).json({ error: "Failed to generate onboarding email sequence. Please try again." });
      return;
    }

    const now = new Date();
    let welcomeSent = false;

    for (const emailItem of generatedEmails) {
      const isImmediate = emailItem.delayDays === 0;
      const scheduledFor = isImmediate ? null : new Date(now.getTime() + emailItem.delayDays * 24 * 60 * 60 * 1000);

      let messageId: string | undefined;
      let threadId: string | undefined;
      let status = "pending";

      if (isImmediate) {
        const result = await sendEmail(inboxId, email, emailItem.subject, emailItem.body);
        if (result) {
          messageId = result.messageId;
          threadId = result.threadId;
          status = "sent";
          welcomeSent = true;
        }
      }

      await db.insert(outreachEmailsTable).values({
        businessId: resolvedBizId,
        inboxId,
        messageId: messageId ?? null,
        threadId: threadId ?? null,
        direction: "outbound",
        toAddress: email,
        fromAddress: fromAddress ?? null,
        subject: emailItem.subject,
        body: emailItem.body,
        status,
        agentType: "sales",
        sentAt: status === "sent" ? now : null,
        scheduledFor,
      });
    }

    await db.update(signupsTable)
      .set({ onboardingTriggered: true, updatedAt: new Date() })
      .where(eq(signupsTable.id, signup.id));

    logger.info({ signupId: signup.id, sequenceCount: generatedEmails.length, welcomeSent }, "Onboarding sequence saved for new signup");

    res.json({ success: true, signupId: signup.id, onboardingTriggered: true });
  } catch (err) {
    logger.error({ err, signupId: signup.id }, "Failed to trigger onboarding sequence for signup");
    res.status(500).json({ error: "Failed to set up onboarding sequence. Please try again." });
  }
});

export default router;
