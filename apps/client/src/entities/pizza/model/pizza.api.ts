import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Pizza } from "./pizza.types";

export const pizzasApi = createApi({
  reducerPath: "pizzaApi",
  baseQuery,
  tagTypes: ["Pizza"],
  endpoints: (builder) => ({
    getPizzas: builder.query<Pizza[], void>({
      query: () => "/pizzas", // GET /api/pizzas
      providesTags: ["Pizza"],
    }),
  }),
});

export const { useGetPizzasQuery } = pizzasApi;
