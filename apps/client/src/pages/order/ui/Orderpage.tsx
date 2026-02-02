import Container from "../../../shared/ui/Container/Container";
import styles from "./Orderpage.module.css";
import { OrderSectionHeader } from "./OrderSectionHeader";
import { OrderInfoAside } from "./OrderInfoAside";
import TrashIcon from "../../../shared/assets/remove.svg";
import {
  useDeleteCartItemMutation,
  useDeleteCartItemsMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from "../../../entities/cart/model/cart.api";
import { CartItem } from "./CartItem";
import type { TCartItem } from "../../../entities/cart/model/cart.types";
import { useState } from "react";

export const Orderpage = () => {
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItemsGroup] = useDeleteCartItemsMutation();

  const [isShowCartList, setIsShowCartList] = useState(true);

  const USER_CART_ID = 1;

  const deleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const handleDeleteItems = () => {
    deleteCartItemsGroup(USER_CART_ID);
  };

  const updateItemQuantity = (item: TCartItem, countAction?: string) => {
    if (item.quantity === 1 && countAction === "decrement") {
      deleteItem(item.id);
    } else {
      updateCartItem({
        ...item,
        quantity:
          countAction === "increment" ? item.quantity + 1 : item.quantity - 1,
      });
    }
  };

  const showCartList = () => {
    setIsShowCartList(!isShowCartList);
  };

  const { data: cart } = useGetCartItemsQuery();
  if (!cart) {
    return null;
  }

  return (
    <Container className={styles.orderpage_container}>
      <h1 className={styles.title_section}>Оформление заказа</h1>

      <div className={styles.orderpage_spacer}>
        <div className={styles.cart_items}>
          <div className={styles.cart_items_section}>
            <OrderSectionHeader
              text="Корзина"
              showCartList={showCartList}
              isShowCartList={isShowCartList}
            />
            {isShowCartList && (
              <>
                {cart.data.length !== 0 && (
                  <button
                    className={styles.clear_cart_button}
                    onClick={handleDeleteItems}
                  >
                    <img src={TrashIcon} alt="Clear cart" />
                    <span>Очистить корзину</span>
                  </button>
                )}

                <div className={styles.cart_items_content}>
                  {cart.data.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      updateItemQuantity={updateItemQuantity}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className={styles.cart_items_section}>
            <OrderSectionHeader text="Персональные данные" />
          </div>
          <div className={styles.cart_items_section}>
            <OrderSectionHeader text="Адрес доставки" />
          </div>
        </div>

        <OrderInfoAside />
      </div>
    </Container>
  );
};
