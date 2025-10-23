import express from "express";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { Appetizers } from "../entities/appetizers/model/appetizers.model";

export const getAppetizers = async (req: Request, res: Response) => {
  try {
    const { isNew, priceFrom, priceTo } = req.query;
    const where: any = {};

    if (isNew === "true") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);

      where.createdAt = { [Op.gte]: monthAgo };
    }

    if (priceFrom && priceTo) {
      where.price = { [Op.between]: [priceFrom, priceTo] };
    }

    const appetizer = await Appetizers.findAll({
      where,
      raw: true,
    });

    res.json(appetizer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAppetizerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appetizer = await Appetizers.findByPk(id);
    if (appetizer) {
      res.json(appetizer);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/appetizers", getAppetizers);
router.get("/appetizers/:id", getAppetizerById);

export default router;
