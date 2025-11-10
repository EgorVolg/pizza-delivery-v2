import { Coffee } from "./coffee.model";

export const coffeeRepo = {
  findAll: () => Coffee.findAll({ raw: true }),
};
