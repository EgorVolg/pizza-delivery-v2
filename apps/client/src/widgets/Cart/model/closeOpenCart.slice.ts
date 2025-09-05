import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const closeOpenCartSlice = createSlice({
  name: "closeOpenCart",
  initialState: false,
  reducers: {
    setOpenCart: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setOpenCart } = closeOpenCartSlice.actions;
export default closeOpenCartSlice.reducer;
