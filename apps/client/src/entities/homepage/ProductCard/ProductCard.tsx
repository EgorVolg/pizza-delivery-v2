import { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import type { PizzaCard } from "../../pizza/model/pizza.types";
import Button from "../../../shared/ui/Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetCartItemsQuery } from "../../cart/model/cart.api";

export const ProductCard = ({ pizza }: { pizza: PizzaCard }) => {
  const dispatch = useDispatch();
  const { data: cartData } = useGetCartItemsQuery();
  if (cartData === undefined) return null;

  const [productQuantity, setProductQuantity] = useState(0);
  useEffect(() => {
    const cartItem = cartData.data.filter((item) => item.name === pizza.name);
    const cartItemQuantity = cartItem
      .map((item) => item.quantity)
      .reduce((a, b) => a + b, 0);

    return setProductQuantity(cartItemQuantity);
  }, [cartData]);

  const handleAddToCart = () => {
    setProductQuantity(productQuantity + 1);

    dispatch({
      type: "pizzaModal/setOpenClose",
      payload: { open: true, id: pizza.id },
    });
  };

  const handleRemoveFromCart = () => null; // To be implemented

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
          {productQuantity > 0 ? (
            <div className={styles.quantityControls}>
              <Button
                onClick={handleRemoveFromCart}
                className={styles.counterButton}
              >
                -
              </Button>
              <span>{productQuantity}</span>
              <Button
                onClick={handleAddToCart}
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
