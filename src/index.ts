import express from "express";
import { db, assertDbConnection } from "./db/index.js";
import { usersTable } from "./db/schema.js";
import * as crypto from "crypto";

const app = express();
const port = process.env.PORT || "8080";

assertDbConnection();

app.use(express.json());
app.use(express.static("dist/app"));

// --- NOTELY ROUTES (With the /v1 prefix the frontend expects) ---

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.post("/v1/users", async (req, res) => {
  try {
    const { name } = req.body;
    const id = crypto.randomUUID();
    const apiKey = crypto.randomBytes(32).toString("hex");
    const now = new Date().toISOString();

    const [user] = await db.insert(usersTable).values({
      id,
      createdAt: now,
      updatedAt: now,
      name: name || "Unknown User",
      apiKey: apiKey,
    }).returning();

    res.status(201).json(user);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Couldn't create user" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
