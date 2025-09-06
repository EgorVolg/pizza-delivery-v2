import type { FC } from "react";
import FilterCheckbox from "../ui/FilterCheckbox";
import styles from "../../../widgets/Filters/Filters.module.css";

export const FilterNew: FC<{
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ value, onChange }) => (
  <ul className={styles.filter_group}>
    <li onClick={() => onChange(!value)}>
      <FilterCheckbox
        text="Новинки"
        checked={value} 
        onChange={() => onChange(!value)}
      />
    </li>
  </ul>
);
