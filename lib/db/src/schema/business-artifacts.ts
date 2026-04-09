import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";
import { tasksTable } from "./tasks";

export const businessArtifactsTable = pgTable("business_artifacts", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull().references(() => businessesTable.id, { onDelete: "cascade" }),
  taskId: integer("task_id").references(() => tasksTable.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  artifactType: text("artifact_type").notNull().default("document"),
  agentType: text("agent_type"),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertBusinessArtifactSchema = createInsertSchema(businessArtifactsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type BusinessArtifact = typeof businessArtifactsTable.$inferSelect;
export type InsertBusinessArtifact = z.infer<typeof insertBusinessArtifactSchema>;
