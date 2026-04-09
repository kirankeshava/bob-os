import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const skillsTable = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  source: text("source").notNull(),
  description: text("description").notNull().default(""),
  content: text("content").notNull().default(""),
  status: text("status").notNull().default("active"),
  businessId: integer("business_id"),
  installedAt: timestamp("installed_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSkillSchema = createInsertSchema(skillsTable).omit({
  id: true,
  installedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const updateSkillSchema = insertSkillSchema.partial().omit({ slug: true, source: true });

export type Skill = typeof skillsTable.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
