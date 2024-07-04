import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeProductType } from "../../screens/loggedInStack/homeTabs/Home";

export const HomeProductApi = createApi({
  reducerPath: "homeProductApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.100:5022" }),
  endpoints: (builder) => ({
    getHomeProducts: builder.query({
      query: (type) => ({ url: `${type}`, method: "GET" }),
    }),
  }),
});

export const { useGetHomeProductsQuery } = HomeProductApi;
