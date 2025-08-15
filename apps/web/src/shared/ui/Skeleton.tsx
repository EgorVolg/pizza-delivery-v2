import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = () => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <div className={styles.image} />
    </div>
    <div className={styles.title} />
    <div className={styles.line} />
    <div className={styles.lineMedium} />
    <div className={styles.lineShort} />
    <div className={styles.priceblock}>
      <div className={styles.price} />
      <div className={styles.button} />
    </div>
  </div>
);

export default Skeleton;
