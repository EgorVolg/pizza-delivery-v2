import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

import { ingredientsApi } from "../entities/ingredient/model/ingredient.api";
import { categoriesApi } from "../entities/topbar/categories/model/categories.api";
import { pizzaToppingsApi } from "../entities/pizza/model/pizzatoppings.api";
import { cartApi } from "../entities/cart/model/cart.api";
import { productsApi } from "../entities/pizza/model/products.api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(
      productsApi.middleware,
      categoriesApi.middleware,
      ingredientsApi.middleware,
      pizzaToppingsApi.middleware,
      cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
