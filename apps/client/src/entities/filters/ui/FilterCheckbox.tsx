import styles from "./FilterCheckbox.module.css";

type FilterCheckboxProps = {
  text: string;
  rounded?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

export const FilterCheckbox = ({
  text,
  rounded,
  checked = false,
  onChange,
  className,
}: FilterCheckboxProps) => {
  return (
    <div
      className={`${className ?? ""} ${styles.filter_checkbox}`}
      onClick={() => onChange?.(!checked)}
      style={{ cursor: "pointer" }}
    >
      <input
        type="checkbox"
        className={`${styles.checkbox_input} ${rounded ? styles.rounded : ""}`}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <span className={styles.checkmark}>{text}</span>
    </div>
  );
};
