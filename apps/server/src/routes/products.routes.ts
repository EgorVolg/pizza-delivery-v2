import express from "express";
import { Pizza } from "../entities/pizzas/model/pizza.model";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { Appetizers } from "../entities/appetizers/model/appetizers.model";

const router = express.Router();

// Список поддерживаемых категорий и их поля
const CATEGORY_FIELDS: Record<string, string[]> = {
  pizza: ["type", "ingredients", "price", "createdAt"],
  appetizer: ["price", "createdAt"], // нет type и ingredients
};

const buildWhere = (category: "pizza" | "appetizer", query: any) => {
  const where: any = {};
  const fields = CATEGORY_FIELDS[category];

  if (query.isNew === "true" && fields.includes("created_at")) {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    where.created_at = { [Op.gte]: monthAgo };
  }

  if (query.priceFrom && query.priceTo && fields.includes("price")) {
    where.price = { [Op.between]: [query.priceFrom, query.priceTo] };
  }

  if (query.type && fields.includes("type")) {
    const typeNum = Number(query.type);
    where.type = { [Op.contains]: [typeNum] };
  }

  if (query.ingredients && fields.includes("ingredients")) {
    const ingredientIds = (query.ingredients as string)
      .split(",")
      .map(Number)
      .filter(Boolean);
    if (ingredientIds.length > 0) {
      where.ingredients = { [Op.contains]: ingredientIds };
    }
  }

  return where;
};

// GET /products — возвращает все продукты
router.get("/products", async (req: Request, res: Response) => {
  try {
    const [pizzas, appetizers] = await Promise.all([
      Pizza.findAll({ where: buildWhere("pizza", req.query), raw: true }),
      Appetizers.findAll({
        where: buildWhere("appetizer", req.query),
        raw: true,
      }),
    ]);

    const products = [
      ...pizzas.map((item) => ({ ...item, category: "pizza" })),
      ...appetizers.map((item) => ({ ...item, category: "appetizer" })),
    ];

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /products/:id — возвращает продукт по id
router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product =
      (await Pizza.findByPk(id)) || (await Appetizers.findByPk(id));

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
