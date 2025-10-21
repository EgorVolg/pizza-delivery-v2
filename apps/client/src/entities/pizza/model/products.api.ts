import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PizzaAPI, ProductFilters } from "./pizza.types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<PizzaAPI[], ProductFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (!filters) return "products";

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "")
            params.append(key, String(value));
        });

        return `products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),

    getProductById: builder.query<PizzaAPI, number>({
      query: (id: number) => `/products/${id}`, // GET /api/pizzas/:id
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
