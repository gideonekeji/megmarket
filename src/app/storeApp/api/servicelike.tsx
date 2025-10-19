import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// API Base URL
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const servicelike = createApi({
  reducerPath: "servicelike",
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
    servicelike: builder.mutation<void, { user_id: string; service_id: string }>({
      query: ({ user_id, service_id }) => ({
        url: "service-like",
        method: "POST",
        body: new URLSearchParams({
          user_id,
          service_id,
        }),
      }),
    }),
  }),
});

// Export the hook for mutation
export const { useServicelikeMutation } = servicelike;
