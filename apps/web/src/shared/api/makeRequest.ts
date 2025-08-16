import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5000/api";

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["hello"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  endpoints: (builder) => ({
    sayHello: builder.query({
      query: () => "/hello",
      providesTags: [{ type: "hello" }],
    }),
  }),
});

export const { useSayHelloQuery } = api;
