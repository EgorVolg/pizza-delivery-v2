import track from "../../../shared/assets/track.svg";
import orderbox from "../../../shared/assets/orderbox.svg";
import percent from "../../../shared/assets/percent.svg";

import styles from "./OrderInfoAside.module.css";
import Button from "../../../shared/ui/Button/Button";

export const OrderInfoAside = () => {
  return (
    <aside className={styles.order_info}>
      <div className={styles.order_info_section}>
        <p className={styles.order_info_title}>Итого:</p>
        <p className={styles.order_info_price}>5 400 ₽</p>
      </div>

      <div className={styles.order_info_section}>
        <ul className={styles.order_info_list}>
          <li className={styles.order_info_listitem}>
            <span className={styles.order_info_listitem_span}>
              <img src={orderbox} alt="total price" /> Стоимость товаров:
            </span>
            <div className={styles.order_info_dots} />
            <p className={styles.order_info_amount}>225 400 ₽</p>
          </li>
          <li className={styles.order_info_listitem}>
            <span className={styles.order_info_listitem_span}>
              <img src={percent} alt="tax" />
              Налог:
            </span>
            <div className={styles.order_info_dots} />
            <p className={styles.order_info_amount}>5 400 ₽</p>
          </li>
          <li className={styles.order_info_listitem}>
            <span className={styles.order_info_listitem_span}>
              <img src={track} alt="delivery" />
              Доставка:
            </span>
            <div className={styles.order_info_dots} />
            <p className={styles.order_info_amount}>5 400 ₽</p>
          </li>
        </ul>
      </div>

      <div className={styles.order_info_section}>
        <input
          type="text"
          placeholder="У меня есть промокод"
          className={styles.promo_code_input}
        />
        <Button className={styles.goPay_button}>Перейти к оплате</Button>
      </div>
    </aside>
  );
};
