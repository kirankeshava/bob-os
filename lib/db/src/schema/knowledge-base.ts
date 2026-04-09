import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const knowledgeBaseEntriesTable = pgTable("knowledge_base_entries", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  entryType: text("entry_type").notNull().$type<"file" | "url">(),
  sourceName: text("source_name").notNull(),
  sourceUrl: text("source_url"),
  rawText: text("raw_text").notNull().default(""),
  status: text("status").notNull().default("processing").$type<"processing" | "ready" | "error">(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertKnowledgeBaseEntrySchema = createInsertSchema(knowledgeBaseEntriesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type KnowledgeBaseEntry = typeof knowledgeBaseEntriesTable.$inferSelect;
export type InsertKnowledgeBaseEntry = z.infer<typeof insertKnowledgeBaseEntrySchema>;
