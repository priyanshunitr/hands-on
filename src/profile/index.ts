import "dotenv/config";
import express from "express";
import { ensureProfileTable } from "./profileRepository.ts";
import { profilesRouter } from "./routes/profiles.ts";

const app = express();
const port = Number(process.env.PROFILE_SERVICE_PORT ?? 3001);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ service: "profile", status: "ok" });
});

app.use("/profiles", profilesRouter);

async function main() {
  await ensureProfileTable();

  app.listen(port, () => {
    console.log(`Profile service is running on http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error("Could not start profile service", error);
  process.exit(1);
});
