import { useEffect, useRef, useMemo } from "react";
import type { PizzaCard } from "../../entities/pizza/model/pizza.types";
import { ProductCard } from "../../entities/homepage/ProductCard/ProductCard";
import { ProductsSection } from "../../entities/homepage/ProductsSection/ProductsSection";
import Container from "../../shared/ui/Container/Container";
import Button from "../../shared/ui/Button/Button";
import img from "../../shared/assets/character_no_bg.png";
import { resetParams } from "../Filters/model/filterParams.slice";
import styles from "./ProductsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  useCategoryObserver,
  useScrollToSection,
} from "../../features/homepage/useCategoryObserver";
import { pizzaHalves } from "../../features/homepage/dto/PizzaHalves.const";

export const ProductsList = ({ products, isLoading = false }: any) => {
  const activeId = useSelector((s: RootState) => s.activeId.activeId);
  const dispatch = useDispatch();

  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const { ignoreObserver } = useCategoryObserver({
    data: products,
    sectionRefs,
  });

  const scrollToSection = useScrollToSection();

  useEffect(() => {
    scrollToSection(activeId, sectionRefs, ignoreObserver);
  }, [activeId, scrollToSection]);

  const createSectionRef = (catId: number) => (el: HTMLElement | null) => {
    sectionRefs.current[catId] = el;
  };

  // Группировка и подготовка секций
  const processedSections = useMemo(() => {
    const grouped: Record<number, PizzaCard[]> = {};
    products.forEach((p) => {
      const id = p.category_id ?? 0;
      if (!grouped[id]) grouped[id] = [];
      grouped[id].push(p);
    });

    return Object.entries(grouped).map(([catId, list]) => ({
      catId: +catId,
      pizzas: +catId === 1 ? [pizzaHalves, ...list] : list,
    }));
  }, [products]);

  const sections = processedSections.map(({ catId, pizzas }) => (
    <ProductsSection
      key={catId}
      titleID={catId}
      sectionRef={createSectionRef(catId)}
      products={pizzas}
    />
  ));

  return (
    <>
      {!isLoading && sections.length === 0 ? (
        <Container className={styles.resultsNotFound}>
          <div className={styles.text}>
            <h1>Пиццы не найдены</h1>
            <p>Попробуйте изменить параметры поиска</p>
            <div className={styles.imageContainer}>
              <img src={img} alt="resultsNotFound" />
            </div>
            <div className={styles.buttonsGroup}>
              <Button
                onClick={() => dispatch(resetParams())}
                className={styles.buttonReset}
              >
                Сбросить фильтры
              </Button>

              <Button
                onClick={() => window.location.reload()}
                className={styles.buttonReload}
              >
                Обновить
              </Button>
            </div>
          </div>
        </Container>
      ) : (
        sections
      )}
    </>
  );
};
