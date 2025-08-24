import styles from "./FilterCheckbox.module.css";

function FilterCheckbox({
  text,
  rounded,
  checked,
  onChange,
  className,
}: {
  text: string;
  rounded?: boolean;
  checked?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div className={`${className} ${styles.filter_checkbox}`}>
      <input
        className={`${styles.checkbox_input} ${rounded && styles.rounded}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.checkmark}>{text}</span>
    </div>
  );
}

export default FilterCheckbox;
