import { RegisterModalVerifyOtpRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const ForgotPasswordVerifyOtp = createApi({
  reducerPath: "ForgotPasswordVerifyOtp",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    ForgotPasswordVerifyOtp: builder.mutation<
      RegisterModalVerifyOtpRes,
      RegisterModalVerifyOtpRes
    >({
      query: (ForgotPasswordVerifyOtp) => ({
        url: "passwordotp-verify",
        method: "POST",
        body: ForgotPasswordVerifyOtp,
      }),
    }),
  }),
});

export const { useForgotPasswordVerifyOtpMutation } = ForgotPasswordVerifyOtp;
