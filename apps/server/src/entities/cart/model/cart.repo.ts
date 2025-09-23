import { Cart } from "./cart.model";

export const cartRepo = {
  findAll: () => Cart.findAll({ raw: true }),
};
