// shared/api/baseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBaseUrl = () => {
  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:5000/api";
  }

  return "http://192.168.0.199:5000/api";
};

export const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
});
