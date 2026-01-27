import styles from "./ProductCard.Skeleton.module.css";

export const ProductCardSkeleton = () => (
  <div className={styles.card} >
    <div className={styles.imageContainer} />

    <div className={styles.body}>
      <header>
        <div className={styles.title} />
        <div className={styles.description} />
      </header>
      <footer className={styles.footer}>
        <div className={styles.price} />
        <div className={styles.button} />
      </footer>
    </div>
  </div>
);
