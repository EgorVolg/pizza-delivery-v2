import { createSlice } from "@reduxjs/toolkit";

export const closeOpenPizzaModalSlice = createSlice({
  name: "pizzaModal",
  initialState: {
    id: 0,
    open: false,
    categoryId: 0,
  },

  reducers: {
    setOpenClosePizzaModal: (state, action) => {
      state.id = action.payload.id;
      state.open = action.payload.open;
      state.categoryId = action.payload.categoryId;
    },
  },
});

export const { setOpenClosePizzaModal } = closeOpenPizzaModalSlice.actions;
