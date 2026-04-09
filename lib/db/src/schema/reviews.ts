import { pgTable, serial, integer, text, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull(),
  platform: text("platform").notNull().default("google"),
  rating: integer("rating").notNull(),
  authorName: text("author_name").notNull(),
  reviewText: text("review_text").notNull(),
  reviewDate: timestamp("review_date").notNull().defaultNow(),
  proposedReplyText: text("proposed_reply_text"),
  replyGeneratedAt: timestamp("reply_generated_at"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviewsTable).omit({
  id: true,
  createdAt: true,
});

export type Review = typeof reviewsTable.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
