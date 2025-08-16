import { Category } from "./categories.model";

export const categoryRepo = {
  findAll: () => Category.findAll({ raw: true }),
};
