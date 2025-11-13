import { Cocktails } from "./cocktails.model";

export const cocktailsRepo = {
  findAll: () => Cocktails.findAll({ raw: true }),
};
