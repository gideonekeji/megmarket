import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const AddSociallogin = createApi({
  reducerPath: "AddSociallogin",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    AddSociallogin: builder.mutation({
      query: (AddSocialloginData) => ({
        url: "social-login",
        method: "POST",
        body: AddSocialloginData,
      }),
    }),
  }),
});

export const { useAddSocialloginMutation } = AddSociallogin;
