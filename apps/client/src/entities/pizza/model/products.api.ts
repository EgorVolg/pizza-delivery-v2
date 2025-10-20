import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PizzaAPI } from "./pizza.types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<PizzaAPI[], void>({
      query: () => "/products", // GET /api/pizzas
      providesTags: ["Products"],
    }),

    getProductById: builder.query<PizzaAPI, number>({
      query: (id: number) => `/products/${id}`, // GET /api/pizzas/:id
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
