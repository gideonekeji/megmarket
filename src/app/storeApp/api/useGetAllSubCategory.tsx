import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllSubCategoryRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const GetAllSubCategory = createApi({
  reducerPath: "GetAllSubCategory",
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
    getSubCategories: builder.query<
      GetAllSubCategoryRes,
      { category_id: string }
    >({
      query: ({ category_id }) => ({
        url: "get-subcategory",
        method: "POST",
        body: new URLSearchParams({ category_id }),
      }),
    }),
  }),
});

export const { useGetSubCategoriesQuery } = GetAllSubCategory;
