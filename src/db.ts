import { Pool } from "pg";

export const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "postgresql://admin:password123@localhost:5432/mydb",
});
