import { eq } from "drizzle-orm";
import { db, customersTable } from "@workspace/db";
import { getUncachableStripeClient } from "../lib/stripeClient";
import { isPayPalConfigured, getZelleContactInfo } from "../lib/paypalClient";
import { sendEmail, listInboxes } from "../lib/agentmail";
import { logger } from "../lib/logger";

const TRIAL_CHECK_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

async function getSharedInboxId(): Promise<string | null> {
  try {
    const inboxes = await listInboxes();
    return inboxes[0]?.id ?? null;
  } catch {
    return null;
  }
}

function buildPaymentOptionsBlock(
  customer: typeof customersTable.$inferSelect,
  billingPortalUrl: string | null,
  domain: string,
): string {
  const sections: string[] = [];

  sections.push(`💳 OPTION 1 — Pay with Credit/Debit Card (Stripe)
${billingPortalUrl ? `Add your payment method here:\n${billingPortalUrl}` : "Contact us for a payment link."}`);

  if (isPayPalConfigured()) {
    sections.push(`🅿️ OPTION 2 — Pay with PayPal
Set up your weekly subscription via PayPal:
${domain}/api/customers/${customer.id}/paypal-checkout
(You'll be redirected to PayPal to complete checkout)`);
  }

  const zelleInfo = getZelleContactInfo();
  sections.push(`💰 OPTION ${isPayPalConfigured() ? "3" : "2"} — Pay with Zelle
Send your weekly payment of $97 via Zelle to:
  Email: ${zelleInfo.email}
  Phone: ${zelleInfo.phone}
Please include your business name "${customer.businessName}" in the memo.
After sending, reply to this email so we can confirm and activate your account.`);

  return sections.join("\n\n");
}

async function sendPaymentReminderEmail(
  customer: typeof customersTable.$inferSelect,
  billingPortalUrl: string | null,
) {
  const inboxId = await getSharedInboxId();
  if (!inboxId) return;

  const domain = process.env.REPLIT_DEV_DOMAIN
    ? `https://${process.env.REPLIT_DEV_DOMAIN}`
    : "https://localhost";

  const paymentOptions = buildPaymentOptionsBlock(customer, billingPortalUrl, domain);

  const subject = `Action required: Add payment method to continue your AI Review Autopilot`;
  const body = `Hi ${customer.name},

Your 7-day free trial for ${customer.businessName} ends in 2 days!

To ensure uninterrupted service, please choose one of the payment options below:

${paymentOptions}

After the trial ends, your subscription will be $97/week and you'll continue to receive:
• Automatic AI-powered review responses
• Ongoing reputation monitoring
• Engagement tracking for Google and Yelp

Don't let your reputation go unmanaged — keep the autopilot running!

Questions? Just reply to this email.

Best,
The AI Review Autopilot Team`;

  await sendEmail(inboxId, customer.email, subject, body);
  logger.info({ customerId: customer.id, email: customer.email }, "Trial expiry reminder sent");
}

async function checkTrials() {
  const now = new Date();

  logger.info("Trial expiry check running");

  const trialCustomers = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.subscriptionStatus, "trial"));

  for (const customer of trialCustomers) {
    const trialEnd = new Date(customer.trialEndAt);

    if (trialEnd <= now) {
      await db
        .update(customersTable)
        .set({ subscriptionStatus: "trial_expired", updatedAt: new Date() })
        .where(eq(customersTable.id, customer.id));
      logger.info({ customerId: customer.id, email: customer.email }, "Trial marked expired");
      continue;
    }

    const daysUntilExpiry = (trialEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
    if (daysUntilExpiry <= 2) {
      let billingPortalUrl: string | null = null;

      if (customer.stripeCustomerId) {
        try {
          const stripe = await getUncachableStripeClient();
          const domain = process.env.REPLIT_DEV_DOMAIN
            ? `https://${process.env.REPLIT_DEV_DOMAIN}`
            : "https://localhost";
          const session = await stripe.billingPortal.sessions.create({
            customer: customer.stripeCustomerId,
            return_url: `${domain}/`,
          });
          billingPortalUrl = session.url ?? null;
        } catch (err) {
          logger.error({ err, customerId: customer.id }, "Failed to create billing portal for reminder");
        }
      }

      try {
        await sendPaymentReminderEmail(customer, billingPortalUrl);
      } catch (err) {
        logger.error({ err, customerId: customer.id }, "Failed to send reminder email");
      }
    }
  }
}

export function startTrialExpiryScheduler() {
  logger.info("Trial expiry scheduler started");
  checkTrials().catch(err => logger.error({ err }, "Trial expiry check failed"));
  setInterval(() => {
    checkTrials().catch(err => logger.error({ err }, "Trial expiry check failed"));
  }, TRIAL_CHECK_INTERVAL_MS);
}
