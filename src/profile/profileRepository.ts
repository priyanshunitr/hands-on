import { db } from "../db.ts";

export type Profile = {
  id: number;
  user_id: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
};

export type ProfileInput = {
  userId: string;
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
};

export async function ensureProfileTable() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS profiles (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL,
      bio TEXT,
      avatar_url TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function upsertProfile(input: ProfileInput): Promise<Profile> {
  const result = await db.query<Profile>(
    `
      INSERT INTO profiles (user_id, display_name, bio, avatar_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id)
      DO UPDATE SET
        display_name = EXCLUDED.display_name,
        bio = EXCLUDED.bio,
        avatar_url = EXCLUDED.avatar_url,
        updated_at = NOW()
      RETURNING id, user_id, display_name, bio, avatar_url, created_at, updated_at
    `,
    [input.userId, input.displayName, input.bio ?? null, input.avatarUrl ?? null],
  );

  const profile = result.rows[0];

  if (!profile) {
    throw new Error("Profile was not returned after save");
  }

  return profile;
}

export async function getProfileByUserId(userId: string): Promise<Profile | null> {
  const result = await db.query<Profile>(
    `
      SELECT id, user_id, display_name, bio, avatar_url, created_at, updated_at
      FROM profiles
      WHERE user_id = $1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
}

export async function listProfiles(): Promise<Profile[]> {
  const result = await db.query<Profile>(`
    SELECT id, user_id, display_name, bio, avatar_url, created_at, updated_at
    FROM profiles
    ORDER BY created_at DESC
  `);

  return result.rows;
}
