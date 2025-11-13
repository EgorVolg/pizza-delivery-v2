import { Sauces } from "./sauces.model";

export const romanPizzasRepo = {
  findAll: () => Sauces.findAll({ raw: true }),
};
