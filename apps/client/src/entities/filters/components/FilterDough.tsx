import type { FC } from "react";
import {FilterCheckbox} from "../ui/FilterCheckbox";
import styles from "../../../widgets/Filters/Filters.module.css";
import { typesOfDough } from "../../../widgets/Filters/model/filter.const";

export const FilterDough: FC<{
  selected: number[];
  onToggle: (id: number) => void;
}> = ({ selected, onToggle }) => (
  <ul className={styles.filter_group}>
    <p className={styles.filter_group_title}>Тип теста:</p>
    {typesOfDough.map((t) => (
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
