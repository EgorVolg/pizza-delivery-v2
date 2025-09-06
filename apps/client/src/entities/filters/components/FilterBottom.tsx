import { type FC } from "react";
import styles from "./FiltersBottom.module.css"; 
import Button from "../../../shared/ui/Button/Button";

export const FilterBottom: FC<{ onApply: () => void; disabled: boolean }> = ({
  onApply,
  disabled,
}) => (
  <div className={styles.btn_container}>
    <Button
      data-testid="apply-button"
      onClick={onApply}
      className={styles.filter_button}
      disabled={disabled}
    >
      Применить
    </Button>
  </div>
);
