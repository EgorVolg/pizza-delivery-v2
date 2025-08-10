import type { Pizza } from "../../pages/Homepage";
import pizzaImage from "../ui/assests/pizza.avif";
import styles from "./Card.module.css";

export const Card = ({ pizza }: { pizza: Pizza }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img className={styles.image} src={pizzaImage} alt={pizza.name} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{pizza.name}</h3>
        <p className={styles.ingredients}>{pizza.description}</p>
      </div>
      <div className={styles.priceContainer}>
        <span className={styles.price}>
          от <b className={styles.priceBold}>{pizza.price} ₽</b>
        </span>

        <button className={styles.button}>+ Добавить</button>
      </div>
    </div>
  );
};
