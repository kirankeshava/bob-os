import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const businessSitesTable = pgTable("business_sites", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().unique().references(() => businessesTable.id, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline"),
  heroTitle: text("hero_title"),
  heroSubtitle: text("hero_subtitle"),
  services: jsonb("services").$type<{ title: string; description: string; icon?: string }[]>(),
  pricing: jsonb("pricing").$type<{ name: string; price: string; description: string; features: string[] }[]>(),
  howItWorks: jsonb("how_it_works").$type<{ step: number; title: string; description: string }[]>(),
  emailInboxId: text("email_inbox_id"),
  emailAddress: text("email_address"),
  contactEmail: text("contact_email"),
  accentColor: text("accent_color").default("#6366f1"),
  published: boolean("published").default(false).notNull(),
  generatedAt: timestamp("generated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBusinessSiteSchema = createInsertSchema(businessSitesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateBusinessSiteSchema = insertBusinessSiteSchema.partial();

export type BusinessSite = typeof businessSitesTable.$inferSelect;
export type InsertBusinessSite = z.infer<typeof insertBusinessSiteSchema>;
