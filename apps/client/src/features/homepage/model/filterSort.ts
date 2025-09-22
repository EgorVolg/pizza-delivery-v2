import type { FilterStateParams } from "../../../widgets/Filters/model/filter.dto";
import type { PizzaCard } from "../../../entities/pizza/model/pizza.types";

export function filterPizzas(
  list: PizzaCard[],
  filter: FilterStateParams
): PizzaCard[] {
  return list
    .filter(
      (p) =>
        !filter.ingredients.length ||
        p.ingredientsIds.some((id) => filter.ingredients.includes(id))
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
    .filter((p) => !filter.type.length || filter.type.some(ft => p.type.includes(ft === 1 ? "Тонкое" : "традиционное")));
}

export function sortPizzas(list: PizzaCard[], sort: string): PizzaCard[] {
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
