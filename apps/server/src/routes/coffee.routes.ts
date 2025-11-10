import express from "express"; 
import { Request, Response } from "express";
import { Coffee } from "../entities/coffee/modal/coffee.model";

export const getCoffees = async (_req: Request, res: Response) => {
  try {
    const coffee = await Coffee.findAll();
    res.json(coffee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/coffees", getCoffees);

export default router;
