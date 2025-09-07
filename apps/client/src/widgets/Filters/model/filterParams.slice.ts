import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MAX_PRICE, MIN_PRICE } from "./filter.const";
import type { FilterStateParams } from "./filter.dto";

export const initialFilterParamsState: FilterStateParams = {
  type: [],
  isNew: false,
  price: [MIN_PRICE, MAX_PRICE],
  ingredients: [],
};

export const filterParamsSlice = createSlice({
  name: "filterParams",
  initialState: initialFilterParamsState,
  reducers: {
    setParams: (state, action: PayloadAction<FilterStateParams>) =>
      (state = action.payload),

    resetParams: (state) => (state = initialFilterParamsState),
  },
});

export const { setParams, resetParams } = filterParamsSlice.actions;
export default filterParamsSlice.reducer;
