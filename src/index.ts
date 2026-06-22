import express from "express";
import { getDbTime } from "./db.ts";
import { testRouter } from "./routes/test.ts";
import { pubRouter } from "./routes/pub.ts";

const app = express();

app.use("/test", testRouter);
app.use("/pub", pubRouter);

app.get("/", (_req, res) => {
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
