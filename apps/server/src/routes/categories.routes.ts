import express from "express";
import { Request, Response } from "express";
import { Category } from "../entities/categories/model/categories.model";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({ attributes: ["id", "name"] });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const router = express.Router();
router.get("/categories", getCategories);

export default router;
