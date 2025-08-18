import { Pizza } from "../entities/pizzas/model/pizza.model";
import { Request, Response } from "express";

export const getPizzas = async (_req: Request, res: Response) => {
  try {
    const pizzas = await Pizza.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(pizzas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
