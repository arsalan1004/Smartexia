import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginFormFields } from "../../screens/loggedOutStack/Login";
import { RegistrationFormFields } from "../../screens/loggedOutStack/Registration";

// TODO: Return type of LoginPostData

export const RegDataApi = createApi({
  reducerPath: "RegDataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    postRegData: builder.mutation({
      query: (data: Omit<RegistrationFormFields, "confirmPassword">) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostRegDataMutation } = RegDataApi;
