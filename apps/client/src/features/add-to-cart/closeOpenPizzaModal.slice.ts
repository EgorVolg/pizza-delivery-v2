import { createSlice } from "@reduxjs/toolkit";

export const closeOpenPizzaModalSlice = createSlice({
  name: "pizzaModal",
  initialState: {
    id: 0,
    open: false,
  },

  reducers: {
    setOpenClosePizzaModal: (state, action) => {
      state.id = action.payload.id;
      state.open = action.payload.open;
    },
  },
});

export const { setOpenClosePizzaModal } = closeOpenPizzaModalSlice.actions;
