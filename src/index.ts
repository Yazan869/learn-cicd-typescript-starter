import express from "express";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import * as crypto from "crypto";

const app = express();
const port = process.env.PORT || "8080";

app.use(express.json());
app.use(express.static("dist/app"));

// --- Notely Signup Route ---
app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    // Generate a random API key for the new user
    const apiKey = crypto.randomBytes(32).toString("hex");

    const [user] = await db.insert(users).values({
      name: name || "Unknown User",
      apiKey: apiKey,
    } as any).returning();

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Could not create user" });
  }
});

// --- Health Check ---
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Notely server running on port ${port}`);
});
