import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const sortParamsSlice = createSlice({
  name: "sortParams",
  initialState: "рейтингу",
  reducers: {
    sortParams: (_, action: PayloadAction<string>) => {
     return action.payload;
    },
  },
});

export const { sortParams } = sortParamsSlice.actions;
export default sortParamsSlice.reducer;
