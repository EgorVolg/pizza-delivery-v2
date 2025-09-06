import { useState } from "react";
import styles from "./ProductCard.module.css"; 
import type { PizzaCard } from "../../pizza/model/pizza.types";
import Button from "../../../shared/ui/Button/Button";

export const ProductCard = ({ pizza }: { pizza: PizzaCard }) => {
  const [pizzaQuantity, setPizzaQuantity] = useState(0);

  return (
    <article key={pizza.id} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={pizza.imageUrl} alt={pizza.name} className={styles.image} />
      </div>
      <div className={styles.body}>
        <header>
          <h3 className={styles.title}>{pizza.name}</h3>
          <p className={styles.description}>{pizza.ingredients}</p>
        </header>
        <footer className={styles.footer}>
          <span className={styles.price}>
            <b> от</b> {pizza.price} ₽
          </span>
          {pizzaQuantity > 0 ? (
            <div className={styles.quantityControls}>
              <Button
                onClick={() => setPizzaQuantity(pizzaQuantity - 1)}
                className={styles.counterButton}
              >
                -
              </Button>
              <span>{pizzaQuantity}</span>
              <Button
                onClick={() => setPizzaQuantity(pizzaQuantity + 1)}
                className={styles.counterButton}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className={styles.button}
              onClick={() => setPizzaQuantity(1)}
            >
              + Добавить
            </Button>
          )}
        </footer>
      </div>
    </article>
  );
};
