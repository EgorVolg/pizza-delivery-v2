import { useState } from "react";
import styles from "./ProductCard.module.css";
import type { PizzaCard } from "../../pizza/model/pizza.types";
import Button from "../../../shared/ui/Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; 

export const ProductCard = ({ pizza }: { pizza: PizzaCard }) => {
  const [pizzaQuantity, setPizzaQuantity] = useState(0);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setPizzaQuantity(pizzaQuantity + 1);
    dispatch({
      type: "pizzaModal/setOpenClose",
      payload: { open: true, id: pizza.id },
    });
  };

  return (
    <article key={pizza.id} className={styles.card}>
      <Link to={`/pizza/${pizza.id}`}>
        <div className={styles.imageContainer}>
          <img src={pizza.imageUrl} alt={pizza.name} className={styles.image} />
        </div>
      </Link>
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
            <Button className={styles.button} onClick={handleAddToCart}>
              + Добавить
            </Button>
          )}
        </footer>
      </div>
    </article>
  );
};
