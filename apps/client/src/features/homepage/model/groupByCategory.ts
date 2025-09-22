import type { PizzaCard } from "../../../entities/pizza/model/pizza.types";

export function groupByCategory(list: PizzaCard[]): Record<number, PizzaCard[]> {
  return list.reduce<Record<number, PizzaCard[]>>((acc, p) => {
    const id = p.category_id ?? 0;
    (acc[id] ||= []).push(p);
    return acc;
  }, {});
}
