import type { TCartItem } from "../../../entities/cart/model/cart.types";
import Button from "../../../shared/ui/Button/Button";
import styles from "./CartItem.module.css";

type Props = {
  item: TCartItem;
  updateItemQuantity: (item: TCartItem, countAction?: string) => void;
};

export const CartItem = (props: Props) => {
  return (
    <article className={styles.cartItem}>
      <div className={styles.cartItem_info_container}>
        <img
          className={styles.cartItem_image}
          src={props.item.imageUrl}
          alt={props.item.name}
        />

        <div className={styles.cartItem_info}>
          <div className={styles.cartItem_name}>{props.item.name}</div>

          <div className={styles.cartItem_ingredients}>
            {props.item.type && `${props.item.type} тесто `}
            {props.item.size && `${props.item.size} см `}
            {props.item.ingredients && `+ ${props.item.ingredients}`}
          </div>
        </div>
      </div>

      <div className={styles.cartItem_price_container}>
        <div className={styles.cartItem_price}>{props.item.price} ₽</div>

        <div className={styles.cartItem_counter}>
          <Button
            className={styles.counter_Btn}
            onClick={() => props.updateItemQuantity(props.item, "decrement")}
          >
            -
          </Button>
          <span>{props.item.quantity}</span>
          <Button
            className={styles.counter_Btn}
            onClick={() => props.updateItemQuantity(props.item, "increment")}
          >
            +
          </Button>
        </div>
      </div>
    </article>
  );
};
