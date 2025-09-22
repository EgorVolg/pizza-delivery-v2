import express from "express"; 
import { Request, Response } from "express";
import { PizzaToppings } from "../entities/pizzatoppings/model/pizzatoppings.model";

export const getPizzaToppings = async (_req: Request, res: Response) => {
  try {
    const pizzatoppings = await PizzaToppings.findAll({ raw: true });
    res.json(pizzatoppings);
  } catch (err) {
    console.error('Error in getPizzaToppings:', err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/pizzatoppings", getPizzaToppings);

export default router;
