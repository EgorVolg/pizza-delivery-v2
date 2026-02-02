import { Carts } from "./carts.model";

export const cartsRepo = {
  findAll: () => Carts.findAll({ raw: true }),
};
