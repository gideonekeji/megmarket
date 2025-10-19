import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const RegisterModalVerifyOtp = createApi({
  reducerPath: "RegisterModalVerifyOtp",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    RegisterModalVerifyOtp: builder.mutation({
      query: (RegisterModalVerifyOtp) => ({
        url: "verify-user",
        method: "POST",
        body: RegisterModalVerifyOtp,
      }),
    }),
  }),
});

export const { useRegisterModalVerifyOtpMutation } = RegisterModalVerifyOtp;
