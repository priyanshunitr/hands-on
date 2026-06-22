import express from "express";
import { getDbTime } from "./db.ts";
import { testRouter } from "./routes/test.ts";

const app = express();

app.use("/test", testRouter);

app.get("/", (req, res) => {
  res.send("Hello via Bun!");
});

app.get("/db", async (_req, res) => {
  try {
    const time = await getDbTime();

    res.json(time);
  } catch (error) {
    res.status(500).json({ error: "Could not connect to Postgres" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
