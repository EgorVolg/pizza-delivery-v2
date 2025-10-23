import type { FC } from "react";
import { FilterCheckbox } from "../ui/FilterCheckbox";
import styles from "../../../widgets/Filters/Filters.module.css";

export const FilterNew: FC<{
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ value, onChange }) => {
  const handleToggle = () => onChange(!value);

  return (
    <ul className={styles.filter_group}>
      <li onClick={handleToggle} style={{ cursor: "pointer" }}>
        <FilterCheckbox
          text="Новинки"
          checked={value} 
        />
      </li>
    </ul>
  );
};
