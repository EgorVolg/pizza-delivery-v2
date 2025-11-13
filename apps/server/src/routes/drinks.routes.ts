import express from "express";
import { Request, Response } from "express";
import { Drinks } from "../entities/drinks/model/drinks.modal";

export const getDrinks = async (_req: Request, res: Response) => {
  try {
    const drinks = await Drinks.findAll();
    res.json(drinks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/drinks", getDrinks);

export default router;
