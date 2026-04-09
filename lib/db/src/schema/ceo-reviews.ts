import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const ceoReviewsTable = pgTable("ceo_reviews", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  mode: text("mode").notNull(),
  oneMetric: text("one_metric").notNull(),
  oneMetricValue: text("one_metric_value").notNull(),
  runwayStatus: text("runway_status").notNull(),
  topPriority: text("top_priority").notNull(),
  summary: text("summary").notNull(),
  weeklyRevenueTarget: text("weekly_revenue_target"),
  taskDirectives: text("task_directives"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCeoReviewSchema = createInsertSchema(ceoReviewsTable).omit({
  id: true,
  createdAt: true,
});

export type CeoReview = typeof ceoReviewsTable.$inferSelect;
export type InsertCeoReview = z.infer<typeof insertCeoReviewSchema>;
