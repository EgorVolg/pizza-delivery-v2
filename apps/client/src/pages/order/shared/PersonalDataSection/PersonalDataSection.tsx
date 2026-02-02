import styles from "./PersonalDataSection.module.css";
import { OrderSectionHeader } from "../../ui/OrderSectionHeader";

export const PersonalDataSection = () => {
  return (
    <div className={styles.cart_items_section}>
      <OrderSectionHeader text="Персональные данные" />
      {/* Здесь будет форма персональных данных */}
    </div>
  );
};
