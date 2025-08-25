import { useEffect, useRef, useState } from "react";
import FilterCheckbox from "../ui/FilterCheckbox/FilterCheckbox";
import Button from "../ui/Button/Button";
import styles from "./Filters.module.css";
import Xbtn from "../ui/Xbtn/Xbtn";
import { useLockScroll } from "../hooks/useLockScroll";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "../../features/search-items/state/filterParamsSlice";

const types = [
  { id: 1, name: "тонкое" },
  { id: 2, name: "традиционное" },
];

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const selector = useSelector((state: any) => state.filterParams);
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(selector);
  const popupRef = useRef<HTMLUListElement>(null);
  const { data: ingredients } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  const handleType = (index: number) => {
    const isTypeAlreadySelected = count.type.includes(index);

    setCount((prev) => ({
      ...prev,
      type: isTypeAlreadySelected ? [] : [index],
    }));
  };

  useLockScroll(isOpenFilters);
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
    setCount((prev) => {
      const { ingredients } = prev;
      const nextIngredients = ingredients.includes(id)
        ? ingredients.filter((i) => i !== id)
        : [...ingredients, id];

      return { ...prev, ingredients: nextIngredients };
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
        price: [count.price?.[0] || 0, count.price?.[1] || 1000],
      })
    );
  };

  const handleReset = () => {
    dispatch(setParams({ ingredients: [], isNew: false, price: [], type: [] }));
    setCount({
      ingredients: [],
      isNew: false,
      price: [],
      type: [],
    });
  };

  const handlePriceChange = (index: number, value: string) => {
    const newPrice = [...(count.price || [0, 1000])];
    newPrice[index] = value === "" ? null : Number(value);
    setCount((prev: any) => ({ ...prev, price: newPrice }));
  };

  return (
    <div className={styles.filter_groups}>
      <div className={styles.filter_top}>
        <h1 className={styles.filter_title}>Фильтрация</h1>
        {(count.ingredients.length > 0 ||
          count.isNew === true ||
          +count.type.length > 0 ||
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

      <div className={styles.filter_group}>
        <li>
          <FilterCheckbox text="Можно собирать" />
        </li>
        <li onClick={() => handleIsNew(count.isNew ? false : true)}>
          <FilterCheckbox
            text="Новинки"
            checked={count.isNew}
            onClick={() => handleIsNew(count.isNew ? false : true)}
          />
        </li>
      </div>
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
              placeholder="0"
              value={count.price?.[0] ?? ""}
              onChange={(e) => handlePriceChange(0, e.target.value)}
            />
          </div>

          <div className={styles.input_container}>
            <input
              className={styles.price_input}
              type="number"
              placeholder="1000"
              value={count.price?.[1] ?? ""}
              onChange={(e) => handlePriceChange(1, e.target.value)}
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

        {types?.map((type, index) => (
          <li key={index} onClick={() => handleType(+type.id)}>
            <FilterCheckbox
              text={type.name}
              checked={count.type.includes(+type.id)}
              onClick={() => handleType(+type.id)}
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
