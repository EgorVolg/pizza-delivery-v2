import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const closeOpenCartSlice = createSlice({
  name: "closeOpenCart",
  initialState: false,
  reducers: {
    setCloseOpenCart: (state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setCloseOpenCart } = closeOpenCartSlice.actions;
export default closeOpenCartSlice.reducer;
