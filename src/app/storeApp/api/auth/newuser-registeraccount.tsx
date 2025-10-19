import { AddUserRegistrationRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://web.nlytical.online/api";


export const NewUserRegisterAccount = createApi({
  reducerPath: "NewUserRegisterAccount",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    RegisterAccount: builder.mutation<
      AddUserRegistrationRes,
      AddUserRegistrationRes
    >({
      query: (NewUserRegisterAccount) => ({
        url: "newuser-registeraccount",
        method: "POST",
        body: NewUserRegisterAccount,
      }),
    }),
  }),
});

export const { useRegisterAccountMutation } = NewUserRegisterAccount;
