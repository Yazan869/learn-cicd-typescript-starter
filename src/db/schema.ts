import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  name: text("name").notNull(),
  apiKey: text("api_key").notNull(),
});

export const notes = pgTable("notes", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  note: text("note").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});
