import { configureStore } from "@reduxjs/toolkit";
import { loginDataApi } from "./src/features/loginReg/loginDataApi";
import { RegDataApi } from "./src/features/loginReg/RegDataApi";
import { HomeProductApi } from "./src/features/products/HomeProductApi";
import HomeProductReducer from "./src/features/products/HomeProductSlice";
import { SearchResultApi } from "./src/features/searchProductResults/SearchResultsApi";
import { CategoryApi } from "./src/features/category/CategoryApi";
import { CategoryProductsApi } from "./src/features/categoryProducts/CategoryProductsApi";

import SearchProductReducer from "./src/features/search/SearchProductSlice";
import { ProductDetailApi } from "./src/features/productDetail/ProductDetailApi";
import AuthSliceReducer from "./src/features/auth/AuthSlice";
import { CartApi } from "./src/features/cart/CartApi";
import { CheckoutApi } from "./src/features/checkout/CheckoutApi";

const store = configureStore({
  reducer: {
    [loginDataApi.reducerPath]: loginDataApi.reducer,
    [RegDataApi.reducerPath]: RegDataApi.reducer,
    [HomeProductApi.reducerPath]: HomeProductApi.reducer,
    [SearchResultApi.reducerPath]: SearchResultApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [CategoryProductsApi.reducerPath]: CategoryProductsApi.reducer,
    [ProductDetailApi.reducerPath]: ProductDetailApi.reducer,
    [CheckoutApi.reducerPath]: CheckoutApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    auth: AuthSliceReducer,
    homeProduct: HomeProductReducer,
    searchProduct: SearchProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginDataApi.middleware,
      RegDataApi.middleware,
      HomeProductApi.middleware,
      SearchResultApi.middleware,
      CategoryApi.middleware,
      CategoryProductsApi.middleware,
      ProductDetailApi.middleware,
      CartApi.middleware,
      CheckoutApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
