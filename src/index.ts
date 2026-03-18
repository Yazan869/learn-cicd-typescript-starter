import express from "express";
import { db } from "./db/index.js";
import { usersTable } from "./db/schema.js";
import { randomUUID, randomBytes } from "crypto";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("dist/app"));

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.post("/v1/users", async (req, res) => {
  try {
    const { name } = req.body;
    const id = randomUUID();
    const apiKey = randomBytes(32).toString("hex");
    const now = new Date().toISOString();

    const [user] = await db.insert(usersTable).values({
      id: id,
      createdAt: now,
      updatedAt: now,
      name: name || "Unknown",
      apiKey: apiKey,
    }).returning();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Couldn't create user" });
  }
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
