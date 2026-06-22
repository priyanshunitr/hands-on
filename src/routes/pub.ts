import express from "express";
import Redis from "ioredis";
import { Router } from "express";

export const pubRouter = Router();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

pubRouter.post("/publish", async (req, res) => {
    const payload={
        message: req.body.message,
        createdAt: new Date().toISOString()
    }
    try{
        await redis.publish("my_channel", JSON.stringify(payload));
        res.json({ status: "Message published", payload });
    }catch{
        res.status(500).json({ status: "Error publishing message" });
    }
});
