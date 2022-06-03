import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//такие типы отсутствуют
import { AuthInputs } from "../types/type";
import { config, configLogin } from "../config";

// export const URLRegister: string = process.env.NEXT_PUBLIC_URL_SIGNUP!;
// export const URLLogin: string = process.env.NEXT_PUBLIC_URL_SIGNIN!;
export const URL: string = process.env.NEXT_PUBLIC_URL!;

export const userApi = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user: AuthInputs) => ({
        //baseUrl уже есть. избыточно его еще раз прописывать
        url: `/users/sign-up`,
        headers: config,
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (user: AuthInputs) => ({
        url: `/users/sign-in`,
        headers: config,
        method: "POST",
        body: user,
      }),
    }),
    buySubscription: builder.mutation({
      query: (subscription) => ({
        url: `/payments/buy`,
        headers: configLogin,
        method: "POST",
        body: subscription,
      }),
    }),
    activateCode: builder.mutation({
      query: (code) => ({
        url: `/code/activate`,
        headers: configLogin,
        method: "POST",
        body: code,
      }),
    }),
    changePersonalInfo: builder.mutation({
      query: (personalInfo) => ({
        url: `/users`,
        headers: configLogin,
        method: "PATCH",
        body: personalInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: (password) => ({
        url: `/users/update-password`,
        headers: configLogin,
        method: "PATCH",
        body: password,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useBuySubscriptionMutation,
  useActivateCodeMutation,
  useChangePersonalInfoMutation,
  useChangePasswordMutation,
} = userApi;
