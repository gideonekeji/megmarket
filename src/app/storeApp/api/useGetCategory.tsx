import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllCategoryRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const GetAllCategory = createApi({
  reducerPath: "GetAllCategory",
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
    getCategories: builder.query<GetAllCategoryRes, void>({
      query: () => "get-category",
    }),
  }),
});

export const { useGetCategoriesQuery } = GetAllCategory;
