import styles from "./PageLoader.module.css";

export const PageLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.pizza}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="30" r="28" stroke="#FE5F00" strokeWidth="2" />
            <circle cx="30" cy="30" r="4" fill="#FE5F00" />
            <circle cx="20" cy="20" r="3" fill="#FE5F00" />
            <circle cx="40" cy="20" r="3" fill="#FE5F00" />
            <circle cx="20" cy="40" r="3" fill="#FE5F00" />
            <circle cx="40" cy="40" r="3" fill="#FE5F00" />
          </svg>
        </div>
        <div className={styles.text}>Загрузка...</div>
      </div>
    </div>
  );
};
