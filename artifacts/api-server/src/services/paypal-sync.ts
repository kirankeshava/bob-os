import { eq } from "drizzle-orm";
import { db, customersTable } from "@workspace/db";
import { logger } from "../lib/logger";

async function findCustomerByPayPalSubscriptionId(subscriptionId: string) {
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.paypalSubscriptionId, subscriptionId));
  return customer ?? null;
}

async function updateSubscriptionStatus(subscriptionId: string, status: string) {
  const customer = await findCustomerByPayPalSubscriptionId(subscriptionId);
  if (!customer) {
    logger.warn({ subscriptionId }, "paypal-sync: no customer found for PayPal subscription id");
    return;
  }
  await db
    .update(customersTable)
    .set({ subscriptionStatus: status, updatedAt: new Date() })
    .where(eq(customersTable.id, customer.id));
  logger.info({ customerId: customer.id, status }, "paypal-sync: subscription status updated");
}

export async function handlePayPalWebhookEvent(eventType: string, resource: Record<string, unknown>) {
  try {
    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED": {
        const subscriptionId = resource.id as string | undefined;
        if (subscriptionId) {
          await updateSubscriptionStatus(subscriptionId, "active");
        }
        break;
      }
      case "PAYMENT.SALE.COMPLETED": {
        const billingAgreementId = resource.billing_agreement_id as string | undefined;
        if (billingAgreementId) {
          await updateSubscriptionStatus(billingAgreementId, "active");
        }
        break;
      }
      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscriptionId = resource.id as string | undefined;
        if (subscriptionId) {
          await updateSubscriptionStatus(subscriptionId, "cancelled");
        }
        break;
      }
      case "PAYMENT.SALE.DENIED":
      case "PAYMENT.SALE.REFUNDED": {
        const billingAgreementId = resource.billing_agreement_id as string | undefined;
        if (billingAgreementId) {
          await updateSubscriptionStatus(billingAgreementId, "trial_expired");
        }
        break;
      }
      default:
        logger.debug({ eventType }, "paypal-sync: unhandled event type");
        break;
    }
  } catch (err) {
    logger.error({ err, eventType }, "paypal-sync: event handler error");
  }
}
