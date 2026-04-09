import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db, customersTable, reviewsTable, dailyReportsTable } from "@workspace/db";
import { getUncachableStripeClient } from "../lib/stripeClient";
import { sendEmail, listInboxes } from "../lib/agentmail";
import { isPayPalConfigured, ensureProductAndPlan, createSubscription, getZelleContactInfo } from "../lib/paypalClient";
import { logger } from "../lib/logger";
import { seedReviewsForCustomer, scheduleReportEmailsForCustomer } from "../services/daily-report-scheduler";

interface CreateCustomerBody {
  name?: string;
  email?: string;
  businessName?: string;
  platforms?: string[];
  googleUrl?: string;
  yelpUrl?: string;
  plan?: string;
  paymentMethod?: string;
}

function validateCreateCustomer(body: CreateCustomerBody): string | null {
  if (!body.name?.trim()) return "name is required";
  if (!body.email?.trim() || !body.email.includes("@")) return "valid email is required";
  if (!body.businessName?.trim()) return "businessName is required";
  if (!Array.isArray(body.platforms) || body.platforms.length === 0) return "at least one platform is required";
  if (body.paymentMethod && !["stripe", "paypal", "zelle"].includes(body.paymentMethod)) {
    return "paymentMethod must be stripe, paypal, or zelle";
  }
  return null;
}

const router = Router();

async function getSharedInboxId(): Promise<string | null> {
  try {
    const inboxes = await listInboxes();
    return inboxes[0]?.id ?? null;
  } catch {
    return null;
  }
}

async function sendWelcomeEmail(name: string, email: string, businessName: string, trialEndAt: Date) {
  const inboxId = await getSharedInboxId();
  if (!inboxId) {
    logger.warn({ email }, "No inbox available to send welcome email");
    return;
  }

  const trialEndStr = trialEndAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const subject = `Welcome to the AI Review Autopilot — Your 7-day free trial starts now`;
  const body = `Hi ${name},

Welcome aboard! We're thrilled to have ${businessName} join the AI Review & Reputation Autopilot service.

Your 7-day free trial begins today and runs through ${trialEndStr}. During this time, our AI will:
• Monitor your review platforms for new reviews
• Automatically generate professional, personalized responses
• Help you build a stronger online reputation on autopilot

No credit card is needed right now — just sit back and watch the magic happen.

Around day 5 of your trial, we'll send you a link to add your payment method so your service continues seamlessly after the trial ends.

If you have any questions, simply reply to this email.

To your success,
The AI Review Autopilot Team`;

  await sendEmail(inboxId, email, subject, body);
  logger.info({ email, businessName }, "Welcome email sent to new customer");
}

router.post("/", async (req, res) => {
  const body = req.body as CreateCustomerBody;
  const validationError = validateCreateCustomer(body);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const { name, email, businessName, platforms, googleUrl, yelpUrl } = body as Required<Pick<CreateCustomerBody, "name" | "email" | "businessName" | "platforms">> & CreateCustomerBody;
  const paymentMethod = body.paymentMethod || "stripe";

  const trialStartAt = new Date();
  const trialEndAt = new Date(trialStartAt.getTime() + 7 * 24 * 60 * 60 * 1000);

  let stripeCustomerId: string | null = null;
  if (paymentMethod === "stripe") {
    try {
      const stripe = await getUncachableStripeClient();
      const stripeCustomer = await stripe.customers.create({
        name,
        email,
        metadata: { businessName, platforms: platforms.join(",") },
      });
      stripeCustomerId = stripeCustomer.id;
      logger.info({ stripeCustomerId, email }, "Stripe customer created");
    } catch (err) {
      logger.error({ err, email }, "Failed to create Stripe customer — continuing without Stripe ID");
    }
  }

  const [customer] = await db
    .insert(customersTable)
    .values({
      name,
      email,
      businessName,
      platforms,
      googleUrl: googleUrl || null,
      yelpUrl: yelpUrl || null,
      stripeCustomerId,
      paymentMethod,
      subscriptionStatus: "trial",
      trialStartAt,
      trialEndAt,
    })
    .returning();

  sendWelcomeEmail(name, email, businessName, trialEndAt).catch(err =>
    logger.error({ err, email }, "Welcome email failed")
  );

  seedReviewsForCustomer(customer.id).catch(err =>
    logger.error({ err, customerId: customer.id }, "Review seeding failed")
  );

  scheduleReportEmailsForCustomer(customer.id).catch(err =>
    logger.error({ err, customerId: customer.id }, "Report scheduling failed")
  );

  logger.info({ customerId: customer.id, email, businessName, paymentMethod }, "New customer created");
  res.status(201).json(customer);
});

router.get("/", async (_req, res) => {
  const customers = await db
    .select()
    .from(customersTable)
    .orderBy(desc(customersTable.createdAt));
  res.json(customers);
});

router.get("/zelle/contact-info", async (_req, res) => {
  const info = getZelleContactInfo();
  res.json(info);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));
  if (!customer) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(customer);
});

