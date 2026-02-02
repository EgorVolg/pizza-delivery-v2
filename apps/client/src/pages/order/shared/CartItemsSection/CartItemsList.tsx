import { motion } from "framer-motion";
import type { TCartItem } from "../../../../entities/cart/model/cart.types";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../../ui/CartItem";
import styles from "./CartItemsList.module.css";

export const CartItemsList = () => {
  const { cart, updateItemQuantity, deleteItems } = useCart();

  if (!cart) {
    return null;
  }

  if (cart.data.length === 0) {
    return (
      <motion.div
        className={styles.empty_cart_message}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Ваша корзина пуста
      </motion.div>
    );
  }

  return (
    <>
      {cart.data.map((item: TCartItem, index: number) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.15 + index * 0.05,
          }}
        >
          <CartItem
            item={item}
            updateItemQuantity={updateItemQuantity}
            deleteItems={() => deleteItems(item.id)}
          />
        </motion.div>
      ))}
    </>
  );
};
