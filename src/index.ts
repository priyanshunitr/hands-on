import express from "express";
import { db } from "./db.ts";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello via Bun!");
});

app.get("/db", async (_req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Could not connect to Postgres" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
