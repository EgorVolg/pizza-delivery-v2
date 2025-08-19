import { Ingredient } from "./ingredient.model";

export const ingredientRepo = {
  findAll: () => Ingredient.findAll({ raw: true }),
};
