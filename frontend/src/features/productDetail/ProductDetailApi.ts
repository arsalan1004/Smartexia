import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Brand, ProductType, Protocol } from "../products/HomeProductSlice";
import { CategoryProductType } from "../categoryProducts/CategoryProductsApi";
import { CategoryType } from "../category/CategoryApi";

// Currently Average Rating is not in response so hardcode at product page
// export type ProductDetailType = CategoryProductType & {

// }

export type Firmware = "1.0.0" | "1.1.0" | "1.2.0" | "2.0.0" | "2.1.0";
export type NetworkBand = "2.4G" | "5G";

export type ReviewType = {
  userName: string;
  rating: number | string;
  comment: string;
  date: string;
};

export type ProductDetailType = CategoryProductType & {
  description: string;
  brand: Brand;
  specifications: {
    firmware: Firmware;
    protocol: Protocol;
    networkBand: NetworkBand;
  };
  category: CategoryType["name"];
  reviews: ReviewType[];
};

export const ProductDetailApi = createApi({
  reducerPath: "productDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.100:5022" }),
  endpoints: (builder) => ({
    getProductDetails: builder.mutation<ProductDetailType, number>({
      query: (productId: number) => ({
        url: "/api/productDetails",
        method: "POST",
        body: { productId: productId },
      }),
    }),
  }),
});

export const { useGetProductDetailsMutation } = ProductDetailApi;
