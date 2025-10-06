import type { FC } from "react"; 
import styles from "../../../widgets/Filters/Filters.module.css";

export const FilterTop: FC<{
  onReset: () => void;

  showReset: boolean;
}> = ({ onReset, showReset }) => (
  <div className={styles.filter_top}>
    <h1 className={styles.filter_title}>Фильтрация</h1>

    {showReset && (
      <button
        onClick={onReset}
        className={styles.filter_resetbtn}
        data-testid="reset-button"
      >
        <svg
          className={styles.filter_reseticon}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FE5F00"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    )}
  </div>
);
