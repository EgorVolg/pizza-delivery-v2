import { OrderSectionHeader } from "../../ui/OrderSectionHeader";
import styles from "./DeliveryAddressSection.module.css";
 

export const DeliveryAddressSection = () => {
  return (
    <div className={styles.cart_items_section}>
      <OrderSectionHeader text="Адрес доставки" />
      {/* Здесь будет форма адреса доставки */}
    </div>
  );
};