import { categoryRepo } from "../entities/categories/model/categories.repo";

export const listCategories = async (_req, res, next) => {
  try {
    const categories = await categoryRepo.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};
