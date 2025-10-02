import styles from "./CartItem.module.css";
import { type TCartItem } from "../../../entities/cart/model/cart.types";
import Button from "../../../shared/ui/Button/Button";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../../../entities/cart/model/cart.api";

export const CartItem = ({ item }: { item: TCartItem }) => {
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const deleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const updateItemQuantity = (item: TCartItem, countAction?: string) => {
    if (item.quantity === 1 && countAction === "decrement") {
      deleteItem(item.id);
    } else {
      updateCartItem({
        ...item,
        quantity:
          countAction === "increment" ? item.quantity + 1 : item.quantity - 1,
      });
    }
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

        <p className={styles.cartItem__description}>
          {`${item.size} см, ${item.type} тесто `} <br />
          {item.toppings ? `+ ${item.toppings.toLowerCase()}` : ""}
        </p>

        <div className={styles.line} />

        <div className={styles.cartItem__price_container}>
          <div className={styles.cartItem__counter}>
            <Button
              className={styles.counter__Btn}
              onClick={() => updateItemQuantity(item, "decrement")}
            >
              -
            </Button>
            <span>{item.quantity}</span>
            <Button
              className={styles.counter__Btn}
              onClick={() => updateItemQuantity(item, "increment")}
            >
              +
            </Button>
          </div>

          <span className={styles.cartItem__price}> {item.price} ₽</span>
        </div>
      </div>
    </li>
  );
};
