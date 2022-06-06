import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginInputs,
  RegisterInputs,
  SubscriptionsType,
  SubscriptionType,
} from "../types/type";
import { config, configLogin, URL } from "../config";

export const userApi = createApi({
  reducerPath: "User",
  baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (user: RegisterInputs) => ({
        url: `${URL}/users/sign-up`,
        headers: config,
        method: "POST",
        body: user,
      }),
    }),
    signIn: builder.mutation({
      query: (user: LoginInputs) => ({
        url: `${URL}/users/sign-in`,
        headers: configLogin,
        method: "POST",
        body: user,
      }),
    }),
    buySubscription: builder.mutation({
      query: (subscription: SubscriptionType) => ({
        url: `${URL}/payments/buy`,
        headers: configLogin,
        method: "POST",
        body: subscription,
      }),
    }),
    //getSubscriptions: builder.query<SubscriptionsType, string>({
    //  query: () => ({
    //    url: `${URL}/subscribe/self`,
    //    headers: configLogin,
    //  }),
    //}),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useBuySubscriptionMutation,
  //useGetSubscriptionsQuery,
} = userApi;
