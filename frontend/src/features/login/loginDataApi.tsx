import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormFields } from "../../screens/loggedOutStack/Login";

export const loginDataApi = createApi({
  reducerPath: "loginDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    postLoginData: builder.mutation({
      query: (data: FormFields) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostLoginDataMutation } = loginDataApi;
