import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for your API

// Define your API endpoints

export type CategoryProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
};

export const CategoryProductsApi = createApi({
  reducerPath: "categoryProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.2.100:5022",
    // prepareHeaders: (headers) => {
    //   // Set the Content-Type header to application/json
    //   headers.set("Content-Type", "application/json");
    //   console.log("headers Set @19");
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getCategoryProducts: builder.mutation<CategoryProductType[], number>({
      query: (categoryId: number) => ({
        url: "/categoryproducts",
        method: "POST",
        body: { categoryId: Number(categoryId) },
      }),
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetCategoryProductsMutation } = CategoryProductsApi;
