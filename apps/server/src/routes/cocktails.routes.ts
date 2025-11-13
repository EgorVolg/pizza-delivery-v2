import express from "express";
import { Request, Response } from "express";
import { Cocktails } from "../entities/cocktails/modal/cocktails.model";

export const getCocktails = async (_req: Request, res: Response) => {
  try {
    const coffees = await Cocktails.findAll();
    res.json(coffees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/cocktails", getCocktails);

export default router;
