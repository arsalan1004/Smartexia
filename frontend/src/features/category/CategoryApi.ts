import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for your API

// Define your API endpoints

export type CategoryType = {
  id: string;
  name: "Hub" | "Lighting" | "Security" | "Climate" | "Kitchen" | "Laundry";
};

export const CategoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.98.203:5022",
    prepareHeaders: (headers) => {
      // Set the Content-Type header to application/json
      headers.set("Content-Type", "application/json");
      console.log("headers Set @19");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: (category) => "/homepage/categories",
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetCategoriesQuery } = CategoryApi;
