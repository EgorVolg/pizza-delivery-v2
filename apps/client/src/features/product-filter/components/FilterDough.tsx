import type { FC } from "react";
import type { Dough } from "../model/filter.dto";
import FilterCheckbox from "../ui/FilterCheckbox";
import styles from "../ui/Filters.module.css";

export const FilterDough: FC<{
  types: Dough[];
  selected: number[];
  onToggle: (id: number) => void;
}> = ({ types, selected, onToggle }) => (
  <ul className={styles.filter_group}>
    <p className={styles.filter_group_title}>Тип теста:</p>
    {types.map((t) => (
      <li key={t.id} onClick={() => onToggle(t.id)}>
        <FilterCheckbox
          text={t.name}
          checked={selected.includes(t.id)}
          rounded
        />
      </li>
    ))}
  </ul>
);
