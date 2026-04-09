import { eq } from "drizzle-orm";
import { db, customersTable } from "@workspace/db";
import { logger } from "../lib/logger";

async function findCustomerByStripeId(stripeCustomerId: string) {
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.stripeCustomerId, stripeCustomerId));
  return customer ?? null;
}

async function updateSubscriptionStatus(stripeCustomerId: string, status: string) {
  const customer = await findCustomerByStripeId(stripeCustomerId);
  if (!customer) {
    logger.warn({ stripeCustomerId }, "stripe-sync: no customer found for stripe id");
    return;
  }
  await db
    .update(customersTable)
    .set({ subscriptionStatus: status, updatedAt: new Date() })
    .where(eq(customersTable.id, customer.id));
  logger.info({ customerId: customer.id, status }, "stripe-sync: subscription status updated");
}

export async function handleStripeEvent(eventType: string, eventObject: Record<string, unknown>) {
  try {
    switch (eventType) {
      case "customer.subscription.created": {
        const customerId = eventObject.customer as string | undefined;
        if (customerId) {
          await updateSubscriptionStatus(customerId, "active");
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const customerId = eventObject.customer as string | undefined;
        if (customerId) {
          await updateSubscriptionStatus(customerId, "active");
        }
        break;
      }
      case "invoice.payment_failed": {
        const customerId = eventObject.customer as string | undefined;
        if (customerId) {
          const customer = await findCustomerByStripeId(customerId);
          if (customer && customer.subscriptionStatus === "active") {
            await updateSubscriptionStatus(customerId, "trial_expired");
          }
        }
        break;
      }
      case "customer.subscription.deleted": {
        const customerId = eventObject.customer as string | undefined;
        if (customerId) {
          await updateSubscriptionStatus(customerId, "cancelled");
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    logger.error({ err, eventType }, "stripe-sync: event handler error");
  }
}
