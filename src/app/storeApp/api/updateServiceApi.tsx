// Redux API (updateService.ts)
import { ServiceUpdateRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the base URL for the API
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const updateService = createApi({
  reducerPath: "updateService",
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
    updateService: builder.mutation<ServiceUpdateRes, ServiceUpdateRes>({
      query: (updateService) => ({
        url: "update-service",
        method: "POST",
        body: updateService,
      }),
    }),
  }),
});

export const { useUpdateServiceMutation } = updateService;
