import { useEffect, useRef, useState } from "react";
import FilterCheckbox from "../ui/FilterCheckbox/FilterCheckbox";
import Button from "../ui/Button/Button";
import styles from "./Filters.module.css";
import Xbtn from "../ui/Xbtn/Xbtn";
import { useLockScroll } from "../hooks/useLockScroll";
import { useGetIngredientsQuery } from "../../entities/ingredient/model/ingredient.api";
import { useDispatch, useSelector } from "react-redux";
import { setParams } from "../../features/search-items/state/filterParamsSlice";

export const Filters = ({
  toggleMenu,
  isOpenFilters,
}: {
  toggleMenu: () => void;
  isOpenFilters: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState<number[]>([]);
  const popupRef = useRef<HTMLUListElement>(null);
  const { data: ingredients } = useGetIngredientsQuery();

  const dispatch = useDispatch();

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
    setCount((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelect = () => {
    toggleMenu();
    dispatch(setParams({ ingredients: count }));
  };

  return (
    <div className={styles.filter_groups}>
      <div className={styles.filter_top}>
        <h1 className={styles.filter_title}>Фильтрация</h1>

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
        <li>
          <FilterCheckbox text="Новинки" />
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
            <input className={styles.price_input} type="text" placeholder="0" />
          </div>
          <div className={styles.input_container}>
            <input
              className={styles.price_input}
              type="text"
              placeholder="100"
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
                checked={count.includes(+ingredient.id)}
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
      <div className={styles.filter_group}>
        <p className={styles.filter_group_title}>Тип теста:</p>
        <FilterCheckbox text="Традиционное" rounded />
        <FilterCheckbox text="Толстое" rounded />
      </div>
      <div className={styles.btn_container}>
        <Button className={styles.filter_button} onClick={handleSelect}>
          Применить
        </Button>
      </div>
    </div>
  );
};
