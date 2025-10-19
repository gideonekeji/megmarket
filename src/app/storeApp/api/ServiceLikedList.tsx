import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetlikedservicesRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const ServiceLikedList = createApi({
  reducerPath: "ServiceLikedList",
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
    serviceLikedList: builder.query<GetlikedservicesRes, { user_id: string }>({
      query: ({ user_id }) => ({
        url: "get-likedservices",
        method: "POST",
        body: new URLSearchParams({ user_id }),
      }),
    }),
  }),
});

export const { useServiceLikedListQuery } = ServiceLikedList;
