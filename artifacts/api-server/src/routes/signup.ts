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

  let onboardingTriggered = false;

  try {
    if (resolvedBizId != null) {
      const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, resolvedBizId));

      if (business) {
        let effectiveInboxId = business.emailInboxId;
        let effectiveEmailAddress = business.emailAddress;

        if (!effectiveInboxId) {
          const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, resolvedBizId));
          effectiveInboxId = site?.emailInboxId ?? null;
          effectiveEmailAddress = site?.emailAddress ?? null;
        }

        if (!effectiveInboxId) {
          const provisioned = await ensureInbox(resolvedBizId, business.name);
          if (provisioned) {
            effectiveInboxId = provisioned.id;
            effectiveEmailAddress = provisioned.emailAddress;
          }
        }

        if (effectiveInboxId) {
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
          }

          const now = new Date();
          for (const emailItem of generatedEmails) {
            const isImmediate = emailItem.delayDays === 0;
            const scheduledFor = isImmediate ? null : new Date(now.getTime() + emailItem.delayDays * 24 * 60 * 60 * 1000);

            let messageId: string | undefined;
            let threadId: string | undefined;
            let status = isImmediate ? "pending" : "pending";

            if (isImmediate) {
              const result = await sendEmail(effectiveInboxId, email, emailItem.subject, emailItem.body);
              if (result) {
                messageId = result.messageId;
                threadId = result.threadId;
                status = "sent";
                onboardingTriggered = true;
                logger.info({ signupId: signup.id, to: email }, "Welcome email sent for new signup");
              }
            }

            await db.insert(outreachEmailsTable).values({
              businessId: resolvedBizId,
              inboxId: effectiveInboxId,
              messageId: messageId ?? null,
              threadId: threadId ?? null,
              direction: "outbound",
              toAddress: email,
              fromAddress: effectiveEmailAddress ?? null,
              subject: emailItem.subject,
              body: emailItem.body,
              status,
              agentType: "sales",
              sentAt: isImmediate && status === "sent" ? now : null,
              scheduledFor,
            });
          }

          if (onboardingTriggered) {
            await db.update(signupsTable)
              .set({ onboardingTriggered: true, updatedAt: new Date() })
              .where(eq(signupsTable.id, signup.id));
          }

          logger.info({ signupId: signup.id, sequenceCount: generatedEmails.length }, "Onboarding sequence saved for new signup");
        } else {
          logger.warn({ signupId: signup.id }, "No inbox available — signup saved without onboarding emails");
        }
      }
    } else {
      logger.warn({ signupId: signup.id }, "No valid businessId — signup saved without onboarding emails");
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
