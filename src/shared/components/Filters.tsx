import React from "react";
import FilterCheckbox from "../ui/FilterCheckbox";
import Button from "../ui/Button";
import styles from "./Filters.module.css";

const ingredients = [
  "Грибы",
  "Пепперони",
  "Сыр",
  "Оливки",
  "Базилик",
  "Перец",
  "Лук",
  "Курица",
];
export const Filters = () => {
  return (
    <div className={styles.filter_groups}>
      <h1 className={styles.filter_title}>Фильтрация</h1>
      <div className={styles.filter_group}>
        <FilterCheckbox text="Можно собирать" />
        <FilterCheckbox text="Новинки" />
      </div>

      <div className={styles.filter_group}>
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

      <div className={styles.filter_group}>
        <p className={styles.filter_group_title}>Ингредиенты:</p>
        <div>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>
                <FilterCheckbox text={ingredient} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.filter_group}>
          <p className={styles.filter_group_title}>Тип теста:</p>
          <FilterCheckbox text="Традиционное" rounded />
          <FilterCheckbox text="Толстое" rounded />
        </div>
      </div>
      <Button>Применить</Button>
    </div>
  );
};
