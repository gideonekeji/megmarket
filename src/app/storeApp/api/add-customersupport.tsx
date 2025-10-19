import { AddCustomerSupportRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const AddCustomerSupport = createApi({
  reducerPath: "AddCustomerSupport",
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
    addCustomerSupport: builder.mutation<
      AddCustomerSupportRes,
      AddCustomerSupportRes
    >({
      query: (customerSupportData) => ({
        url: "add-customersupport",
        method: "POST",
        body: customerSupportData,
      }),
    }),
  }),
});

export const { useAddCustomerSupportMutation } = AddCustomerSupport;
