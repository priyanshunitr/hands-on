import { Router } from "express";
import {
  getProfileByUserId,
  listProfiles,
  type Profile,
  upsertProfile,
} from "../profileRepository.ts";

export const profilesRouter = Router();

function toOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function serializeProfile(profile: Profile) {
  return {
    id: profile.id,
    userId: profile.user_id,
    displayName: profile.display_name,
    bio: profile.bio,
    avatarUrl: profile.avatar_url,
    createdAt: profile.created_at.toISOString(),
    updatedAt: profile.updated_at.toISOString(),
  };
}

profilesRouter.get("/", async (_req, res) => {
  try {
    const profiles = await listProfiles();
    res.json({ profiles: profiles.map(serializeProfile) });
  } catch (error) {
    console.error("Could not list profiles", error);
    res.status(500).json({ error: "Could not list profiles" });
  }
});

profilesRouter.get("/:userId", async (req, res) => {
  try {
    const profile = await getProfileByUserId(req.params.userId);

    if (!profile) {
      res.status(404).json({ error: "Profile not found" });
      return;
    }

    res.json({ profile: serializeProfile(profile) });
  } catch (error) {
    console.error("Could not get profile", error);
    res.status(500).json({ error: "Could not get profile" });
  }
});

profilesRouter.post("/", async (req, res) => {
  const userId = toOptionalString(req.body.userId);
  const displayName = toOptionalString(req.body.displayName);

  if (!userId || !displayName) {
    res.status(400).json({ error: "userId and displayName are required" });
    return;
  }

  try {
    const profile = await upsertProfile({
      userId,
      displayName,
      bio: toOptionalString(req.body.bio),
      avatarUrl: toOptionalString(req.body.avatarUrl),
    });

    res.status(201).json({ profile: serializeProfile(profile) });
  } catch (error) {
    console.error("Could not save profile", error);
    res.status(500).json({ error: "Could not save profile" });
  }
});
