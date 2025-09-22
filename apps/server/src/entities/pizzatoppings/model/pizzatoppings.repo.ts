import { PizzaToppings } from "./pizzatoppings.model";

export const pizzaToppingsRepo = {
  findAll: () => PizzaToppings.findAll({ raw: true }),
};
