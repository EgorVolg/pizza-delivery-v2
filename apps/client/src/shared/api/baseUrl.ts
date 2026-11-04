// shared/api/baseQuery.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://pizza-delivery-v2-server-vvep.vercel.app/api",
});
