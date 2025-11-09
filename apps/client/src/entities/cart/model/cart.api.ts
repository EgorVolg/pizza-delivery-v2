import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { TCartItem, CartResponse, AddCartItemRequest } from "./cart.types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCartItems: builder.query<CartResponse, void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addCartItem: builder.mutation<TCartItem, AddCartItemRequest>({
      query: (cartItem: AddCartItemRequest) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItems: builder.mutation<string, number>({
      query: (id: number) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCartItem: builder.mutation<string, number>({
      query: (id: number) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<TCartItem, TCartItem>({
      query: (cartItem: TCartItem) => ({
        url: `/cart/${cartItem.id}`,
        method: "PUT",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useDeleteCartItemsMutation,
  useUpdateCartItemMutation,
} = cartApi;
