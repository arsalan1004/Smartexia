import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for your API

// Define your API endpoints

export const CheckoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.2.100:5022",
    prepareHeaders: (headers) => {
      // Set the Content-Type header to application/json
      headers.set("Content-Type", "application/json");
      console.log("headers Set @19");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaymentSecrets: builder.mutation({
      query: (amount: number) => ({
        url: "/checkout/payment",
        method: "POST",
        body: { amount: amount },
      }),
    }),
  }),
});

// Export hooks for using the API endpoints
export const { useGetPaymentSecretsMutation } = CheckoutApi;
