import { Pizza } from "./pizza.model";

export const pizzasRepo = {
  findAll: () => Pizza.findAll({ raw: true }),
};
