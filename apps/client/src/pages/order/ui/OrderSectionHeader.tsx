import styles from "./OrderSectionHeader.module.css";
import arrow from "../../../shared/assets/arrow_drop_down.svg";

export const OrderSectionHeader = ({
  text,
  showCartList,
  isShowCartList,
}: {
  text: string;
  showCartList?: () => void;
  isShowCartList?: boolean;
}) => {
  return (
    <div className={styles.order_section_header}>
      {text}

      {showCartList && (
        <button
          type="button"
          className={`${styles.show_cart_button} ${isShowCartList && styles.active}`}
          onClick={showCartList}
        >
          <img src={arrow} alt="Show cart" />
        </button>
      )}
    </div>
  );
};
