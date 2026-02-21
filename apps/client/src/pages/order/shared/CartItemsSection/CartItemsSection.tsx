import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { CartItemsList } from "./CartItemsList";
import { OrderSectionHeader } from "../OrderSectionHeader/OrderSectionHeader";
import styles from "./CartItemsSection.module.css";
import { ClearCartButton } from "../../ui/ClearCartButton";

export const CartItemsSection = () => {
  const [isShowCartList, setIsShowCartList] = useState(true);
  const { cart, isEmpty } = useCart();

  const toggleCartList = () => {
    setIsShowCartList(!isShowCartList);
  };

  if (!cart) {
    return null;
  }

  return (
    <div className={styles.cart_items_section}>
      <OrderSectionHeader
        text="Корзина"
        showCartList={toggleCartList}
        isShowCartList={isShowCartList}
      />

      {!isEmpty && isShowCartList && <ClearCartButton />}

      <AnimatePresence mode="wait">
        {isShowCartList && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              filter: "blur(4px)",
              height: 0,
              overflow: "hidden",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -15,
              filter: "blur(4px)",
              height: 0,
              transition: {
                duration: 0.25,
                ease: "easeIn",
              },
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              opacity: { duration: 0.25 },
            }}
            style={{ overflow: "hidden" }}
          >
            <div className={styles.cart_items_content}>
              <CartItemsList />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
