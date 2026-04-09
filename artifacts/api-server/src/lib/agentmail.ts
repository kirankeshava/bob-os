// AgentMail integration — direct HTTP using connector auth headers
// Uses ReplitConnectors.getProxyHeaders() to get auth, then calls AgentMail API directly

import { ReplitConnectors } from "@replit/connectors-sdk";
import { eq } from "drizzle-orm";
import { db, businessesTable, businessSitesTable } from "@workspace/db";
import { logger } from "./logger";

const AGENTMAIL_BASE = "https://api.agentmail.to/v0";
const CONNECTOR_NAME = "agentmail";

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

async function agentmailFetch(path: string, options: RequestInit = {}): Promise<Response> {
  // Try to get auth headers from the connector
  const connectors = new ReplitConnectors();

  let authHeaders: Record<string, string> = {};
  try {
    authHeaders = await connectors.getProxyHeaders(CONNECTOR_NAME);
  } catch (_e) {
    // Proxy headers unavailable — fall through to env var approach
  }

  // If we have a proxy-provided Authorization header already, use it directly
  // Otherwise fall back to AGENTMAIL_API_KEY env var or listConnections settings
  if (!authHeaders["Authorization"] && !authHeaders["authorization"]) {
    // Try env var first
    const envKey = process.env.AGENTMAIL_API_KEY;
    if (envKey) {
      authHeaders = { Authorization: `Bearer ${envKey}` };
    } else {
      // Try listConnections to get the api_key from settings
      try {
        const connections = await connectors.listConnections({ connector_names: CONNECTOR_NAME });
        const conn = connections?.[0] as Record<string, unknown> | undefined;
        const settings = conn?.settings as Record<string, string> | undefined;
        const apiKey = settings?.api_key;
        if (apiKey) {
          authHeaders = { Authorization: `Bearer ${apiKey}` };
        }
      } catch (_e2) {
        // ignore
      }
    }
  }

  const url = `${AGENTMAIL_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...authHeaders,
    ...(options.headers as Record<string, string> | undefined ?? {}),
  };

  return fetch(url, { ...options, headers });
}

export async function createInbox(displayName: string): Promise<AgentMailInbox | null> {
  try {
    const response = await agentmailFetch("/inboxes", {
      method: "POST",
      body: JSON.stringify({ display_name: displayName }),
    });
    if (!response.ok) {
      const text = await response.text();
      logger.warn({ status: response.status, body: text }, "AgentMail createInbox failed");
      return null;
    }
    const data = await response.json() as { inbox_id?: string; email?: string; display_name?: string };
    return {
      id: data.inbox_id ?? "",
      emailAddress: data.email ?? "",
      displayName: data.display_name,
    };
  } catch (err) {
    logger.error({ err }, "AgentMail createInbox error");
    return null;
  }
}

export async function getInbox(inboxId: string): Promise<AgentMailInbox | null> {
  try {
    const response = await agentmailFetch(`/inboxes/${encodeURIComponent(inboxId)}`, { method: "GET" });
    if (!response.ok) return null;
    const data = await response.json() as { inbox_id?: string; email?: string; display_name?: string };
    return {
      id: data.inbox_id ?? inboxId,
      emailAddress: data.email ?? "",
      displayName: data.display_name,
    };
  } catch (err) {
    logger.error({ err }, "AgentMail getInbox error");
    return null;
  }
}

export async function listMessages(inboxId: string): Promise<AgentMailMessage[]> {
  try {
    const response = await agentmailFetch(`/inboxes/${encodeURIComponent(inboxId)}/messages`, { method: "GET" });
    if (!response.ok) return [];
    const data = await response.json() as unknown;
    const msgs = Array.isArray(data) ? data : ((data as Record<string, unknown>).messages as AgentMailMessage[] ?? []);
    return msgs.map((m: Record<string, unknown>) => ({
      id: String(m.message_id ?? m.id ?? ""),
      subject: String(m.subject ?? ""),
      from: String(m.from ?? ""),
      to: String(m.to ?? ""),
      body: String(m.text ?? m.body ?? ""),
      threadId: m.thread_id ? String(m.thread_id) : undefined,
      sentAt: m.sent_at ? String(m.sent_at) : undefined,
      receivedAt: m.received_at ? String(m.received_at) : undefined,
    }));
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
    const payload: Record<string, string> = { to, subject, text: body };
    if (htmlBody) payload.html = htmlBody;
    const encodedId = encodeURIComponent(inboxId);
    const response = await agentmailFetch(`/inboxes/${encodedId}/messages`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const text = await response.text();
      if (response.status === 404) {
        // Outbound sending not supported on current AgentMail plan
        logger.warn({ inboxId, to, subject }, "AgentMail sendEmail: outbound not available on current plan");
      } else {
        logger.warn({ status: response.status, body: text }, "AgentMail sendEmail failed");
      }
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
    const response = await agentmailFetch(`/inboxes/${encodeURIComponent(inboxId)}/threads/${threadId}/reply`, {
      method: "POST",
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
    const response = await agentmailFetch("/inboxes", { method: "GET" });
    if (!response.ok) return [];
    const data = await response.json() as unknown;
    const inboxes = Array.isArray(data) ? data : ((data as Record<string, unknown>).inboxes as unknown[] ?? []);
    return inboxes.map((i: Record<string, unknown>) => ({
      id: String(i.inbox_id ?? i.id ?? ""),
      emailAddress: String(i.email ?? i.emailAddress ?? ""),
      displayName: i.display_name ? String(i.display_name) : undefined,
    }));
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
    const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
    if (!business) {
      logger.warn({ businessId }, "ensureInbox: business not found");
      return null;
    }

    // Already provisioned — return immediately
    if (business.emailInboxId) {
      return { id: business.emailInboxId, emailAddress: business.emailAddress ?? "" };
    }

    // Try to get an existing inbox first (shared inbox strategy for plan limits)
    let inbox: AgentMailInbox | null = null;
    const existingInboxes = await listInboxes();
    if (existingInboxes.length > 0) {
      inbox = existingInboxes[0];
      logger.info({ businessId, inboxId: inbox.id }, "ensureInbox: reusing existing shared inbox");
    } else {
      // Try creating a new inbox (may fail if plan limit reached)
      inbox = await createInbox(`${businessName} — Bob AI`);
      if (!inbox) {
        logger.warn({ businessId }, "ensureInbox: inbox creation failed (plan limit?)");
        return null;
      }
    }

    await db.update(businessesTable)
      .set({ emailInboxId: inbox.id, emailAddress: inbox.emailAddress, updatedAt: new Date() })
      .where(eq(businessesTable.id, businessId));

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
