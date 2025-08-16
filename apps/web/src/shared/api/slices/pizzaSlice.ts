import { createSlice } from "@reduxjs/toolkit";

export const sayHelloSlice = createSlice({
    name: "hello",
    initialState: "",
    reducers: {
        sayHelloAction: (state, action) => {
            state = action.payload
        }
    }
});

export const { sayHelloAction } = sayHelloSlice.actions; 