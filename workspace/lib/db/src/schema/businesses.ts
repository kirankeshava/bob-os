import { pgTable, serial, text, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const businessesTable = pgTable("businesses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  marketSize: text("market_size").notNull(),
  tam: text("tam").notNull(),
  investmentNeeded: text("investment_needed").notNull(),
  targetRevenue30d: text("target_revenue_30d").notNull(),
  effortLevel: text("effort_level").notNull().default("medium"),
  platform: text("platform").notNull(),
  status: text("status").notNull().default("researching"),
  rank: integer("rank").notNull().default(1),
  costBenefitScore: real("cost_benefit_score"),
  marketDemandScore: real("market_demand_score"),
  agentNotes: text("agent_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBusinessSchema = createInsertSchema(businessesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBusinessSchema = insertBusinessSchema.partial();

export type Business = typeof businessesTable.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
