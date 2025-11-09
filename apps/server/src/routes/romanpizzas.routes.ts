import express from "express";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { RomanPizzas } from "../entities/romanpizzas/modal/romanpizzas.model";

export const getRomanPizzas = async (req: Request, res: Response) => {
  try {
    const { isNew, priceFrom, priceTo, ingredients } = req.query;
    const where: any = {};

    if (isNew === "true") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      where.createdAt = { [Op.gte]: monthAgo };
    }

    if (priceFrom && priceTo) {
      where.price = { [Op.between]: [priceFrom, priceTo] };
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

    const romanpizzas = await RomanPizzas.findAll({
      where,
      raw: true,
    });

    res.json(romanpizzas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getRomanPizzasById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const romanpizza = await RomanPizzas.findByPk(id);
    if (romanpizza) {
      const romanpizza = await RomanPizzas.findByPk(id);
      res.json(romanpizza);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/romanPizzas", getRomanPizzas);
router.get("/romanPizzas/:id", getRomanPizzasById);

export default router;
