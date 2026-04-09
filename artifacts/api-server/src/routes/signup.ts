import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, signupsTable, businessesTable, businessSitesTable } from "@workspace/db";
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

  const [signup] = await db.insert(signupsTable).values({
    fullName,
    email,
    businessName,
    platforms,
    googleListingUrl: googleListingUrl ?? null,
    yelpListingUrl: yelpListingUrl ?? null,
    planName: planName ?? null,
    businessId: businessId ? String(businessId) : null,
    onboardingTriggered: false,
  }).returning();

  let onboardingTriggered = false;

  try {
    const bizId = businessId ? parseInt(String(businessId)) : null;

    let inboxId: string | null = null;
    let fromEmail: string | null = null;

    if (bizId && !isNaN(bizId)) {
      const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, bizId));
      if (business) {
        let effectiveInboxId = business.emailInboxId;
        let effectiveEmail = business.emailAddress;

        if (!effectiveInboxId) {
          const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, bizId));
          effectiveInboxId = site?.emailInboxId ?? null;
          effectiveEmail = site?.emailAddress ?? null;
        }

        if (!effectiveInboxId) {
          const provisioned = await ensureInbox(bizId, business.name);
          if (provisioned) {
            effectiveInboxId = provisioned.id;
            effectiveEmail = provisioned.emailAddress;
          }
        }

        inboxId = effectiveInboxId ?? null;
        fromEmail = effectiveEmail ?? null;
      }
    }

    if (inboxId) {
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
        logger.error({ err }, "Failed to generate onboarding sequence for signup");
      }

      const now = new Date();
      for (const emailItem of emails) {
        const isImmediate = emailItem.delayDays === 0;
        if (isImmediate) {
          const result = await sendEmail(inboxId, email, emailItem.subject, emailItem.body);
          if (result) {
            onboardingTriggered = true;
            logger.info({ signupId: signup.id, to: email }, "Welcome email sent for new signup");
          }
        }
      }

      if (onboardingTriggered) {
        await db.update(signupsTable)
          .set({ onboardingTriggered: true, updatedAt: new Date() })
          .where(eq(signupsTable.id, signup.id));
      }
    } else {
      logger.warn({ signupId: signup.id }, "No inbox available to send onboarding email — signup saved without email");
    }
  } catch (err) {
    logger.error({ err, signupId: signup.id }, "Failed to trigger onboarding sequence for signup");
  }

  res.json({
    success: true,
    signupId: signup.id,
    onboardingTriggered,
  });
});

export default router;
