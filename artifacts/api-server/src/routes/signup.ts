import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, signupsTable, customersTable, businessesTable, businessSitesTable, outreachEmailsTable } from "@workspace/db";
import { sendEmail, ensureInbox } from "../lib/agentmail";
import { getUncachableStripeClient } from "../lib/stripeClient";
import { isPayPalConfigured, ensureProductAndPlan, createSubscription, getZelleContactInfo } from "../lib/paypalClient";
import { openai } from "@workspace/integrations-openai-ai-server";
import { logger } from "../lib/logger";

const router = Router({ mergeParams: true });

const BUSINESS_ONBOARDING_PROMPTS: Record<number, (data: Record<string, unknown>) => string> = {
  1: (d) => {
    const platforms = (d.platforms as string[]) || [];
    const platformList = platforms.join(" and ");
    const urls = [
      d.googleListingUrl ? `Google Business: ${d.googleListingUrl}` : null,
      d.yelpListingUrl ? `Yelp: ${d.yelpListingUrl}` : null,
    ].filter(Boolean).join("\n");

    return `Service: AI Review Reply & Reputation Autopilot
We monitor ${platformList} reviews and draft brand-safe AI responses automatically.
Customer monitoring: ${platformList}
Listing URLs:\n${urls || "Not provided"}`;
  },

  2: (d) => `Service: Appointment No-Show Reducer
Industry: ${d.industry || "Not specified"}
Scheduling software: ${d.schedulingSoftware || "Not specified"}
Business phone: ${d.businessPhone || "Not provided"}
Monthly appointments: ${d.monthlyAppointments || "Not specified"}
Estimated no-show rate: ${d.estimatedNoShowRate || "Unknown"}%
We send smart SMS reminders, collect confirmations, auto-reschedule cancellations, and fill gaps from a waitlist.`,

  3: (d) => {
    const postingPlatforms = (d.postingPlatforms as string[]) || [];
    return `Service: AI Short-Form Clip Factory
Content type: ${d.contentType || "Not specified"}
Posting platforms: ${postingPlatforms.join(", ") || "Not specified"}
Content URL: ${d.contentUrl || "Not provided"}
Average episode length: ${d.avgEpisodeLength || "Not specified"}
Desired clips/week: ${d.clipsPerWeek || "Not specified"}
We convert long-form videos/podcasts into ready-to-post vertical clips with hooks, captions, and platform-specific formatting.`;
  },

  4: (d) => {
    const leadSources = (d.leadSources as string[]) || [];
    return `Service: Local Lead Response Copilot
Industry: ${d.industry || "Not specified"}
Lead sources: ${leadSources.join(", ") || "Not specified"}
Business phone: ${d.businessPhone || "Not provided"}
Average deal value: $${d.avgDealValue || "Not specified"}
Calendar/booking URL: ${d.calendarUrl || "Not provided"}
We instantly text new leads, qualify them with AI-driven questions, and book calls/appointments automatically.`;
  },

  5: (d) => `Service: Etsy/Shopify Listing Optimizer & SEO Auditor
E-commerce platform: ${d.ecommercePlatform || "Not specified"}
Store URL: ${d.storeUrl || "Not provided"}
Active listings: ${d.activeListings || "Not specified"}
Product category: ${d.productCategory || "Not specified"}
Monthly revenue range: ${d.monthlyRevenue || "Not specified"}
We audit product listings (titles, tags, descriptions, images), generate optimized variants, create A/B test plans, and deliver weekly ranking reports.`,
};

