import { pgTable, text } from "drizzle-orm/pg-core";

// We export BOTH names to fix all 10 errors
export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  name: text("name").notNull(),
  apiKey: text("api_key").notNull(),
});
export const users = usersTable; 

export const notesTable = pgTable("notes", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  note: text("note").notNull(),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
});
export const notes = notesTable;

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type Note = typeof notesTable.$inferSelect;
export type NewNote = typeof notesTable.$inferInsert;
