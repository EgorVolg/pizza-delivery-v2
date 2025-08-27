import { createSlice } from "@reduxjs/toolkit";

export const initialFilterParamsState = {
  type: [],
  isNew: false,
  price: [],
  ingredients: [],
};

export const filterParamsSlice = createSlice({
  name: "filterParams",
  initialState: initialFilterParamsState,
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
