import express from "express";
import { checkDatabase, pool } from "./db.ts";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.get("/", (req, res) => {
  res.send("Hello via Bun! Try GET /health/db to verify Postgres.");
});

app.get("/health/db", async (_req, res, next) => {
  try {
    const health = await checkDatabase();

    res.json({
      status: "ok",
      database: health.database_name,
      time: health.now,
    });
  } catch (error) {
    next(error);
  }
});

const errorHandler: express.ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  res.status(500).json({
    status: "error",
    message: error instanceof Error ? error.message : "Unexpected error",
  });
};

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

async function shutdown() {
  await pool.end();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
