import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GoogleLoginFields,
  LoginFormFields,
} from "../../screens/loggedOutStack/Login";

// TODO: Return type of LoginPostData

type ResponseType = {
  status: number;
  message: string;
};

export const loginDataApi = createApi({
  reducerPath: "loginDataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.2.103:5022",
    prepareHeaders: (headers) => {
      // Set the Content-Type header to application/json
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postLoginData: builder.mutation({
      query: (data: LoginFormFields) => ({
        url: "/login",
        method: "POST",
        body: data,
        //credentials: "same-origin",
      }),
    }),
    postGoogleLoginData: builder.mutation({
      query: (data: GoogleLoginFields) => ({
        url: "/googleSignup",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostLoginDataMutation, usePostGoogleLoginDataMutation } =
  loginDataApi;
