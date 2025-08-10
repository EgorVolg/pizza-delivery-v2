import React, { useState } from "react";
import FilterCheckbox from "../ui/FilterCheckbox";
import Button from "../ui/Button";
import styles from "./Filters.module.css";
import { useScreenWidth } from "../hooks/useScreen";
import Xbtn from "../ui/Xbtn";

const ingredients = [
  "Грибы",
  "Пепперони",
  "Сыр",
  "Оливки",
  "Базилик",
  "Перец",
  "Лук",
  "Курица",
  "Грибы",
  "Пепперони",
  "Сыр"
];

export const Filters = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const width = useScreenWidth();

  return (
    <div className={styles.filter_groups}>
      <div className={styles.filter_top}>
        <h1 className={styles.filter_title}>Фильтрация</h1>
        {width <= 1024 && (
          <div className={styles.filter_close}>
            <Xbtn
              className={styles.filter_close_btn}
              onClick={() => toggleMenu()}
            />
          </div>
        )}
      </div>

      <div className={styles.filter_group}>
        <FilterCheckbox text="Можно собирать" />
        <FilterCheckbox text="Новинки" />
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
          style={{ maxHeight: isOpen || width <= 1024 ? "none" : "225px" }}
        >
          {ingredients.map((ingredient) => (
            <li key={ingredient}>
              <FilterCheckbox text={ingredient} />
            </li>
          ))}
        </ul>
        {width > 1024 && (
          <button
            className={styles.filter_ingredients_button}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Скрыть" : "+ Показать всё"}
          </button>
        )}
      </div>
      <div className={styles.filter_group}>
        <p className={styles.filter_group_title}>Тип теста:</p>
        <FilterCheckbox text="Традиционное" rounded />
        <FilterCheckbox text="Толстое" rounded />
      </div>

      <div className={styles.btn_container}>
        <Button className={styles.filter_button}>Применить</Button>
      </div>
    </div>
  );
};
