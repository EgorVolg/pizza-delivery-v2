import { useState, type FC } from "react";
import type { Ingredient } from "../../../entities/ingredient/model/ingredient.types";
import FilterCheckbox from "../ui/FilterCheckbox";
import styles from "../ui/Filters.module.css";

export const FilterIngredients: FC<{
  ingredients: Ingredient[];
  selected: number[];
  onToggle: (id: number) => void;
}> = ({ ingredients, selected, onToggle }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.filter_group} ${styles.filter_ingredients}`}>
      <p className={styles.filter_group_title}>Ингредиенты:</p>
      <ul
        data-testid="filters-popup"
        style={{ maxHeight: open ? "none" : "225px" }}
        className={styles.ingredients_list}
      >
        {ingredients.map((i) => (
          <li key={i.id} onClick={() => onToggle(+i.id)}>
            <FilterCheckbox text={i.name} checked={selected.includes(+i.id)} />
          </li>
        ))}
      </ul>
      <button
        onClick={() => setOpen(!open)}
        className={styles.filter_ingredients_button}
      >
        {open ? "Скрыть" : "+ Показать всё"}
      </button>
    </div>
  );
};
