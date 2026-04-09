import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ceoPlanTable = pgTable("ceo_plan", {
  id: serial("id").primaryKey(),
  goals: jsonb("goals").notNull().default([]),
  milestones: jsonb("milestones").notNull().default([]),
  profitabilityStrategy: text("profitability_strategy").notNull().default(""),
  gaps: jsonb("gaps").notNull().default([]),
  threats: jsonb("threats").notNull().default([]),
  concerns: jsonb("concerns").notNull().default([]),
  overallStrategy: text("overall_strategy").notNull().default(""),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCeoPlanSchema = createInsertSchema(ceoPlanTable).omit({
  id: true,
  generatedAt: true,
  updatedAt: true,
});

export type CeoPlan = typeof ceoPlanTable.$inferSelect;
export type InsertCeoPlan = z.infer<typeof insertCeoPlanSchema>;
