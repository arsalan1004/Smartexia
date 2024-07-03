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
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.100:5022" }),
  endpoints: (builder) => ({
    getCategoryProducts: builder.mutation<CategoryProductType[], string>({
      query: (categoryId: string) => ({
        url: "/categoryproducts",
        method: "POST",
        data: categoryId,
      }),
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetCategoryProductsMutation } = CategoryProductsApi;
