import express from "express";
import { Pizza } from "../entities/pizzas/model/pizza.model";
import { Request, Response } from "express";
import { Op } from "sequelize";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { isNew, priceFrom, priceTo, type, ingredients } = req.query;
    const where: any = {};

    if (isNew === "true") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      where.createdAt = { [Op.gte]: monthAgo };
    }

    if (priceFrom && priceTo) {
      where.price = { [Op.between]: [priceFrom, priceTo] };
    }

    if (type) {
      const typeNum = Number(type);
      where.type = { [Op.contains]: [typeNum] };
    }

    if (ingredients) {
      const ingredientIds = (ingredients as string)
        .split(",")
        .map(Number)
        .filter(Boolean);

      if (ingredientIds.length > 0) {
        where.ingredients = { [Op.contains]: ingredientIds };
      }
    }

    const products = await Pizza.findAll({
      where,
      raw: true,
    });

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
