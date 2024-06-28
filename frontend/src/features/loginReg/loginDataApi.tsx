import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GoogleLoginFields,
  LoginFormFields,
} from "../../screens/loggedOutStack/Login";

// TODO: Return type of LoginPostData

export const loginDataApi = createApi({
  reducerPath: "loginDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    postLoginData: builder.mutation({
      query: (data: LoginFormFields) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    postGoogleLoginData: builder.mutation({
      query: (data: GoogleLoginFields) => ({
        url: "/login/google",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostLoginDataMutation, usePostGoogleLoginDataMutation } =
  loginDataApi;
