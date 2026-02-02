import { Cart_items } from "./cart_items.model";

export const cartItemsRepo = {
  findAll: () => Cart_items.findAll({ raw: true }),
};
