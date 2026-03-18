import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

const url = process.env.DATABASE_URL;

export function assertDbConnection() {
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
}

// Satisfy both my code and any other files
const client = createClient({ url: url || "libsql://dummy-url" });
export const db = drizzle(client, { schema });
export const database = db;
