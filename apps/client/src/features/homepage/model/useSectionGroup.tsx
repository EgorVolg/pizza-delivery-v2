import { ProductCard } from "../../../entities/homepage/ProductCard/ProductCard";
import { ProductsSection } from "../../../entities/homepage/ProductsSection/ProductsSection";
import type { PizzaAPI } from "../../../entities/pizza/model/pizza.types";
import { pizzaHalves } from "./PizzaHalves.const";

export const Sections = ({
  grouped,
  createSectionRef,
  ingredients,
}: {
  grouped: Record<number, PizzaAPI[]>;
  createSectionRef: (id: number) => React.Ref<HTMLHeadingElement>;
  ingredients: { id: string; name: string }[] | undefined;
}) => {
  return Object.entries(grouped).map(([catId, list]) => {
    const cards = list.map((p) => {
      const names = ingredients
        ?.filter((ing) => p.ingredients.includes(+ing.id))
        .map((i) => i.name)
        .join(", ");

      return <ProductCard key={p.id} pizza={{ ...p, ingredients: names }} />;
    });

    if (+catId === 1) {
      cards.unshift(
        <ProductCard
          key="halves"
          pizza={{ ...pizzaHalves, ingredients: pizzaHalves.ingredients }}
        />
      );
    }

    return (
      <ProductsSection
        key={catId}
        titleID={+catId}
        sectionRef={createSectionRef(+catId)}
        products={<>{cards}</>}
      />
    );
  });
};
