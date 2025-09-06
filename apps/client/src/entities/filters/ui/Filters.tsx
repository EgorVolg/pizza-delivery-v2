import { useEffect, useRef, useState } from "react";
import styles from "./Filters.module.css";
import { MAX_PRICE, MIN_PRICE } from "../model/filter.const";
import { useGetIngredientsQuery } from "../../../entities/ingredient/model/ingredient.api";
import { useDispatch } from "react-redux";
import { useLockScroll } from "../../../shared/hooks/useLockScroll";
import {
  initialFilterParamsState,
  setParams,
} from "../model/filterParams.slice";
import { FilterTop } from "../components/FilterTop";
import { FilterNew } from "../components/FilterNew";
import { FilterPrice } from "../components/FilterPrice";
import { FilterIngredients } from "../components/FilterIngredients";
import { FilterDough } from "../components/FilterDough";
import { FilterBottom } from "../components/FilterBottom";

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  const [isNew, setIsNew] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const popupRef = useRef<HTMLUListElement>(null);
  const { data: ingredients } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const handleType = (selectedTypeId: number) => {
    setSelectedTypes((prevSelectedTypes) => {
      const currentTypeIds = prevSelectedTypes;
      const nextTypeIds =
        currentTypeIds[0] === selectedTypeId ? [] : [selectedTypeId];

      return nextTypeIds;
    });
  };

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

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) =>
      prev.includes(id)
        ? prev.filter((ingredientId) => ingredientId !== id)
        : [...prev, id]
    );
  };

  const handleIsNew = (value: true | false) => {
    setIsNew(value);
  };

  const priceValid =
    minPrice <= maxPrice && minPrice >= MIN_PRICE && maxPrice <= MAX_PRICE;

  const handleSelect = () => {
    if (!priceValid) return;
    dispatch(
      setParams({
        isNew: isNew,
        type: selectedTypes,
        ingredients: selectedIngredients,
        price: [minPrice || MIN_PRICE, maxPrice || MAX_PRICE],
      })
    );
    toggleMenu();
  };

  const handleReset = () => {
    dispatch(setParams(initialFilterParamsState));
    setIsNew(false);
    setSelectedTypes([]);
    setSelectedIngredients([]);
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
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

  const isShow =
    selectedTypes.length > 0 ||
    minPrice !== MIN_PRICE ||
    maxPrice !== MAX_PRICE ||
    selectedIngredients.length > 0 ||
    isNew;

  return (
    <div
      className={styles.filter_groups}
      data-testid="filters-popup"
      ref={popupRef}
      onClick={(e) => e.stopPropagation()}
    >
      <FilterTop
        onReset={handleReset}
        onClose={toggleMenu}
        showReset={isShow}
      />

      <FilterNew value={isNew} onChange={handleIsNew} />

      <FilterPrice
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={handlePriceChange}
      />

      <FilterIngredients
        ingredients={ingredients ?? []}
        selected={selectedIngredients}
        onToggle={toggleIngredient}
      />

      <FilterDough selected={selectedTypes} onToggle={handleType} />

      <FilterBottom onApply={handleSelect} disabled={!priceValid} />
    </div>
  );
};
