import { createSlice } from "@reduxjs/toolkit";

export const closeOpenPizzaModal = createSlice({
  name: "pizzaModal",
  initialState: {
    id: 0,
    open: false,
  },

  reducers: {
    setOpenClose: (state, action) => {
      state.id = action.payload.id;
      state.open = action.payload.open;
    },
  },
});

export const { setOpenClose } = closeOpenPizzaModal.actions;
