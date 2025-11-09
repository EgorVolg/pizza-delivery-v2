import { RomanPizzas } from "./romanpizzas.model";


export const romanPizzasRepo = {
  findAll: () => RomanPizzas.findAll({ raw: true }),
};
