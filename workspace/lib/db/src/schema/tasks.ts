import { pgTable, serial, text, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const tasksTable = pgTable("tasks", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("open"),
  assignedAgent: text("assigned_agent"),
  agentType: text("agent_type"),
  priority: text("priority").notNull().default("medium"),
  estimatedHours: real("estimated_hours"),
  deliverables: text("deliverables"),
  dueDate: text("due_date"),
  lastProgressUpdate: timestamp("last_progress_update"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertTaskSchema = createInsertSchema(tasksTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateTaskSchema = insertTaskSchema.partial().omit({ businessId: true });

export type Task = typeof tasksTable.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
