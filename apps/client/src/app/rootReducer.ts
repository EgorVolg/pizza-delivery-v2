import { combineReducers } from "@reduxjs/toolkit"; 
import { pizzasApi } from "../entities/pizza/model/pizza.api";
import { categoriesApi } from "../entities/categories/model/categories.api";
import { ingredientsApi } from "../entities/ingredient/model/ingredient.api";

export const rootReducer = combineReducers({
  [pizzasApi.reducerPath]: pizzasApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer
});
