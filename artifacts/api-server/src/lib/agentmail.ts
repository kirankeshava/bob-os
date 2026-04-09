// AgentMail integration via @replit/connectors-sdk
// Handles inbox creation, email sending, and inbox management

import { ReplitConnectors } from "@replit/connectors-sdk";
import { eq } from "drizzle-orm";
import { db, businessesTable, businessSitesTable } from "@workspace/db";
import { logger } from "./logger";

export interface AgentMailInbox {
  id: string;
  emailAddress: string;
  displayName?: string;
}

export interface AgentMailMessage {
  id: string;
  subject: string;
  from: string;
  to: string;
  body: string;
  threadId?: string;
  sentAt?: string;
  receivedAt?: string;
}

async function getConnectors() {
  return new ReplitConnectors();
}

export async function createInbox(displayName: string): Promise<AgentMailInbox | null> {
  try {
    const connectors = await getConnectors();
    const response = await connectors.proxy("agentmail", "/inboxes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ display_name: displayName }),
    });
    if (!response.ok) {
      const text = await response.text();
      logger.warn({ status: response.status, body: text }, "AgentMail createInbox failed");
      return null;
    }
    const data = await response.json() as { id: string; email_address: string; display_name?: string };
    return { id: data.id, emailAddress: data.email_address, displayName: data.display_name };
  } catch (err) {
    logger.error({ err }, "AgentMail createInbox error");
    return null;
  }
}

export async function getInbox(inboxId: string): Promise<AgentMailInbox | null> {
  try {
    const connectors = await getConnectors();
    const response = await connectors.proxy("agentmail", `/inboxes/${inboxId}`, { method: "GET" });
    if (!response.ok) return null;
    const data = await response.json() as { id: string; email_address: string; display_name?: string };
    return { id: data.id, emailAddress: data.email_address, displayName: data.display_name };
  } catch (err) {
    logger.error({ err }, "AgentMail getInbox error");
    return null;
  }
}

export async function listMessages(inboxId: string): Promise<AgentMailMessage[]> {
  try {
    const connectors = await getConnectors();
    const response = await connectors.proxy("agentmail", `/inboxes/${inboxId}/messages`, { method: "GET" });
    if (!response.ok) return [];
    const data = await response.json() as { messages?: AgentMailMessage[] } | AgentMailMessage[];
    return Array.isArray(data) ? data : (data.messages ?? []);
  } catch (err) {
    logger.error({ err }, "AgentMail listMessages error");
    return [];
  }
}

export async function sendEmail(
  inboxId: string,
  to: string,
  subject: string,
  body: string,
  htmlBody?: string,
): Promise<{ messageId: string; threadId?: string } | null> {
  try {
    const connectors = await getConnectors();
    const payload: Record<string, string> = { to, subject, text: body };
    if (htmlBody) payload.html = htmlBody;
    const response = await connectors.proxy("agentmail", `/inboxes/${inboxId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const text = await response.text();
      logger.warn({ status: response.status, body: text }, "AgentMail sendEmail failed");
      return null;
    }
    const data = await response.json() as { id?: string; message_id?: string; thread_id?: string };
    return { messageId: data.message_id ?? data.id ?? "", threadId: data.thread_id };
  } catch (err) {
    logger.error({ err }, "AgentMail sendEmail error");
    return null;
  }
}

export async function replyToThread(
  inboxId: string,
  threadId: string,
  body: string,
): Promise<boolean> {
  try {
    const connectors = await getConnectors();
    const response = await connectors.proxy("agentmail", `/inboxes/${inboxId}/threads/${threadId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: body }),
    });
    return response.ok;
  } catch (err) {
    logger.error({ err }, "AgentMail replyToThread error");
    return false;
  }
}

export async function listInboxes(): Promise<AgentMailInbox[]> {
  try {
    const connectors = await getConnectors();
    const response = await connectors.proxy("agentmail", "/inboxes", { method: "GET" });
    if (!response.ok) return [];
    const data = await response.json() as AgentMailInbox[] | { inboxes?: AgentMailInbox[] };
    return Array.isArray(data) ? data : (data.inboxes ?? []);
  } catch (err) {
    logger.error({ err }, "AgentMail listInboxes error");
    return [];
  }
}

/**
 * Ensures a business has an AgentMail inbox.
 * If already provisioned, returns immediately.
 * Otherwise creates an inbox and saves the IDs to both businesses and business_sites tables.
 */
export async function ensureInbox(businessId: number, businessName: string): Promise<AgentMailInbox | null> {
  try {
    // Check if already provisioned on the business record
    const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
    if (!business) {
      logger.warn({ businessId }, "ensureInbox: business not found");
      return null;
    }

    if (business.emailInboxId) {
      return { id: business.emailInboxId, emailAddress: business.emailAddress ?? "" };
    }

    // Create new inbox
    const inbox = await createInbox(`${businessName} — Bob AI`);
    if (!inbox) {
      logger.warn({ businessId }, "ensureInbox: inbox creation failed");
      return null;
    }

    // Save to businesses table
    await db.update(businessesTable)
      .set({ emailInboxId: inbox.id, emailAddress: inbox.emailAddress, updatedAt: new Date() })
      .where(eq(businessesTable.id, businessId));

    // Also update business_sites if one exists
    const [site] = await db.select().from(businessSitesTable).where(eq(businessSitesTable.businessId, businessId));
    if (site) {
      await db.update(businessSitesTable)
        .set({ emailInboxId: inbox.id, emailAddress: inbox.emailAddress, contactEmail: inbox.emailAddress, updatedAt: new Date() })
        .where(eq(businessSitesTable.businessId, businessId));
    }

    logger.info({ businessId, emailAddress: inbox.emailAddress }, "ensureInbox: inbox provisioned");
    return inbox;
  } catch (err) {
    logger.error({ err, businessId }, "ensureInbox error");
    return null;
  }
}
