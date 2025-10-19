import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// API Base URL
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const appfeedback = createApi({
  reducerPath: "appfeedback",
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
    appfeedback: builder.mutation<void, { user_id: string; feedback_review: string }>({
      query: ({ user_id, feedback_review }) => ({
        url: "app-feedback",
        method: "POST",
        body: new URLSearchParams({
          user_id,
          feedback_review,
        }),
      }),
    }),
  }),
});

export const { useAppfeedbackMutation } = appfeedback;
