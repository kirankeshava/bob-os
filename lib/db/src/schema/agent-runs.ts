import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const agentRunsTable = pgTable("agent_runs", {
  id: serial("id").primaryKey(),
  agentType: text("agent_type").notNull(),
  status: text("status").notNull().default("pending"),
  businessId: integer("business_id"),
  log: text("log"),
  result: text("result"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAgentRunSchema = createInsertSchema(agentRunsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AgentRun = typeof agentRunsTable.$inferSelect;
export type InsertAgentRun = z.infer<typeof insertAgentRunSchema>;
