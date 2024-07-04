import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormFields } from "../../screens/loggedOutStack/Login";
import { RegistrationFormFields } from "../../screens/loggedOutStack/Registration";

// TODO: Return type of LoginPostData

export const RegDataApi = createApi({
  reducerPath: "RegDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.103:5022" }),
  endpoints: (builder) => ({
    postRegData: builder.mutation({
      query: (data: Omit<RegistrationFormFields, "confirmPassword">) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostRegDataMutation } = RegDataApi;
