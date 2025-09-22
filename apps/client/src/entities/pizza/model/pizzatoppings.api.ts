import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { PizzaToppings } from "./pizza.types";

export const pizzaToppingsApi = createApi({
  reducerPath: "pizzaToppingsApi",
  baseQuery,
  tagTypes: ["PizzaToppings"],
  endpoints: (builder) => ({
    getPizzaToppings: builder.query<PizzaToppings[], void>({
      query: () => "/pizzaToppings", // GET /api/pizzasToppings
      providesTags: ["PizzaToppings"],
    }),
  }),
});

export const { useGetPizzaToppingsQuery } = pizzaToppingsApi;
