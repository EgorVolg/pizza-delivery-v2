import { useEffect, useRef } from "react";
import { groupByCategory } from "../../features/homepage/model/groupByCategory";
import { Sections } from "../../features/homepage/model/useSectionGroup";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useFilteredPizzas } from "../../features/homepage/model/useFilteredPizza";
import { useScrollToSection } from "../../features/homepage/model/scrollToSection";
import { useCategoryObserver } from "../../features/homepage/model/useCategoryObserver";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { ProductsSection } from "../../entities/homepage/ProductsSection/ProductsSection";
import ProductCardSkeleton from "../../entities/homepage/ProductCard/ProductCard.Skeleton";
import styles from "./ProductsList.module.css";

export const ProductsList = () => {
  const { data: pizzas, isLoading: isLoadingPizzas } = useFilteredPizzas();
  const grouped = groupByCategory(pizzas);
  const activeId = useSelector((s: RootState) => s.setActiveId.activeId);

  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const { ignoreObserver } = useCategoryObserver({ data: pizzas, sectionRefs });
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    scrollToSection(activeId, sectionRefs, ignoreObserver);
  }, [activeId, scrollToSection]);
  const createSectionRef = (catId: number) => (el: HTMLElement | null) => {
    sectionRefs.current[catId] = el;
  };
  
  const { data: ingredients, isLoading: isLoadingIngr } =
    useGetIngredientsQuery();

  const sections = Sections({ grouped, createSectionRef, ingredients });

  return (
    <>
      {isLoadingPizzas ||
        (isLoadingIngr && (
          <ProductsSection
            products={[...Array(6)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          />
        ))}

      {!isLoadingPizzas && sections.length === 0 ? (
        <>Нет пицц по выбранным фильтрам 😕</>
      ) : (
        sections
      )}
    </>
  );
};
