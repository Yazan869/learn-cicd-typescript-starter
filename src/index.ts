import express from "express";
import { db, assertDbConnection } from "./db/index.js";
import { users } from "./db/schema.js";
import { randomUUID, randomBytes } from "crypto";

const app = express();
const port = process.env.PORT || "8080";

app.use(express.json());
app.use(express.static("dist/app"));

app.get("/healthz", (req, res) => res.status(200).send("OK"));

// --- Notely Route ---
app.post("/v1/users", async (req, res) => {
  try {
    assertDbConnection();
    const { name } = req.body;
    
    const newUser = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: name || "Unknown",
      apiKey: randomBytes(32).toString("hex"),
    };

    const [user] = await db.insert(users).values(newUser).returning();
    res.status(201).json(user);
  } catch (err: any) {
    // This will print the REAL error to the browser so we can see it
    console.error("DEBUG DB ERROR:", err.message);
    res.status(500).json({ error: err.message || "Database Error" });
  }
});

app.listen(port, () => console.log(`Notely running on ${port}`));