router.post("/", async (req, res) => {
  const businessId = parseInt(req.params.businessId);
  if (isNaN(businessId)) {
    res.status(400).json({ error: "Invalid businessId" });
    return;
  }

  const [site] = await db.select({ businessId: businessSitesTable.businessId, published: businessSitesTable.published })
    .from(businessSitesTable)
    .where(eq(businessSitesTable.businessId, businessId));

  if (!site || !site.published) {
    res.status(404).json({ error: "Business site not found" });
    return;
  }

  const { fullName, email, businessName, platforms, googleListingUrl, yelpListingUrl, planName, paymentMethod: rawPaymentMethod, metadata: rawMetadata } = req.body;
  const paymentMethod = ["stripe", "paypal", "zelle"].includes(rawPaymentMethod) ? rawPaymentMethod : "stripe";
  const metadata = rawMetadata && typeof rawMetadata === "object" ? rawMetadata : {};

  if (!fullName || !email || !businessName) {
    res.status(400).json({ error: "fullName, email, and businessName are required" });
    return;
  }

  const effectivePlatforms = Array.isArray(platforms) ? platforms : (Array.isArray(metadata.platforms) ? metadata.platforms : []);

  const [signup] = await db.insert(signupsTable).values({
    fullName,
    email,
    businessName,
    platforms: effectivePlatforms,
    googleListingUrl: googleListingUrl ?? metadata.googleListingUrl ?? null,
    yelpListingUrl: yelpListingUrl ?? metadata.yelpListingUrl ?? null,
    planName: planName ?? null,
    businessId: String(businessId),
    paymentMethod,
    metadata,
    onboardingTriggered: false,
  }).returning();

  const trialStartAt = new Date();
  const trialEndAt = new Date(trialStartAt.getTime() + 7 * 24 * 60 * 60 * 1000);

  let stripeCustomerId: string | null = null;
  if (paymentMethod === "stripe") {
    try {
      const stripe = await getUncachableStripeClient();
      const stripeCustomer = await stripe.customers.create({
        name: fullName,
        email,
        metadata: { businessName, businessId: String(businessId) },
      });
      stripeCustomerId = stripeCustomer.id;
      logger.info({ stripeCustomerId, email }, "Stripe customer created during signup");
    } catch (err) {
      logger.error({ err, email }, "Failed to create Stripe customer during signup");
    }
  }

  const [customer] = await db.insert(customersTable).values({
    name: fullName,
    email,
    businessName,
    businessId: String(businessId),
    platforms: effectivePlatforms,
    googleUrl: googleListingUrl ?? metadata.googleListingUrl ?? null,
    yelpUrl: yelpListingUrl ?? metadata.yelpListingUrl ?? null,
    metadata,
    stripeCustomerId,
    paymentMethod,
    subscriptionStatus: "trial",
    trialStartAt,
    trialEndAt,
  }).returning();

  logger.info({ customerId: customer.id, signupId: signup.id, paymentMethod, businessId }, "Customer record created from signup");

  let paymentData: Record<string, unknown> = {};

  if (paymentMethod === "stripe" && stripeCustomerId) {
    try {
      const stripe = await getUncachableStripeClient();
      const domain = process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : "https://localhost";
      const session = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: `${domain}/`,
      });
      paymentData = { billingPortalUrl: session.url };
    } catch (err) {
      logger.error({ err }, "Failed to create Stripe billing portal for signup");
    }
  } else if (paymentMethod === "paypal" && isPayPalConfigured()) {
    try {
      const { planId } = await ensureProductAndPlan();
      const domain = process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}`
        : "https://localhost";
      const { subscriptionId, approvalUrl } = await createSubscription(
        planId,
        fullName,
        email,
        `${domain}/?paypal=success&customerId=${customer.id}`,
        `${domain}/?paypal=cancelled&customerId=${customer.id}`,
      );
      await db.update(customersTable)
        .set({ paypalSubscriptionId: subscriptionId, updatedAt: new Date() })
        .where(eq(customersTable.id, customer.id));
      paymentData = { paypalApprovalUrl: approvalUrl, paypalSubscriptionId: subscriptionId };
    } catch (err) {
      logger.error({ err }, "Failed to create PayPal subscription for signup");
    }
  } else if (paymentMethod === "zelle") {
    paymentData = { zelleContactInfo: getZelleContactInfo() };
  }

  try {
    const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
    if (!business) {
      res.json({ success: true, signupId: signup.id, customerId: customer.id, paymentMethod, paymentData, onboardingTriggered: false });
      return;
    }

    let inboxId = business.emailInboxId;
    let fromAddress = business.emailAddress;

    if (!inboxId) {
      const [fullSite] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
      inboxId = fullSite?.emailInboxId ?? null;
      fromAddress = fullSite?.emailAddress ?? null;
    }

    if (!inboxId) {
      const provisioned = await ensureInbox(businessId, business.name);
      if (provisioned) {
        inboxId = provisioned.id;
        fromAddress = provisioned.emailAddress;
      }
    }

    if (!inboxId) {
      logger.warn({ signupId: signup.id }, "No inbox available — signup saved without onboarding emails");
      res.json({ success: true, signupId: signup.id, customerId: customer.id, paymentMethod, paymentData, onboardingTriggered: false });
      return;
    }

    const allData: Record<string, unknown> = { fullName, email, businessName, ...metadata };
    if (effectivePlatforms.length > 0) allData.platforms = effectivePlatforms;
    if (googleListingUrl) allData.googleListingUrl = googleListingUrl;
    if (yelpListingUrl) allData.yelpListingUrl = yelpListingUrl;

    const contextBuilder = BUSINESS_ONBOARDING_PROMPTS[businessId];
    const serviceContext = contextBuilder
      ? contextBuilder(allData)
      : `Service: ${business.name}\nDescription: ${business.description}`;

    const planContext = planName ? `\nSelected plan: ${planName}` : "";

    const prompt = `You are a professional email copywriter. Generate a 3-email onboarding sequence for a new customer who just signed up.

New Customer: ${fullName}
Business: ${businessName}
Email: ${email}${planContext}

${serviceContext}

Create 3 emails:
1. Immediate welcome email (sent now) - warm, personal, confirms what we received, tells them what to expect in the next 7 days of their free trial
2. Value proposition follow-up (sent in 2 days) - explains how the service works specifically for their setup, showcases key benefits, shares a quick-win tip they can use right away
3. Trial check-in email (sent in 5 days) - asks how things are going, highlights results they should be seeing, gently reminds them the trial converts in 2 days

Sign off as the "${business.name} Team".

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
        businessId,
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

    logger.info({ signupId: signup.id, sequenceCount: generatedEmails.length, welcomeSent, businessId }, "Onboarding sequence saved for new signup");

    res.json({ success: true, signupId: signup.id, customerId: customer.id, paymentMethod, paymentData, onboardingTriggered: true });
  } catch (err) {
    logger.error({ err, signupId: signup.id }, "Failed to trigger onboarding sequence for signup");
    res.status(500).json({ error: "Failed to set up onboarding sequence. Please try again." });
  }
});

export default router;
