import styles from "./CartItem.module.css";
import { type CartItem as CartItemType } from "../../../entities/cart/model/cart.types";
import Button from "../../../shared/ui/Button/Button";
import { useDeleteCartItemMutation } from "../../../entities/cart/model/cart.api";

export const CartItem = ({ item }: { item: CartItemType }) => {
  const [deleteCartItem] = useDeleteCartItemMutation();

  const deleteItem = (id: number) => {
    deleteCartItem(id);
  };

  return (
    <li className={styles.cartItem}>
      <div className={styles.cartItem__image_container}>
        <img
          src={item.imageUrl}
          alt={item.name}
          className={styles.cartItem__image}
        />
      </div>

      <div className={styles.cartItem__info}>
        <h3 className={styles.cartItem__name}>{item.name}</h3>

        <p
          className={styles.cartItem__description}
        >{`${item.size}см, ${item.type} тесто`}</p>

        <div className={styles.line} />

        <div className={styles.cartItem__price_container}>
          <div className={styles.cartItem__counter}>
            <Button
              className={styles.counter__Btn}
              onClick={() => deleteItem(item.id)}
            >
              -
            </Button>
            <span>2</span>
            <Button className={styles.counter__Btn}>+</Button>
          </div>

          <span className={styles.cartItem__price}> {item.price} ₽</span>
        </div>
      </div>
    </li>
  );
};
