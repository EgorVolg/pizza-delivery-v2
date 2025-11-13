import { Coffees } from "./coffees.model";

export const coffeesRepo = {
  findAll: () => Coffees.findAll({ raw: true }),
};
