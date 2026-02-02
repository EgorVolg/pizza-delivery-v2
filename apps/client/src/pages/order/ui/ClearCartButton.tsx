import { motion } from "framer-motion";
import TrashIcon from "../../../shared/assets/remove.svg"; 
 
import styles from "./ClearCartButton.module.css";
import { useCart } from "../shared/hooks/useCart";

export const ClearCartButton = () => {
  const { handleClearCartItems } = useCart();

  return (
    <motion.button
      className={styles.clear_cart_button}
      onClick={handleClearCartItems}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
    >
      <img src={TrashIcon} alt="Clear cart" />
      <span>Очистить корзину</span>
    </motion.button>
  );
};