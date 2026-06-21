import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to connect to Postgres");
}

export const pool = new Pool({
  connectionString,
});

type DatabaseHealth = {
  database_name: string;
  now: Date;
};

export async function checkDatabase(): Promise<DatabaseHealth> {
  const result = await pool.query<DatabaseHealth>(
    "SELECT current_database() AS database_name, NOW() AS now",
  );

  const [health] = result.rows;

  if (!health) {
    throw new Error("Postgres health query returned no rows");
  }

  return health;
}
