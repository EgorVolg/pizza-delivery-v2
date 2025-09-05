import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  activeId: number;
}

const initialState: CategoryState = {
  activeId: 1,
};

export const activeCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveId(state, action: PayloadAction<number>) {
      state.activeId = action.payload;
    },
  },
});

export const { setActiveId } = activeCategorySlice.actions;
export default activeCategorySlice.reducer;
