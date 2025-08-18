import { configureStore } from '@reduxjs/toolkit'; 
import { rootReducer } from './rootReducer';
import { pizzasApi } from '../entities/pizza/model/pizza.api';
import { categoriesApi } from '../entities/categories/model/categories.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(
      pizzasApi.middleware, 
      categoriesApi.middleware
    ),
});