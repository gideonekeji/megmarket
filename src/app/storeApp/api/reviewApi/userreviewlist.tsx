import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyReviewList } from "@/app/types/Restypes";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const userReviewlist = createApi({
  reducerPath: "userReviewlist",
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
    getAllReview: builder.query<MyReviewList, { user_id: string; page_no: string }>({
      query: ({ user_id, page_no }) => ({
        url: "user-reviewlist",
        method: "POST",
        body: new URLSearchParams({ user_id, page_no }),
      }),
    }),
  }),
});

export const { useGetAllReviewQuery } = userReviewlist;
