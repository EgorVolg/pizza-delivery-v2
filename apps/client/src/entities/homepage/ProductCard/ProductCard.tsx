import { useMemo } from "react";
import styles from "./ProductCard.module.css";
import Button from "../../../shared/ui/Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetCartItemsQuery } from "../../cart/model/cart.api";
import { useGetIngredientsQuery } from "../../ingredient/model/ingredient.api";
import type { PizzaResponse } from "../../products/model/pizza.types";

export const ProductCard = ({
  pizza,
  className,
}: {
  pizza: PizzaResponse;
  className?: string;
}) => {
  const dispatch = useDispatch();
  const { data: cartData } = useGetCartItemsQuery();
  const { data: ingredients } = useGetIngredientsQuery();

  const productQuantity = useMemo(() => {
    if (!cartData?.data) return 0;

    const cartItem = cartData.data.filter((item) => item.name === pizza.name);
    return cartItem.map((item) => item.quantity).reduce((a, b) => a + b, 0);
  }, [cartData, pizza.name]);

  const handleAddToCart = () => {
    dispatch({
      type: "pizzaModal/setOpenClosePizzaModal",
      payload: { open: true, id: pizza.id, categoryId: pizza.category_id },
    });
  };

  const handleRemoveFromCart = () => {
    dispatch({
      type: "closeOpenCart/setCloseOpenCart",
      payload: true,
    });
  };

  if (!cartData || !ingredients) return null;

  return (
    <article key={pizza.id} className={`${styles.card} ${className}`}>
      <Link to={`/products/category/${pizza.category_id}/product/${pizza.id}`} aria-label={`Перейти к ${pizza.name}`}>
        <div className={styles.imageContainer}>
          <img
            src={pizza.imageUrl}
            alt={pizza.name}
            className={styles.image}
           fetchPriority="high"
            loading="eager"
            width="212"
            height="212"
          />
        </div>
      </Link>
      <div className={styles.body}>
        <header>
          <h3 className={styles.title}>{pizza.name}</h3>
          <p className={styles.description}>{pizza.description}</p>
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
                aria-label="Открыть корзину"
              >
                -
              </Button>
              <span aria-label={`Количество: ${productQuantity}`}>{productQuantity}</span>
              <Button
                onClick={handleAddToCart}
                className={styles.counterButton}
                aria-label={`Добавить еще ${pizza.name}`}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className={styles.button}
              onClick={handleAddToCart}
              aria-label={`Добавить ${pizza.name} в корзину`}
            >
              + Добавить
            </Button>
          )}
        </footer>
      </div>
    </article>
  );
};
