import type { PizzaCard } from "../../../entities/pizza/model/pizza.types";
import { pizzaHalves } from "./PizzaHalves.const";

export const getProcessedSections = (
  grouped: Record<number, PizzaCard[]>
): { catId: number; pizzas: PizzaCard[] }[] => {
  return Object.entries(grouped).map(([catId, list]) => {
    const pizzaList = +catId === 1 ? [pizzaHalves, ...list] : list;

    return {
      catId: +catId,
      pizzas: pizzaList,
    };
  });
};
