import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the base URL for the API
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const Addcampaign = createApi({
  reducerPath: "Addcampaign",
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
    Addcampaign: builder.mutation({
      query: (Addcampaign) => ({
        url: "add-campaign",
        method: "POST",
        body: Addcampaign,
      }),
    }),
  }),
});

export const { useAddcampaignMutation } = Addcampaign;
