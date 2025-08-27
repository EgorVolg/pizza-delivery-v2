import styles from "./ui/Filters.module.css";
import { useEffect, useRef, useState } from "react";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useDispatch } from "react-redux";
import { useLockScroll } from "../../shared/hooks/useLockScroll";
import { type FilterStateParams } from "./model/filter.dto";
import { initialFilterParamsState, setParams } from "./model/filterParamsSlice";
import { MAX_PRICE, MIN_PRICE, typesOfDough } from "./model/filter.const";
import { FilterTop } from "./components/FilterTop";
import { FilterNew } from "./components/FilterNew";
import { FilterPrice } from "./components/FilterPrice";
import { FilterDough } from "./components/FilterDough";
import { FilterIngredients } from "./components/FilterIngredients";
import { FilterBottom } from "./components/FilterBottom";

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const [count, setCount] = useState<FilterStateParams>(
    initialFilterParamsState
  );
  const popupRef = useRef<HTMLUListElement>(null);
  const { data: ingredients } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const handleType = (selectedTypeId: number) => {
    setCount((prevState) => {
      const currentTypeIds = prevState.type ?? [];
      const nextTypeIds =
        currentTypeIds[0] === selectedTypeId ? [] : [selectedTypeId];

      return { ...prevState, type: nextTypeIds };
    });
  };

  const width = window.innerWidth;

  useLockScroll(width > 1440 ? false : isOpenFilters);

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

  const toggleIngredient = (id: number) => {
    setCount((prevState) => {
      const currentIngredients = prevState.ingredients ?? [];
      const nextIngredients = currentIngredients.includes(id)
        ? currentIngredients.filter((ingredientId) => ingredientId !== id)
        : [...currentIngredients, id];

      return { ...prevState, ingredients: nextIngredients };
    });
  };

  const handleIsNew = (value: true | false) => {
    setCount((prev) => ({
      ...prev,
      isNew: value,
    }));
  };

  const handleSelect = () => {
    dispatch(
      setParams({
        ...count,
        price: [count.price?.[0] || MIN_PRICE, count.price?.[1] || MAX_PRICE],
      })
    );
    toggleMenu();
  };

  const handleReset = () => {
    dispatch(setParams(initialFilterParamsState));
    setCount(initialFilterParamsState);
    toggleMenu();
  };

  const handlePriceChange = (idx: 0 | 1, raw: number) => {
    const price = count.price ?? []; 
    const maxVal = price[1] ?? MAX_PRICE;
    const parsed = Number(raw);
    const val = isNaN(parsed)
      ? MIN_PRICE
      : Math.max(MIN_PRICE, Math.min(parsed, MAX_PRICE));

    setCount((prev) => {
      const nextPrice: [number, number] = (() => {
        const [min = MIN_PRICE, max = maxVal] = prev.price ?? [];
        return idx === 0 ? [val, max] : [min, val];
      })();

      return { ...prev, price: nextPrice };
    });
  };

  const isShow =
    count.type.length > 0 ||
    count.price.length > 0 ||
    count.price[1] === 0 ||
    count.ingredients.length > 0 ||
    count.isNew === true
      ? true
      : false;

  return (
    <div className={styles.filter_groups}>
      <FilterTop
        onReset={handleReset}
        onClose={toggleMenu}
        showReset={isShow}
      />

      <FilterNew value={count.isNew} onChange={handleIsNew} />

      <FilterPrice value={count.price ?? []} onChange={handlePriceChange} />

      <FilterIngredients
        ingredients={ingredients ?? []}
        selected={count.ingredients}
        onToggle={toggleIngredient}
      />

      <FilterDough
        types={typesOfDough}
        selected={count.type ?? []}
        onToggle={handleType}
      />

      <FilterBottom onApply={handleSelect} />
    </div>
  );
};
