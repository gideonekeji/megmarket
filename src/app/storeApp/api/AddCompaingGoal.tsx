import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the base URL for the API
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const AddCompaingGoal = createApi({
  reducerPath: "AddCompaingGoal",
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
    AddCompaingGoal: builder.mutation({
      query: (AddCompaingGoal) => ({
        url: "add-goals",
        method: "POST",
        body: AddCompaingGoal,
      }),
    }),
  }),
});

export const { useAddCompaingGoalMutation } = AddCompaingGoal;
