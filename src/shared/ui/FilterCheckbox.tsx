import styles from "./FilterCheckbox.module.css";

function FilterCheckbox({
  text,
  rounded,
}: {
  text: string;
  rounded?: boolean;
}) {
  return (
    <div className={styles.filter_checkbox}>
      <input
        className={`${styles.checkbox_input} ${rounded && styles.rounded}`}
        type="checkbox"
      />
      <span className={styles.checkmark}>{text}</span>
    </div>
  );
}

export default FilterCheckbox;
