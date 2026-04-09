import { pgTable, serial, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const dailyReportsTable = pgTable("daily_reports", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  dayNumber: integer("day_number").notNull(),
  sentAt: timestamp("sent_at"),
  emailMessageId: text("email_message_id"),
  reportData: jsonb("report_data"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertDailyReportSchema = createInsertSchema(dailyReportsTable).omit({
  id: true,
  createdAt: true,
});

export type DailyReport = typeof dailyReportsTable.$inferSelect;
export type InsertDailyReport = z.infer<typeof insertDailyReportSchema>;
