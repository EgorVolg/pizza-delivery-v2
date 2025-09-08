import { useEffect, useRef, useState } from "react";
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

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [types, setTypes] = useState<number[]>([]);
  const [ingredients, setIngredients] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number>(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState<number>(MAX_PRICE);
  const [isNew, setIsNew] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetIngredientsQuery();
  const dispatch = useDispatch();
  const filterParams = useSelector((state: RootState) => state.filterParams);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useLockScroll(isOpenFilters && width <= 1440);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpenFilters &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenFilters, toggleMenu]);

  useEffect(() => {
    setIsNew(filterParams.isNew);
    setTypes(filterParams.type);
    setIngredients(filterParams.ingredients);
    setMinPrice(filterParams.price[0] || MIN_PRICE);
    setMaxPrice(filterParams.price[1] || MAX_PRICE);
  }, [filterParams]);

  const toggleIngredient = (id: number) => {
    setIngredients((prev) =>
      prev.includes(id)
        ? prev.filter((ingredientId) => ingredientId !== id)
        : [...prev, id]
    );
  };

  const handleIsNew = (value: boolean) => {
    setIsNew(value);
  };

  const handleSelect = () => {
    dispatch(
      setParams({
        isNew,
        type: types,
        ingredients,
        price: [minPrice, maxPrice],
      })
    );
    toggleMenu();
  };

  const handleReset = () => {
    dispatch(resetParams());
    setIsNew(false);
    setTypes([]);
    setIngredients([]);
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    // Clear localStorage
    localStorage.removeItem('pizza-filters');
    localStorage.removeItem('pizza-active-category');
    toggleMenu();
  };

  const handlePriceChange = (idx: 0 | 1, raw: number) => {
    const parsed = Number(raw);
    const val = isNaN(parsed) ? MIN_PRICE : Math.max(MIN_PRICE, parsed);

    if (idx === 0) {
      setMinPrice(val);
    } else {
      setMaxPrice(val);
    }
  };

  const handleType = (selectedTypeId: number) => {
    setTypes((prevSelectedTypes) => {
      const currentTypeIds = prevSelectedTypes;
      const nextTypeIds =
        currentTypeIds[0] === selectedTypeId ? [] : [selectedTypeId];

      return nextTypeIds;
    });
  };

  return (
    <div
      className={styles.filter_groups}
      data-testid="filters-popup"
      ref={popupRef}
      onClick={(e) => e.stopPropagation()}
    >
      {isLoading && <div className={styles.skeleton} />}

      {!isLoading && (
        <>
          <FilterTop
            onReset={handleReset}
            onClose={toggleMenu}
            showReset={
              types.length > 0 ||
              minPrice !== MIN_PRICE ||
              maxPrice !== MAX_PRICE ||
              ingredients.length > 0 ||
              isNew
            }
          />

          <FilterNew value={isNew} onChange={handleIsNew} />

          <FilterPrice
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChange={handlePriceChange}
          />

          <FilterIngredients
            ingredients={data ?? []}
            selected={ingredients}
            onToggle={toggleIngredient}
          />

          <FilterDough selected={types} onToggle={handleType} />

          <FilterBottom onApply={handleSelect} disabled={minPrice > maxPrice} />
        </>
      )}
    </div>
  );
};
