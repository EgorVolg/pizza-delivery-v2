import { baseQuery } from "../../../shared/api/baseUrl";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Ingredient } from "./ingredient.types";

export const ingredientsApi = createApi({
  reducerPath: "ingredientsApi",
  baseQuery,
  tagTypes: ["Ingredients"],
  endpoints: (builder) => ({
    getIngredients: builder.query<Ingredient[], void>({
      query: () => "/ingredients",  
      providesTags: ["Ingredients"],
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
