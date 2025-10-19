import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TermconditionRes } from "@/app/types/Restypes"; // Assuming the same type from the original code

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const termAndcondition = createApi({
  reducerPath: "termAndcondition",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    termAndcondition: builder.query<TermconditionRes, void>({
      query: () => "get-termsconditions",
    }),
  }),
});

export const { useTermAndconditionQuery } = termAndcondition;
