import express from "express";
import { db, assertDbConnection } from "./db/index.js";
import { usersTable } from "./db/schema.js";
import * as crypto from "crypto";

const app = express();
const port = process.env.PORT || "8080";

// Ensure DB is configured
assertDbConnection();

app.use(express.json());
app.use(express.static("dist/app"));

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    const id = crypto.randomUUID();
    const apiKey = crypto.randomBytes(32).toString("hex");
    const now = new Date().toISOString();

    const [user] = await db.insert(usersTable).values({
      id,
      createdAt: now,
      updatedAt: now,
      name: name || "Unknown",
      apiKey: apiKey,
    }).returning();

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
