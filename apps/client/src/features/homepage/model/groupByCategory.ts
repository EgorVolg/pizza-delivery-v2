import type { PizzaAPI } from "../../../entities/pizza/model/pizza.types";

export function groupByCategory(list: PizzaAPI[]): Record<number, PizzaAPI[]> {
  return list.reduce<Record<number, PizzaAPI[]>>((acc, p) => {
    const id = p.category_id ?? 0;
    (acc[id] ||= []).push(p);
    return acc;
  }, {});
}
