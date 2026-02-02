import track from "../../../shared/assets/track.svg";
import orderbox from "../../../shared/assets/orderbox.svg";
import percent from "../../../shared/assets/percent.svg";
import styles from "./OrderInfoAside.module.css";
import Button from "../../../shared/ui/Button/Button";
import { useGetCartItemsQuery } from "../../../entities/cart/model/cart.api";
import { Link } from "react-router-dom";

export const OrderInfoAside = () => {
  const { data: cart } = useGetCartItemsQuery();

  if (!cart) return null;
  const tax = Math.round((cart.totalPrice || 0) * 0.05);
  const delivery = Math.round((cart.totalPrice || 0) * 0.1);
  const totalAmount = cart.totalPrice + tax + delivery || 0;

  return (
    <aside className={styles.order_info}>
      <div className={styles.order_info_section}>
        <p className={styles.order_info_title}>Итого:</p>
        <p className={styles.order_info_price}>{totalAmount} ₽</p>
      </div>

      <div className={styles.order_info_section}>
        <ul className={styles.order_info_list}>
          <li className={styles.order_info_listitem}>
            <span className={styles.order_info_listitem_span}>
              <img src={orderbox} alt="total price" /> Стоимость товаров:
            </span>
            <div className={styles.order_info_dots} />
            <p className={styles.order_info_amount}>{cart.totalPrice} ₽</p>
          </li>
          <li className={styles.order_info_listitem}>
            <span className={styles.order_info_listitem_span}>
              <img src={percent} alt="tax" />
              Налог:
            </span>
            <div className={styles.order_info_dots} />
            <p className={styles.order_info_amount}>{tax} ₽</p>
          </li>
          <li className={styles.order_info_listitem}>
            <span className={styles.order_info_listitem_span}>
              <img src={track} alt="delivery" />
              Доставка:
            </span>
            <div className={styles.order_info_dots} />
            <p className={styles.order_info_amount}>{delivery} ₽</p>
          </li>
        </ul>
      </div>

      <div className={styles.order_info_section}>
        <input
          type="text"
          placeholder="У меня есть промокод"
          className={styles.promo_code_input}
        />
        <Button className={styles.goPay_button}>
          {cart.totalPrice > 0 ? (
            "Перейти к оплате"
          ) : (
            <Link to="/">Вернуться в магазин</Link>
          )}
        </Button>
      </div>
    </aside>
  );
};
