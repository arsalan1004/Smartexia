import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeProductType } from "../../screens/loggedInStack/homeTabs/Home";
import {
  Brand,
  ProductType,
  Protocol,
  SubCategory,
} from "../products/HomeProductSlice";

export type SearchQueryType = {
  searchQuery: string;
  filters: {
    SubCategory: (SubCategory | null)[] | null;
    // brand: Brand | null,
    // protocol: Protocol | null
  };
  priceRange: {
    min: number | null;
    max: number | null;
  };
};

export const SearchResultApi = createApi({
  reducerPath: "searchResultApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.100:5022" }),
  endpoints: (builder) => ({
    getSearchedProducts: builder.mutation<ProductType[], SearchQueryType>({
      query: (searchQuery) => ({
        url: "/search",
        method: "POST",
        body: searchQuery,
        //credentials: "same-origin",
      }),
    }),
  }),
});

export const { useGetSearchedProductsMutation } = SearchResultApi;
