import { combineReducers } from "@reduxjs/toolkit";
import { pizzasApi } from "../entities/pizza/model/pizza.api";
import { categoriesApi } from "../entities/topbar/categories/model/categories.api";
import { ingredientsApi } from "../entities/ingredient/model/ingredient.api";

import { sortParamsSlice } from "../entities/topbar/sort-popup/model/sortParams.slice";
import { activeCategorySlice } from "../entities/topbar/categories/model/activeCategories.slice";
import { closeOpenCartSlice } from "../widgets/Cart/model/closeOpenCart.slice";
import { filterParamsSlice } from "../widgets/Filters/model/filterParams.slice";
import { closeOpenPizzaModal } from "../features/add-pizza/closeOpenPizzaModal.slice";
import { pizzaToppingsApi } from "../entities/pizza/model/pizzatoppings.api";

export const rootReducer = combineReducers({
  //api reducers
  [pizzasApi.reducerPath]: pizzasApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [ingredientsApi.reducerPath]: ingredientsApi.reducer,
  [pizzaToppingsApi.reducerPath]: pizzaToppingsApi.reducer,

  // client reducers
  filterParams: filterParamsSlice.reducer,
  sortParams: sortParamsSlice.reducer,
  closeOpenCart: closeOpenCartSlice.reducer,
  setActiveId: activeCategorySlice.reducer,
  openClose: closeOpenPizzaModal.reducer,
});
