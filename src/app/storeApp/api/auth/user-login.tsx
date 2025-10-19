import { LoginUserRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const LoginUser = createApi({
  reducerPath: "LoginUser",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserRes, LoginUserRes>({
      query: (loginUserdata) => ({
        url: "user-login",
        method: "POST",
        body: loginUserdata,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = LoginUser;
