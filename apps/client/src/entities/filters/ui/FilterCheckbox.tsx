import styles from "./FilterCheckbox.module.css";

export const FilterCheckbox = ({
  text,
  rounded,
  checked,
  onChange,
  className,
}: {
  text: string;
  rounded?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className={`${className} ${styles.filter_checkbox}`}>
      <input
        className={`${styles.checkbox_input} ${rounded && styles.rounded}`}
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
      />
      <span className={styles.checkmark}>{text}</span>
    </div>
  );
};
