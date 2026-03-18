import { pgTable, text } from "drizzle-orm/pg-core";

// We export 'users' AND 'usersTable' to satisfy all files
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  name: text("name").notNull(),
  apiKey: text("api_key").notNull(),
});
export const usersTable = users;

export const notes = pgTable("notes", {
  id: text("id").primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  note: text("note").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});
export const notesTable = notes;

// Exporting all possible type names used in your project
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
