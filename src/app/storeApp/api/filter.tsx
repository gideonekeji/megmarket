import { FilterRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the base URL for the API
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const filter = createApi({
  reducerPath: "filter",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("nlyticalwebtoken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    filter: builder.mutation<FilterRes, FilterRes>({
      query: (filter) => ({
        url: "filter",
        method: "POST",
        body: filter,
      }),
    }),
  }),
});

export const { useFilterMutation } = filter;
