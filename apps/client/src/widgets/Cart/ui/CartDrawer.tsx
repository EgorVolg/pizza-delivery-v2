import { motion } from "framer-motion";
import styles from "./CartDrawer.module.css";
import Button from "../../../shared/ui/Button/Button";
import { useGetCartItemsQuery } from "../../../entities/cart/model/cart.api";
import { EmptyCart } from "./EmptyCart";
import type { TCartItem } from "../../../entities/cart/model/cart.types";
import { CartItem } from "./CartItem";
import { useMemo } from "react";

const panelVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 700, damping: 50 },
  },
};

const innerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const CartDrawer = ({
  handleCloseCart,
}: {
  handleCloseCart: () => void;
}) => {
  const { data: cartData, isLoading } = useGetCartItemsQuery();
  if (cartData === undefined) return null;

  const cartItems = useMemo(() => {
    return [...(cartData?.data ?? [])].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [cartData?.data]);

  return (
    <motion.div
      className={styles.cartDrawer}
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {cartData.quantity > 0 && (
        <div className={styles.cartDrawerHeader}>
          <p>
            В корзине <b>{cartData.quantity} товаров</b>
          </p>

          <button onClick={handleCloseCart} className={styles.closeBtn}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M11.6328 9.94495L19.7328 1.84495C19.9149 1.63239 20.01 1.35898 19.9992 1.07934C19.9884 0.799697 19.8724 0.534431 19.6746 0.336549C19.4767 0.138666 19.2114 0.0227402 18.9318 0.011939C18.6521 0.00113767 18.3787 0.096256 18.1662 0.278285L10.0662 8.37829L1.96616 0.267174C1.7536 0.0851447 1.48019 -0.00997263 1.20055 0.00082865C0.920905 0.0116299 0.65564 0.127554 0.457757 0.325437C0.259874 0.52332 0.143948 0.788585 0.133147 1.06823C0.122346 1.34787 0.217464 1.62128 0.399494 1.83384L8.49949 9.94495L0.388382 18.045C0.272069 18.1446 0.177602 18.2671 0.11091 18.405C0.044217 18.5428 0.00673853 18.693 0.000827977 18.846C-0.00508257 18.999 0.0207018 19.1516 0.0765624 19.2942C0.132423 19.4368 0.217154 19.5663 0.325438 19.6746C0.433721 19.7828 0.563218 19.8676 0.705801 19.9234C0.848384 19.9793 1.00098 20.0051 1.154 19.9992C1.30702 19.9933 1.45717 19.9558 1.59502 19.8891C1.73287 19.8224 1.85544 19.7279 1.95505 19.6116L10.0662 11.5116L18.1662 19.6116C18.3787 19.7936 18.6521 19.8888 18.9318 19.878C19.2114 19.8672 19.4767 19.7512 19.6746 19.5534C19.8724 19.3555 19.9884 19.0902 19.9992 18.8106C20.01 18.5309 19.9149 18.2575 19.7328 18.045L11.6328 9.94495Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      )}

      <motion.div
        variants={innerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.cartDrawerContent}
      >
        {cartData.quantity === 0 && !isLoading ? (
          <EmptyCart handleCloseCart={handleCloseCart} />
        ) : (
          <ul className={styles.cartList}>
            {cartItems.map((item: TCartItem) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        )}

        {cartData.quantity > 0 && (
          <footer className={styles.cartFooter}>
            <div className={styles.cartFooter__info}>
              <div className={styles.info__string}>
                <span>Итого:</span>
                <div className={styles.dashedline} />
                <b>{cartData.totalPrice} ₽</b>
              </div>
              <div className={styles.info__string}>
                <span>Налог 5%:</span>
                <div className={styles.dashedline} />
                <b>{Math.round(cartData.totalPrice * 0.05)} ₽</b>
              </div>
            </div>
            <Button className={styles.cartFooter__button}>
              Оформить заказ
              <svg
                xmlns="http://www.w3.org/2000/svg "
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
              </svg> 
            </Button>
          </footer>
        )}
      </motion.div>
    </motion.div>
  );
};
