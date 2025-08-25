import { createSlice } from "@reduxjs/toolkit";

export interface FilterStateParams {
  type?: string[];
  isNew?: boolean;
  price?: [minPrice: number, maxPrice: number];
  ingredients?: number[];
}

const initialState = {
  type: [],
  isNew: false,
  price: [],
  ingredients: [],
};

export const filterParamsSlice = createSlice({
  name: "filterParams",
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.type = action.payload.type;
      state.isNew = action.payload.isNew;
      state.price = action.payload.price;
      state.ingredients = action.payload.ingredients;
    },
  },
});

export const { setParams } = filterParamsSlice.actions;
