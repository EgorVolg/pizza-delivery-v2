import { Coffeetoppings } from "./coffeetoppings.model";

export const pizzaToppingsRepo = {
  findAll: () => Coffeetoppings.findAll({ raw: true }),
};
