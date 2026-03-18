import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

const url = process.env.DATABASE_URL;

export function assertDbConnection() {
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
}

// Initialize the client only if the URL exists to prevent crashes during build
const client = createClient({ url: url || "libsql://dummy-url" });
export const db = drizzle(client, { schema });
