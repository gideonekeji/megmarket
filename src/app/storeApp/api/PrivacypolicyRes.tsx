import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TermconditionRes } from "@/app/types/Restypes"; // Assuming the same type from the original code

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const PrivacypolicyRes = createApi({
  reducerPath: "PrivacypolicyRes",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    PrivacypolicyRes: builder.query<TermconditionRes, void>({
      query: () => "get-privacypolicy",
    }),
  }),
});

export const { usePrivacypolicyResQuery } = PrivacypolicyRes;
