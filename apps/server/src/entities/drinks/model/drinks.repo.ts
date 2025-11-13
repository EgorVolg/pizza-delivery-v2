import { Drinks } from "./drinks.modal";

export const drinksRepo = {
  findAll: () => Drinks.findAll({ raw: true }),
};
