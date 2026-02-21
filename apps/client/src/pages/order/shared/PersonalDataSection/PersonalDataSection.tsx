import styles from "./PersonalDataSection.module.css";
import { OrderSectionHeader } from "../OrderSectionHeader/OrderSectionHeader";
import type { FormData, FormErrors } from "../../ui/Orderpage";

export const PersonalDataSection = ({
  formData,
  handleChange,
  errors,
}: {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: FormErrors;
}) => {
  return (
    <div className={styles.cart_items_section}>
      <OrderSectionHeader text="Персональные данные" />

      <div className={styles.form_group_container}>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="name">
            Имя
          </label>
          <input
            className={`${styles.form_input} ${errors.name ? styles.error : ""}`}
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <span className={styles.error_text}>{errors.name}</span>
          )}
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="surname">
            Фамилия
          </label>
          <input
            className={`${styles.form_input} ${errors.surname ? styles.error : ""}`}
            type="text"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
          />
          {errors.surname && (
            <span className={styles.error_text}>{errors.surname}</span>
          )}
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="email">
            Email
          </label>
          <input
            className={`${styles.form_input} ${errors.email ? styles.error : ""}`}
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className={styles.error_text}>{errors.email}</span>
          )}
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="phone">
            Телефон
          </label>
          <input
            className={`${styles.form_input} ${errors.phone ? styles.error : ""}`}
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className={styles.error_text}>{errors.phone}</span>
          )}
        </div>
      </div>
    </div>
  );
};
