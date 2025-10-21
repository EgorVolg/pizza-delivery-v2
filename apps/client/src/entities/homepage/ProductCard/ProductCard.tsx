import { useMemo } from "react";
import styles from "./ProductCard.module.css";
import type { PizzaAPI } from "../../pizza/model/pizza.types";
import Button from "../../../shared/ui/Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetCartItemsQuery } from "../../cart/model/cart.api";
import { useGetIngredientsQuery } from "../../ingredient/model/ingredient.api";

export const ProductCard = ({ pizza }: { pizza: PizzaAPI }) => {
  const dispatch = useDispatch();
  const { data: cartData } = useGetCartItemsQuery();
  const { data: ingredients } = useGetIngredientsQuery();

  const productQuantity = useMemo(() => {
    if (!cartData?.data) return 0;

    const cartItem = cartData.data.filter((item) => item.name === pizza.name);
    return cartItem.map((item) => item.quantity).reduce((a, b) => a + b, 0);
  }, [cartData, pizza.name]);

  if (!cartData || !ingredients) return null;

  const pizzaIngredients = useMemo(() => {
    const ingr = pizza.ingredients
      .map((id) => ingredients.find((item) => item.id === id))
      .map((item) => item?.name)
      .join(", ");

    return ingr;
  }, [pizza, ingredients]);

  const handleAddToCart = () => {
    dispatch({
      type: "pizzaModal/setOpenClosePizzaModal",
      payload: { open: true, id: pizza.id },
    });
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: "closeOpenCart/setCloseOpenCart",
      payload: true,
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
          <p className={styles.description}>{pizzaIngredients}</p>
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
