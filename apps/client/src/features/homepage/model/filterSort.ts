import type { FilterStateParams } from "../../../widgets/Filters/model/filter.dto";
import type { PizzaAPI } from "../../../entities/pizza/model/pizza.types";

 

export function filterPizzas(
  list: PizzaAPI[],
  filter: FilterStateParams
): PizzaAPI[] {
  return list
    .filter(
      (p) =>
        !filter.ingredients.length ||
        p.ingredients.some((id) => filter.ingredients.includes(id))
    )
    .filter(
      (p) =>
        !filter.price.length ||
        (p.price >= filter.price[0] && p.price <= filter.price[1])
    )
    .filter(
      (p) =>
        !filter.isNew ||
        (Date.now() - new Date(p.createdAt).getTime()) /
          (1000 * 60 * 60 * 24) <=
          3
    )
    .filter((p) => !filter.type.length || p.type.includes(filter.type[0]));
}

export function sortPizzas(list: PizzaAPI[], sort: string): PizzaAPI[] {
  const copy = [...list];
  switch (sort) {
    case "рейтингу":
      return copy.sort((a, b) => b.rating - a.rating);
    case "популярности":
      return copy.sort((a, b) => b.popular - a.popular);
    case "цене":
      return copy.sort((a, b) => a.price - b.price);
    case "алфавиту":
      return copy.sort((a, b) => a.name.localeCompare(b.name, "ru"));
    default:
      return copy;
  }
}
