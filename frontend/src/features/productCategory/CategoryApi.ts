import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for your API

// Define your API endpoints
export const CategoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.100:5022" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categoryproducts",
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetCategoriesQuery } = CategoryApi;
