import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Topping } from "./pizza.types";

export const coffeeToppingsApi = createApi({
  reducerPath: "coffeeToppingsApi",
  baseQuery,
  tagTypes: ["CoffeeToppings"],
  endpoints: (builder) => ({
    getCoffeeToppings: builder.query<Topping[], void>({
      query: () => "/coffeetoppings", // GET /api/coffeeToppings
      providesTags: ["CoffeeToppings"],
    }),
  }),
});

export const { useGetCoffeeToppingsQuery } = coffeeToppingsApi;
