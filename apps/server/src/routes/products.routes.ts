import express from "express";
import { Pizza } from "../entities/pizzas/model/pizza.model";
import { Request, Response } from "express";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Pizza.findAll({ raw: true });

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Pizza.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/products", getProducts);
router.get("/products/:id", getProductById);

export default router;
