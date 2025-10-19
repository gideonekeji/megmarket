import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api/";

export const deleteuseraccount = createApi({
  reducerPath: "deleteuseraccount",
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
    deleteAccount: builder.mutation<void, { user_id: string }>({
      query: ({ user_id }) => ({
        url: "delete-useraccount",
        method: "POST",
        body: new URLSearchParams({ user_id }), // Send the user_id in the body
      }),
    }),
  }),
});

export const { useDeleteAccountMutation } = deleteuseraccount;
