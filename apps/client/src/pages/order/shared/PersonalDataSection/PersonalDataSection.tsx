import styles from "./PersonalDataSection.module.css";
import { OrderSectionHeader } from "../../ui/OrderSectionHeader";

export const PersonalDataSection = () => {
  return (
    <div className={styles.cart_items_section}>
      <OrderSectionHeader text="Персональные данные" />

      <div className={styles.form_group_container}>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="name">
            Имя
          </label>
          <input className={styles.form_input} type="text" id="name" />
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="surname">
            Фамилия
          </label>
          <input className={styles.form_input} type="text" id="surname" />
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="email">
            Email
          </label>
          <input className={styles.form_input} type="email" id="email" />
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="phone">
            Телефон
          </label>
          <input className={styles.form_input} type="tel" id="phone" />
        </div>
      </div>
    </div>
  );
};
