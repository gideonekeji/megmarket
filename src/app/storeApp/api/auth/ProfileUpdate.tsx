import { ProfileUpdate } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define the base URL for the API
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";

export const updateuserprofile = createApi({
  reducerPath: "updateuserprofile",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      // Try to get the token from cookies first
      const cookieToken = Cookies.get("nlyticalwebtoken");

      // If not in cookies, get it from Redux state
      const reduxToken = (getState() as any)?.auth?.token;

      const token = cookieToken || reduxToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    UpdateProfile: builder.mutation<ProfileUpdate, ProfileUpdate>({
      query: (updateuserprofile) => ({
        url: "update-userprofile",
        method: "POST",
        body: updateuserprofile,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateuserprofile;
