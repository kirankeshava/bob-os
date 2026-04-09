import { pgTable, serial, integer, text, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const businessPerformanceTable = pgTable("business_performance", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }).unique(),
  income: real("income").default(0),
  monthlySpend: real("monthly_spend").default(0),
  netBurnProfit: real("net_burn_profit").default(0),
  runwayDays: integer("runway_days").default(0),
  reached: integer("reached").default(0),
  signups: integer("signups").default(0),
  activeUsers: integer("active_users").default(0),
  arpu: real("arpu").default(0),
  churnRate: real("churn_rate").default(0),
  npsScore: real("nps_score"),
  healthScore: text("health_score").default("yellow"),
  topSources: text("top_sources"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBusinessPerformanceSchema = createInsertSchema(businessPerformanceTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBusinessPerformanceSchema = insertBusinessPerformanceSchema.partial();

export type BusinessPerformance = typeof businessPerformanceTable.$inferSelect;
export type InsertBusinessPerformance = z.infer<typeof insertBusinessPerformanceSchema>;

export const customerFeedbackTable = pgTable("customer_feedback", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  source: text("source"),
  text: text("text").notNull(),
  sentiment: text("sentiment").notNull().default("neutral"),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCustomerFeedbackSchema = createInsertSchema(customerFeedbackTable).omit({
  id: true,
  createdAt: true,
});

export type CustomerFeedback = typeof customerFeedbackTable.$inferSelect;
export type InsertCustomerFeedback = z.infer<typeof insertCustomerFeedbackSchema>;

export const competitorsTable = pgTable("competitors", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  strengths: text("strengths"),
  weaknesses: text("weaknesses"),
  pricing: text("pricing"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCompetitorSchema = createInsertSchema(competitorsTable).omit({
  id: true,
  createdAt: true,
});

export type Competitor = typeof competitorsTable.$inferSelect;
export type InsertCompetitor = z.infer<typeof insertCompetitorSchema>;
