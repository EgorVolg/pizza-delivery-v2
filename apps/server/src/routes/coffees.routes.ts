import express from "express";
import { Request, Response } from "express";
import { Coffees } from "../entities/coffees/modal/coffees.model";

export const getCoffees = async (_req: Request, res: Response) => {
  try {
    const coffees = await Coffees.findAll();
    res.json(coffees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/coffees", getCoffees);

export default router;
