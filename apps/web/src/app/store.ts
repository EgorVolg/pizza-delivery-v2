import { configureStore } from '@reduxjs/toolkit'; 
import { rootReducer } from './rootReducer';
import { pizzasApi } from '../entities/pizza/model/pizza.api';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(
      pizzasApi.middleware, 
    ),
});