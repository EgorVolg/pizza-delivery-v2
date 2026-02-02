import Container from "../../../shared/ui/Container/Container";
import styles from "./Orderpage.module.css"; 
import { OrderInfoAside } from "./OrderInfoAside";
import { CartItemsSection } from "../shared/CartItemsSection/CartItemsSection";
import { PersonalDataSection } from "../shared/PersonalDataSection/PersonalDataSection";
import { DeliveryAddressSection } from "../shared/DeliveryAddressSection/DeliveryAddressSection";

export const Orderpage = () => {
  return (
    <Container className={styles.orderpage_container}>
      <h1 className={styles.title_section}>Оформление заказа</h1>

      <div className={styles.orderpage_spacer}>
        <div className={styles.cart_items}>
          <CartItemsSection />
          <PersonalDataSection />
          <DeliveryAddressSection />
        </div>

        <OrderInfoAside />
      </div>
    </Container>
  );
};
