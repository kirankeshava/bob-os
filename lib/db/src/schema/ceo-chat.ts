import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ceoChatMessagesTable = pgTable("ceo_chat_messages", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCeoChatMessageSchema = createInsertSchema(ceoChatMessagesTable).omit({
  id: true,
  createdAt: true,
});

export type CeoChatMessage = typeof ceoChatMessagesTable.$inferSelect;
export type InsertCeoChatMessage = z.infer<typeof insertCeoChatMessageSchema>;
