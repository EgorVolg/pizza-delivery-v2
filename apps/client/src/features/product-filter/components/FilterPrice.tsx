import type { FC } from "react";
import { MAX_PRICE, MIN_PRICE } from "../model/filter.const";
import styles from "../ui/Filters.module.css";

export const FilterPrice: FC<{
  minPrice: number;
  maxPrice: number;
  onChange: (idx: 0 | 1, val: number) => void;
}> = ({ onChange, minPrice, maxPrice }) => {
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
            value={minPrice === MIN_PRICE ? "" : minPrice}
            onChange={(e) => onChange(0, +e.target.value)}
          />
          <input
            className={styles.price_input}
            type="number"
            placeholder={MAX_PRICE.toString()}
            value={maxPrice === MAX_PRICE ? "" : maxPrice}
            onChange={(e) => onChange(1, +e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
