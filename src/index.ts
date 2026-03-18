import express from "express";
import { db } from "./db/index.js";
import { users, notes } from "./db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
const port = process.env.PORT || "8080";

app.use(express.json());
app.use(express.static("dist/app")); // Serve the frontend

// --- Routes for Notely ---

// 1. Create User
app.post("/users", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.insert(users).values({ 
        email, 
        password,
        name: email.split('@')[0] 
    }).returning();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Could not create user" });
  }
});

// 2. Health Check
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Notely server running on port ${port}`);
});
