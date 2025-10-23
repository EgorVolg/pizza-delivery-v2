import { Appetizers } from "./appetizers.model";

export const appetizersRepo = {
  findAll: () => Appetizers.findAll({ raw: true }),
};
