import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

const url = process.env.DATABASE_URL;
if (!url) {
    throw new Error("DATABASE_URL is not set");
}

const client = createClient({ url: url });
export const db = drizzle(client, { schema });
