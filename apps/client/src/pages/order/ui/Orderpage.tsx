import Container from "../../../shared/ui/Container/Container";
import styles from "./Orderpage.module.css";
import { OrderSectionHeader } from "./OrderSectionHeader";
import { OrderInfoAside } from "./OrderInfoAside";
import TrashIcon from "../../../shared/assets/remove.svg";

export const Orderpage = () => {
  return (
    <Container className={styles.orderpage_container}>
      <h1 className={styles.title_section}>Оформление заказа</h1>

      <div className={styles.orderpage_spacer}>
        <div className={styles.cart_items}>
          <div className={styles.cart_items_section}>
            <OrderSectionHeader text="Корзина" />
            
            <button className={styles.clear_cart_button}>
              <img src={TrashIcon} alt="Clear cart" />
              <span>Очистить корзину</span>
            </button>
            <div className={styles.cart_items_content}></div>
          </div>
          <div className={styles.cart_items_section}>
            <OrderSectionHeader text="Персональные данные" />
          </div>
          <div className={styles.cart_items_section}>
            <OrderSectionHeader text="Адрес доставки" />
          </div>
        </div>

        <OrderInfoAside />
      </div>
    </Container>
  );
};
