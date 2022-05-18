import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginInputs, RegisterInputs } from "../types/type";
import { config, configLogin } from "../config";

export const URLRegister: string = process.env.NEXT_PUBLIC_URL_SIGNUP!;
export const URLLogin: string = process.env.NEXT_PUBLIC_URL_SIGNIN!;
export const URL: string = process.env.NEXT_PUBLIC_URL!;

export const userApi = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user: RegisterInputs) => ({
        url: URLRegister,
        headers: config,
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (user: LoginInputs) => ({
        url: URLLogin,
        headers: configLogin,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
