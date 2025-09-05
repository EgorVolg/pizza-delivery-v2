import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { pizzasApi } from "../entities/pizza/model/pizza.api"; 
import { ingredientsApi } from "../entities/ingredient/model/ingredient.api";
import { categoriesApi } from "../entities/topbar/categories/model/categories.api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(
      pizzasApi.middleware,
      categoriesApi.middleware,
      ingredientsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
