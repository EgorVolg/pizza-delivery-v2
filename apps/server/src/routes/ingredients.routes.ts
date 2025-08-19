import express from "express";
import { Ingredient } from "../entities/ingredient/model/ingredient.model";
import { Request, Response } from "express"; 

export const getIngredients = async (_req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.json(ingredients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/ingredients", getIngredients);

export default router;
