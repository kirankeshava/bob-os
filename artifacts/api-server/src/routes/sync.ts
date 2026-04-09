import { Router } from "express";
import { getSyncStatus } from "../services/github-sync";

const router = Router();

router.get("/status", (_req, res) => {
  res.json(getSyncStatus());
});

export default router;
