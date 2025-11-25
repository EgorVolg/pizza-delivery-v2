import styles from "./SwiperButtons.module.css";

export const SwiperButtons = () => {
  return (
    <div className={styles.buttons_group}>
      <button className={`${styles.navButton} ${styles.prev} custom-prev`}>
        <svg viewBox="0 0 24 24">
          <path
            d="M15 6l-6 6 6 6"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button className={`${styles.navButton} ${styles.next} custom-next`}>
        <svg viewBox="0 0 24 24">
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
