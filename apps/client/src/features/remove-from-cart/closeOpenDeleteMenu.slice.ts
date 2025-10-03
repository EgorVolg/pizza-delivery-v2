import { createSlice } from "@reduxjs/toolkit";

export const closeOpenDeleteMenuSlice = createSlice({
  name: "deleteMenu",
  initialState: false,

  reducers: {
    setCloseOpenDeleteMenu: (state, action) => {
      return console.log(action.payload, "Triggered"), action.payload;
      
    },
  },
});

export const { setCloseOpenDeleteMenu } = closeOpenDeleteMenuSlice.actions;
