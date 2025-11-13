import express from "express";
import { Request, Response } from "express";
import { Coffeetoppings } from "../entities/coffeetoppings/modal/coffeetoppings.model";

export const getCoffeeToppings = async (_req: Request, res: Response) => {
  try {
    const coffeetoppings = await Coffeetoppings.findAll({ raw: true });
    res.json(coffeetoppings);
  } catch (err) {
    console.error('Error in getCoffeeToppings:', err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/coffeetoppings", getCoffeeToppings);

export default router;
