import styles from "./Filters.module.css";
import { useEffect, useRef, useState } from "react";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useDispatch } from "react-redux";
import { useLockScroll } from "../../shared/hooks/useLockScroll";
import FilterCheckbox from "../../shared/ui/FilterCheckbox/FilterCheckbox";
import Button from "../../shared/ui/Button/Button";
import Xbtn from "../../shared/ui/Xbtn/Xbtn";
import {
  MAX_PRICE,
  MIN_PRICE,
  type Dough,
  type FilterStateParams,
} from "./model/filter.dto";
import { initialFilterParamsState, setParams } from "./filterParamsSlice";

const typesOfDough = [
  { id: 1, name: "Тонкое" },
  { id: 2, name: "Традиционное" },
];

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState<FilterStateParams>(
    initialFilterParamsState
  );
  const popupRef = useRef<HTMLUListElement>(null);
  const { data: ingredients } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const handleType = (id: number) => {
    setCount((prev) => {
      const current = prev.type ?? [];
      const nextType = current[0] === id ? [] : [id];

      return { ...prev, type: nextType };
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
    setCount((prev: FilterStateParams) => {
      const ingredients = prev.ingredients ?? [];
      return {
        ...prev,
        ingredients: ingredients.includes(id)
          ? ingredients.filter((i) => i !== id)
          : [...ingredients, id],
      };
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
    dispatch(setParams({ ingredients: [], isNew: false, price: [], type: [] }));
    setCount({
      ingredients: [],
      isNew: false,
      price: [],
      type: [],
    });
    toggleMenu();
  };

  const price = count.price ?? [];
  const minVal = price[0] ?? MIN_PRICE;
  const maxVal = price[1] ?? MAX_PRICE;

  const handlePriceChange = (idx: 0 | 1, raw: number) => {
    const parsed = Number(raw);
    const val = isNaN(parsed)
      ? MIN_PRICE
      : Math.max(MIN_PRICE, Math.min(parsed, MAX_PRICE));

    setCount((prev) => {
      const nextPrice = [...(prev.price || [])];

      if (idx === 0) {
        nextPrice[0] = val;
        if (nextPrice.length < 2) nextPrice[1] = maxVal;
      } else {
        if (nextPrice.length === 0) nextPrice[0] = MIN_PRICE;
        nextPrice[1] = val;
      }
      return { ...prev, price: nextPrice.slice(0, 2) };
    });
  };

  return (
    <div className={styles.filter_groups}>
      <div className={styles.filter_top}>
        <h1 className={styles.filter_title}>Фильтрация</h1>
        {(count.ingredients.length > 0 ||
          count.isNew === true ||
          count.type.length > 0 ||
          count.price.length > 0 ||
          count.price[1] === 0) && (
          <button onClick={handleReset} className={styles.filter_resetbtn}>
            <svg
              className={styles.filter_reseticon}
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FE5F00"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        )}

        <div
          className={styles.filter_close}
          onClick={toggleMenu}
          style={{
            cursor: "pointer",
            display: "flex",
          }}
        >
          <Xbtn className={styles.filter_close_btn} />
        </div>
      </div>

      <ul className={styles.filter_group}>
        <li onClick={() => handleIsNew(count.isNew ? false : true)}>
          <FilterCheckbox
            text="Новинки"
            checked={count.isNew}
            onClick={() => handleIsNew(count.isNew ? false : true)}
          />
        </li>
      </ul>
      <div
        className={styles.filter_group}
        style={{
          borderTop: "1px solid #e5e5e5",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <p className={styles.filter_group_title}>Цена от и до:</p>
        <div className={styles.filter_price_sorting}>
          <div className={styles.input_container}>
            <input
              className={styles.price_input}
              type="number"
              placeholder={MIN_PRICE.toString()}
              value={minVal === MIN_PRICE ? "" : minVal}
              onChange={(e) => handlePriceChange(0, +e.target.value)}
            />
          </div>

          <div className={styles.input_container}>
            <input
              className={styles.price_input}
              type="number"
              placeholder={MAX_PRICE.toString()}
              value={maxVal === MAX_PRICE ? "" : maxVal}
              onChange={(e) => handlePriceChange(1, +e.target.value)}
            />
          </div>
        </div>
        {/* <input type="range" min="0" max="1000" /> */}
      </div>
      <div className={`${styles.filter_group} ${styles.filter_ingredients}`}>
        <p className={styles.filter_group_title}>Ингредиенты:</p>

        <ul
          className={styles.ingredients_list}
          style={{ maxHeight: isOpen ? "none" : "225px" }}
        >
          {ingredients?.map((ingredient, index) => (
            <li key={index} onClick={() => toggleIngredient(+ingredient.id)}>
              <FilterCheckbox
                text={ingredient.name}
                checked={count.ingredients.includes(+ingredient.id)}
                onClick={() => toggleIngredient(+ingredient.id)}
              />
            </li>
          ))}
        </ul>

        <button
          className={styles.filter_ingredients_button}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Скрыть" : "+ Показать всё"}
        </button>
      </div>
      <ul className={styles.filter_group}>
        <p className={styles.filter_group_title}>Тип теста:</p>

        {typesOfDough.map((type: Dough, index: number) => (
          <li key={index} onClick={() => handleType(type.id)}>
            <FilterCheckbox
              text={type.name}
              checked={count.type?.includes(type.id) ?? false}
              onClick={() => handleType(type.id)}
              rounded
            />
          </li>
        ))}
      </ul>
      <div className={styles.btn_container}>
        <Button className={styles.filter_button} onClick={handleSelect}>
          Применить
        </Button>
      </div>
    </div>
  );
};
