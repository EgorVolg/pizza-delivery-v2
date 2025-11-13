import express from "express";
import { Request, Response } from "express";
import { Desserts } from "../entities/desserts/modal/desserts.model";

export const getDesserts = async (_req: Request, res: Response) => {
  try {
    const desserts = await Desserts.findAll();
    res.json(desserts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/desserts", getDesserts);

export default router;