router.patch("/:id/status", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const { subscriptionStatus } = req.body as { subscriptionStatus: string };
  if (!["trial", "active", "trial_expired", "cancelled"].includes(subscriptionStatus)) {
    res.status(400).json({ error: "Invalid subscriptionStatus" });
    return;
  }
  const [updated] = await db
    .update(customersTable)
    .set({ subscriptionStatus, updatedAt: new Date() })
    .where(eq(customersTable.id, id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(updated);
});

router.post("/:id/reviews", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const [customer] = await db.select().from(customersTable).where(eq(customersTable.id, id));
  if (!customer) { res.status(404).json({ error: "Not found" }); return; }

  const reviews = req.body as Array<{
    platform?: string;
    rating: number;
    authorName: string;
    reviewText: string;
    reviewDate?: string;
  }>;

  if (!Array.isArray(reviews) || reviews.length === 0) {
    res.status(400).json({ error: "Body must be a non-empty array of reviews" });
    return;
  }

  const inserted = await db.insert(reviewsTable).values(
    reviews.map(r => ({
      customerId: id,
      platform: r.platform ?? "google",
      rating: Math.min(5, Math.max(1, r.rating)),
      authorName: r.authorName,
      reviewText: r.reviewText,
      reviewDate: r.reviewDate ? new Date(r.reviewDate) : new Date(),
    }))
  ).returning();

  res.status(201).json({ count: inserted.length, reviews: inserted });
});

router.get("/:id/reviews", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const reviews = await db.select().from(reviewsTable)
    .where(eq(reviewsTable.customerId, id))
    .orderBy(desc(reviewsTable.reviewDate));

  res.json(reviews);
});

router.get("/:id/reports", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }

  const reports = await db.select().from(dailyReportsTable)
    .where(eq(dailyReportsTable.customerId, id))
    .orderBy(dailyReportsTable.dayNumber);

  res.json(reports);
});

router.post("/:id/billing-portal", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));
  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  if (!customer.stripeCustomerId) {
    res.status(400).json({ error: "No Stripe customer ID on record" });
    return;
  }
  try {
    const stripe = await getUncachableStripeClient();
    const domain = process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : "https://localhost";
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${domain}/`,
    });
    res.json({ url: session.url });
  } catch (err) {
    logger.error({ err, customerId: id }, "Failed to create billing portal session");
    res.status(500).json({ error: "Failed to create billing portal session" });
  }
});

router.get("/:id/paypal-checkout", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  if (!isPayPalConfigured()) {
    res.status(503).json({ error: "PayPal is not configured" });
    return;
  }

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));

  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  try {
    const { planId } = await ensureProductAndPlan();
    const domain = process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : "https://localhost";

    const { subscriptionId, approvalUrl } = await createSubscription(
      planId,
      customer.name,
      customer.email,
      `${domain}/?paypal=success&customerId=${customer.id}`,
      `${domain}/?paypal=cancelled&customerId=${customer.id}`,
    );

    await db
      .update(customersTable)
      .set({ paypalSubscriptionId: subscriptionId, paymentMethod: "paypal", updatedAt: new Date() })
      .where(eq(customersTable.id, id));

    logger.info({ customerId: id, subscriptionId }, "PayPal checkout redirect for customer");
    res.redirect(approvalUrl);
  } catch (err) {
    logger.error({ err, customerId: id }, "Failed to create PayPal checkout (GET redirect)");
    res.status(500).json({ error: "Failed to create PayPal checkout session" });
  }
});

router.post("/:id/paypal-checkout", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  if (!isPayPalConfigured()) {
    res.status(503).json({ error: "PayPal is not configured" });
    return;
  }

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));

  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  try {
    const { planId } = await ensureProductAndPlan();
    const domain = process.env.REPLIT_DEV_DOMAIN
      ? `https://${process.env.REPLIT_DEV_DOMAIN}`
      : "https://localhost";

    const { subscriptionId, approvalUrl } = await createSubscription(
      planId,
      customer.name,
      customer.email,
      `${domain}/?paypal=success&customerId=${customer.id}`,
      `${domain}/?paypal=cancelled&customerId=${customer.id}`,
    );

    await db
      .update(customersTable)
      .set({ paypalSubscriptionId: subscriptionId, paymentMethod: "paypal", updatedAt: new Date() })
      .where(eq(customersTable.id, id));

    logger.info({ customerId: id, subscriptionId }, "PayPal subscription created for customer");
    res.json({ approvalUrl, subscriptionId });
  } catch (err) {
    logger.error({ err, customerId: id }, "Failed to create PayPal checkout");
    res.status(500).json({ error: "Failed to create PayPal checkout session" });
  }
});

router.post("/:id/mark-paid", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));

  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  if (customer.paymentMethod !== "zelle") {
    res.status(400).json({ error: "Mark as paid is only available for Zelle customers" });
    return;
  }

  const { note } = (req.body || {}) as { note?: string };

  const [updated] = await db
    .update(customersTable)
    .set({ subscriptionStatus: "active", updatedAt: new Date() })
    .where(eq(customersTable.id, id))
    .returning();

  logger.info({ customerId: id, note: note || "none" }, "Zelle customer manually marked as paid");
  res.json(updated);
});

export default router;
