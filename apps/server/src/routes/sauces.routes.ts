import express from "express";
import { Request, Response } from "express";
import { Sauces } from "../entities/sauces/model/sauces.model";

export const getSauces = async (_req: Request, res: Response) => {
  try {
    const sauces = await Sauces.findAll({ raw: true });
    res.json(sauces);
  } catch (err) {
    console.error('Error in getPizzaToppings:', err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/sauces", getSauces);

export default router;
