import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const closeOpenCartSlice = createSlice({
  name: "closeOpenCart",
  initialState: false,
  reducers: {
    setCloseOpenCart: (_, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export const { setCloseOpenCart } = closeOpenCartSlice.actions;
export default closeOpenCartSlice.reducer;
