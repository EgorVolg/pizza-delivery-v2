import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react"; 
import type { CartItem } from "./cart.types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItem[], void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<CartItem, CartItem>({
      query: (cartItem: CartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartItemsQuery, useAddCartItemMutation } = cartApi;
