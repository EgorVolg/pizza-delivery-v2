import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

import { ingredientsApi } from "../entities/ingredient/model/ingredient.api";
import { categoriesApi } from "../entities/topbar/categories/model/categories.api";
import { pizzaToppingsApi } from "../entities/products/model/pizzatoppings.api";
import { cartApi } from "../entities/cart/model/cart.api";
import { productsApi } from "../entities/products/model/products.api";
import { coffeeToppingsApi } from "../entities/products/model/coffeetoppings.api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(
      productsApi.middleware,
      categoriesApi.middleware,
      ingredientsApi.middleware,
      pizzaToppingsApi.middleware,
      coffeeToppingsApi.middleware,
      cartApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
