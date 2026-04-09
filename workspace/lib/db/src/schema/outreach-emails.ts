import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const outreachEmailsTable = pgTable("outreach_emails", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  inboxId: text("inbox_id").notNull(),
  messageId: text("message_id"),
  threadId: text("thread_id"),
  direction: text("direction").notNull().default("outbound"), // outbound | inbound
  toAddress: text("to_address"),
  fromAddress: text("from_address"),
  subject: text("subject"),
  body: text("body"),
  status: text("status").notNull().default("sent"), // draft | sent | delivered | replied | failed
  agentType: text("agent_type"),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertOutreachEmailSchema = createInsertSchema(outreachEmailsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type OutreachEmail = typeof outreachEmailsTable.$inferSelect;
export type InsertOutreachEmail = z.infer<typeof insertOutreachEmailSchema>;
