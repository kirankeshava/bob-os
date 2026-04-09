import { isNull } from "drizzle-orm";
import { db, businessesTable } from "@workspace/db";
import { ensureInbox } from "../lib/agentmail";
import { logger } from "../lib/logger";

/**
 * On server startup: provision inboxes for all businesses that don't have one yet.
 * This runs once and catches any businesses created before the auto-provision feature landed.
 */
export async function provisionMissingInboxes(): Promise<void> {
  try {
    const businesses = await db.select().from(businessesTable)
      .where(isNull(businessesTable.emailInboxId));

    if (businesses.length === 0) {
      logger.info("Startup provisioner: all businesses already have inboxes");
      return;
    }

    logger.info({ count: businesses.length }, "Startup provisioner: provisioning inboxes for existing businesses");

    for (const business of businesses) {
      try {
        const inbox = await ensureInbox(business.id, business.name);
        if (inbox) {
          logger.info({ businessId: business.id, emailAddress: inbox.emailAddress }, "Startup provisioner: inbox created");
        } else {
          logger.warn({ businessId: business.id }, "Startup provisioner: inbox creation returned null");
        }
        // Small delay to avoid hitting rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        logger.error({ err, businessId: business.id }, "Startup provisioner: failed for business");
      }
    }

    logger.info("Startup provisioner: complete");
  } catch (err) {
    logger.error({ err }, "Startup provisioner: error");
  }
}
