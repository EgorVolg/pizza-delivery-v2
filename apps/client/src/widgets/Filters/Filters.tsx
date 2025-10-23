import { useEffect, useState } from "react";
import styles from "./Filters.module.css";
import { MAX_PRICE, MIN_PRICE } from "./model/filter.const";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useDispatch, useSelector } from "react-redux";
import { useLockScroll } from "../../shared/hooks/useLockScroll";
import { resetParams, setParams } from "./model/filterParams.slice";
import type { RootState } from "../../app/store";
import { FilterTop } from "../../entities/filters/components/FilterTop";
import { FilterNew } from "../../entities/filters/components/FilterNew";
import { FilterPrice } from "../../entities/filters/components/FilterPrice";
import { FilterIngredients } from "../../entities/filters/components/FilterIngredients";
import { FilterDough } from "../../entities/filters/components/FilterDough";
import { FilterBottom } from "../../entities/filters/components/FilterBottom";

type FilterState = {
  isNew: boolean;
  type: number[];
  ingredients: number[];
  price: [number, number];
};

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState<FilterState>({
    isNew: false,
    type: [],
    ingredients: [],
    price: [MIN_PRICE, MAX_PRICE],
  });

  const { data, isLoading } = useGetIngredientsQuery();
  const dispatch = useDispatch();
  const filterParams = useSelector((state: RootState) => state.filterParams);

  // Синхронизация с глобальным состоянием фильтров
  useEffect(() => {
    const [paramMin, paramMax] = filterParams.price;
    
    setFilters({
      isNew: filterParams.isNew,
      type: filterParams.type,
      ingredients: filterParams.ingredients,
      price: [paramMin ?? MIN_PRICE, paramMax ?? MAX_PRICE],
    });
  }, [filterParams]);

  // Отслеживание ресайза
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLockScroll(isOpenFilters && width <= 1440);

  // Изменение отдельных параметров
  const setIsNew = (value: boolean) =>
    setFilters((f) => ({ ...f, isNew: value }));

  const toggleIngredient = (id: number) =>
    setFilters((f) => ({
      ...f,
      ingredients: f.ingredients.includes(id)
        ? f.ingredients.filter((i) => i !== id)
        : [...f.ingredients, id],
    }));

  const handleType = (id: number) =>
    setFilters((f) => ({ ...f, type: f.type[0] === id ? [] : [id] }));

  const handlePriceChange = (idx: 0 | 1, value: number) =>
    setFilters((f) => {
      const val = Math.max(MIN_PRICE, Number(value) || MIN_PRICE);
      const price: [number, number] = [...f.price] as [number, number];
      price[idx] = val;
      return { ...f, price };
    });

  const handleReset = () => {
    dispatch(resetParams());
    setFilters({
      isNew: false,
      type: [],
      ingredients: [],
      price: [MIN_PRICE, MAX_PRICE],
    });
    toggleMenu();
  };

  const handleApply = () => {
    dispatch(setParams(filters));
    toggleMenu();
  };

  const { isNew, type, ingredients, price } = filters;

  return (
    <div
      className={styles.filter_groups}
      data-testid="filters-popup"
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading && <div className={styles.skeleton} />}
      {!isLoading && (
        <>
          <FilterTop
            onReset={handleReset}
            showReset={
              type.length > 0 ||
              ingredients.length > 0 ||
              isNew ||
              price[0] !== MIN_PRICE ||
              price[1] !== MAX_PRICE
            }
          />
          <FilterNew value={isNew} onChange={setIsNew} />
          <FilterPrice
            minPrice={price[0]}
            maxPrice={price[1]}
            onChange={handlePriceChange}
          />
          <FilterIngredients
            ingredients={data ?? []}
            selected={ingredients}
            onToggle={toggleIngredient}
          />
          <FilterDough selected={type} onToggle={handleType} />
          <FilterBottom onApply={handleApply} disabled={price[0] > price[1]} />
        </>
      )}
    </div>
  );
};
