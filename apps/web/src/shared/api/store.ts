import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "../api/makeRequest";
import { sayHelloSlice } from "./slices/pizzaSlice";

const reducers = combineReducers({
  hello: sayHelloSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
