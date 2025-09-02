import { combineReducers } from "@reduxjs/toolkit";
import { pizzasApi } from "../entities/pizza/model/pizza.api";
import { categoriesApi } from "../entities/categories/model/categories.api";
import { ingredientsApi } from "../entities/ingredient/model/ingredient.api";
import { filterParamsSlice } from "../features/product-filter/model/filterParams.slice";
import { sortParamsSlice } from "../pages/home/components/Sort/sortParams.slice";

export const rootReducer = combineReducers({
  //api reducers
  [pizzasApi.reducerPath]: pizzasApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,

  // client reducers
  filterParams: filterParamsSlice.reducer,
  sortParams: sortParamsSlice.reducer,
});
