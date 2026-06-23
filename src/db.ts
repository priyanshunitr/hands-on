import { Pool } from "pg";

export const pool1 = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "postgresql://admin:password123@localhost:5433/mydb",
});

export const pool2 = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "postgresql://admin:password123@localhost:5434/mydb",
});

export const pool3 = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "postgresql://admin:password123@localhost:5435/mydb",
});



// type DbTime = {
//   now: Date;
// };

// export async function getDbTime(): Promise<DbTime> {
//   const result = await db.query<DbTime>("SELECT NOW()");

//   const row = result.rows[0];

//   if (!row) {
//     throw new Error("No database time returned");
//   }

//   return row;
// }
