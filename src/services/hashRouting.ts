import { pool1, pool2, pool3 } from "../db";
import {ConsistentHashRing} from "./hashing";
import { Pool } from "pg";

type ShardName =
  | "postgres-1"
  | "postgres-2"
  | "postgres-3";

  const shards: Record<ShardName, Pool> = {
  "postgres-1": pool1,
  "postgres-2": pool2,
  "postgres-3": pool3,
};

// const shards = {
//   "postgres-1": pool1,
//   "postgres-2": pool2,
//   "postgres-3": pool3,
// };

const ring = new ConsistentHashRing<ShardName>();
ring.addNode("postgres-1");
ring.addNode("postgres-2");
ring.addNode("postgres-3");

// Determines which shard should handle a given user ID.
function getShard(userId: string): ShardName {
  return ring.getNode(userId);
}

export async function queryUser(userId: string) {
  const shard = getShard(userId);
  const pool = shards[shard];
  return pool.query("SELECT * FROM users WHERE id = $1", [userId]);
}
