import { useMemo } from "react";
import type { PizzaCard } from "../../../entities/pizza/model/pizza.types";
import { useGetPizzasQuery } from "../../../entities/pizza/model/pizza.api";
import { useGetIngredientsQuery } from "../../../entities/ingredient/model/ingredient.api";

export const useProcessedPizzas = (): {
  data: PizzaCard[];
  isLoading: boolean;
} => {
  const { data: rawPizzas = [], isLoading } = useGetPizzasQuery();
  const { data: ingredients } = useGetIngredientsQuery();

  const data = useMemo(() => {
    if (!rawPizzas || !ingredients) return [];
    return rawPizzas.map((p) => ({
      id: p.id,
      imageUrl: p.imageUrl,
      createdAt: p.createdAt,
      category_id: p.category_id,
      ingredients: ingredients
        .filter((ing) => p.ingredients.includes(ing.id))
        .map((i) => i.name)
        .join(", "),
      name: p.name,
      popular: p.popular,
      price: p.price,
      rating: p.rating,
      type: p.type.map((t) => (t === 1 ? "Традиционное" : "Тонкое")),
      size: p.size,
    }));
  }, [rawPizzas, ingredients]);

  return { data, isLoading };
};
