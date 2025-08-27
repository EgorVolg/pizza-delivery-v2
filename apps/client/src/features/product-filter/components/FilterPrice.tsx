import type { FC } from "react";
import { MAX_PRICE, MIN_PRICE } from "../model/filter.const";
import styles from "../ui/Filters.module.css";

export const FilterPrice: FC<{
  value: number[];
  onChange: (idx: 0 | 1, val: number) => void;
}> = ({ value, onChange }) => {
  const [min, max] = [value[0] ?? MIN_PRICE, value[1] ?? MAX_PRICE];

  return (
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
            value={min === MIN_PRICE ? "" : min}
            onChange={(e) => onChange(0, +e.target.value)}
          />
          <input
            className={styles.price_input}
            type="number"
            placeholder={MAX_PRICE.toString()}
            value={max === MAX_PRICE ? "" : max}
            onChange={(e) => onChange(1, +e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
