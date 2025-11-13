import { Desserts } from "./desserts.model";

export const dessertsRepo = {
  findAll: () => Desserts.findAll({ raw: true }),
};
