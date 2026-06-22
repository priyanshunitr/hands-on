import { Router } from "express";

export const testRouter = Router();

testRouter.get("/", (_req, res) => {
  res.json({ message: "Test route works!" });
});
