import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { deleteCartItem } from "./CartSlice";

// Define the base URL for your API

// Define your API endpoints

export type CartItemType = {
  productId: number;
  productName: string;
  productQuantity: number;
  productPrice: number;
  image: string;
};

export type QuantityControlArgType = {
  userId: number;
  productId: number;
  quantity: number;
};

export const CartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.2.100:5022" }),
  endpoints: (builder) => ({
    getCartItems: builder.mutation<CartItemType[] | [], number>({
      query: (userId: number) => ({
        url: "/cart/get",
        method: "POST",
        body: userId,
      }),
    }),
    incrementQuantity: builder.mutation<CartItemType, QuantityControlArgType>({
      query: (quantityObject: QuantityControlArgType) => ({
        url: "/cart/increment",
        method: "POST",
        body: quantityObject,
      }),
    }),
    decrementQuantity: builder.mutation<CartItemType, QuantityControlArgType>({
      query: (quantityObject: QuantityControlArgType) => ({
        url: "/cart/decrement",
        method: "POST",
        body: quantityObject,
      }),
    }),
    deleteCartItem: builder.mutation<CartItemType, QuantityControlArgType>({
      query: (quantityObject: Omit<QuantityControlArgType, "quantity">) => ({
        url: "/cart/delete",
        method: "POST",
        body: quantityObject,
      }),
    }),
  }),
});

// Export hooks for using the API endpoints
export const {
  useGetCartItemsMutation,
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
  useDeleteCartItemMutation,
} = CartApi;
