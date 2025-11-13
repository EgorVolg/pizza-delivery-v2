import express from "express";
import { Pizza } from "../entities/pizzas/model/pizza.model";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { RomanPizzas } from "../entities/romanpizzas/modal/romanpizzas.model";
import { Appetizers } from "../entities/appetizers/model/appetizers.model";
import { Coffees } from "../entities/coffees/modal/coffees.model";

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
    const { id, categoryId } = req.params;

    if (!id || !categoryId) {
      return res.status(400).json({ error: "Missing id or categoryId" });
    }

    const categoryNum = Number(categoryId);
    const productId = Number(id);

    // === Определяем таблицу по категории ===
    let Model;
    switch (categoryNum) {
      case 1:
        Model = Pizza;
        break;
      case 2:
        Model = RomanPizzas;
        break;
      case 3:
        Model = Appetizers;
        break;
      // case 4:
      //   Model = Сocktails;
      //   break;
      case 5:
        Model = Coffees;
        break;
      default:
        return res.status(400).json({ error: "Unknown categoryId" });
    }

    // === Выполняем запрос ===
    const product = await Model.findOne({
      where: { id: productId },
      raw: true,
    });

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
router.get("/products/:categoryId/:id", getProductById);

export default router;
