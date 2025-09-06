import { type FC } from "react";
import styles from "./FiltersBottom.module.css"; 

export const FilterBottom: FC<{ onApply: () => void; disabled: boolean }> = ({
  onApply,
  disabled,
}) => (
  <div className={styles.btn_container}>
    <button
      data-testid="apply-button"
      onClick={onApply}
      className={styles.filter_button}
      disabled={disabled}
    >
      Применить
    </button>
  </div>
);
