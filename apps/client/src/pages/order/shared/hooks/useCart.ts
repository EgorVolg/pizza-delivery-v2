import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemsMutation,
  useClearCartMutation,
} from "../../../../entities/cart/model/cart.api";
import type { TCartItem } from "../../../../entities/cart/model/cart.types";

export const useCart = () => {
  const { data: cart } = useGetCartItemsQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItemsGroup] = useDeleteCartItemsMutation();
  const [clearCart] = useClearCartMutation();

  const isEmpty = !cart || cart.data.length === 0;

  const deleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const deleteItems = (id: number) => {
    deleteCartItemsGroup(id);
  };

  const handleClearCartItems = () => {
    clearCart();
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

  return {
    cart,
    isEmpty,
    deleteItem,
    deleteItems,
    handleClearCartItems,
    updateItemQuantity,
  };
};
