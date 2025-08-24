import { useState } from "react";
import styles from "./ProductCard.module.css";
import type { Pizza } from "../../../entities/pizza/model/pizza.types";
import Button from "../../../shared/ui/Button/Button";

export const ProductCard = ({
  pizza,
  ingredients,
}: {
  pizza: Pizza;
  ingredients: string;
}) => {
  const [pizzaQuantity, setPizzaQuantity] = useState(0);

  return (
    <article key={pizza.id} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={pizza.imageUrl} alt={pizza.name} className={styles.image} />
      </div>
      <div className={styles.body}>
        <header>
          <h3 className={styles.title}>{pizza.name}</h3>
          <p className={styles.description}>{ingredients}</p>
        </header>
        <footer className={styles.footer}>
          <span className={styles.price}>
            <b> от</b> {pizza.price} ₽
          </span>
          <Button className={styles.button}>+ Добавить</Button>
        </footer>
      </div>
    </article>
  );
};
