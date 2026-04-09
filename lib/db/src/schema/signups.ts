import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const signupsTable = pgTable("signups", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name").notNull(),
  platforms: text("platforms").array().notNull().default([]),
  googleListingUrl: text("google_listing_url"),
  yelpListingUrl: text("yelp_listing_url"),
  planName: text("plan_name"),
  businessId: text("business_id"),
  paymentMethod: text("payment_method").notNull().default("stripe"),
  onboardingTriggered: boolean("onboarding_triggered").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSignupSchema = createInsertSchema(signupsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Signup = typeof signupsTable.$inferSelect;
export type InsertSignup = z.infer<typeof insertSignupSchema>;
