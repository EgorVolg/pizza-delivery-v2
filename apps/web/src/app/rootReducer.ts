import { combineReducers } from "@reduxjs/toolkit"; 
import { pizzasApi } from "../entities/pizza/model/pizza.api";

export const rootReducer = combineReducers({
  [pizzasApi.reducerPath]: pizzasApi.reducer,
});
