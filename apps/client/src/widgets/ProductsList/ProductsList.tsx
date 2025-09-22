import { useEffect, useRef, useMemo } from "react";
import styles from "./ProductsList.module.css";
import { groupByCategory } from "../../features/homepage/model/groupByCategory";
import { getProcessedSections } from "../../features/homepage/model/useSectionGroup";
import { useProcessedPizzas } from "../../features/homepage/model/useProcessedPizzas";
import {
  filterPizzas,
  sortPizzas,
} from "../../features/homepage/model/filterSort";
import { useScrollToSection } from "../../features/homepage/model/scrollToSection";
import { useCategoryObserver } from "../../features/homepage/model/useCategoryObserver";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import img from "../../shared/assets/character_no_bg.png";
import Container from "../../shared/ui/Container/Container";
import Button from "../../shared/ui/Button/Button";
import { resetParams } from "../Filters/model/filterParams.slice";
import { ProductCard } from "../../entities/homepage/ProductCard/ProductCard";
import { ProductsSection } from "../../entities/homepage/ProductsSection/ProductsSection";

export const ProductsList = () => {
  const { data: processedPizzas, isLoading } = useProcessedPizzas();
  const filter = useSelector((s: RootState) => s.filterParams);
  const sort = useSelector((s: RootState) => s.sortParams);

  const filteredAndSortedPizzas = useMemo(() => {
    const filtered = filterPizzas(processedPizzas, filter);
    return sortPizzas(filtered, sort);
  }, [processedPizzas, filter, sort]);

  const grouped = groupByCategory(filteredAndSortedPizzas);
  const activeId = useSelector((s: RootState) => s.setActiveId.activeId);

  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});
  const { ignoreObserver } = useCategoryObserver({
    data: filteredAndSortedPizzas,
    sectionRefs,
  });
  const scrollToSection = useScrollToSection();
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToSection(activeId, sectionRefs, ignoreObserver);
  }, [activeId, scrollToSection]);
  const createSectionRef = (catId: number) => (el: HTMLElement | null) => {
    sectionRefs.current[catId] = el;
  };

  const processedSections = getProcessedSections(grouped);

  const sections = processedSections.map(({ catId, pizzas }) => (
    <ProductsSection
      key={catId}
      titleID={catId}
      sectionRef={createSectionRef(catId)}
      products={
        <>
          {pizzas.map((pizza) => (
            <ProductCard
              key={pizza.id === 0 ? "halves" : pizza.id}
              pizza={pizza}
            />
          ))}
        </>
      }
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
