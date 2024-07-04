import { configureStore } from "@reduxjs/toolkit";
import { loginDataApi } from "./src/features/loginReg/loginDataApi";
import { RegDataApi } from "./src/features/loginReg/RegDataApi";
import { HomeProductApi } from "./src/features/products/HomeProductApi";
import HomeProductReducer from "./src/features/products/HomeProductSlice";
import { SearchResultApi } from "./src/features/searchProductResults/SearchResultsApi";
import { CategoryApi } from "./src/features/category/CategoryApi";
import { CategoryProductsApi } from "./src/features/categoryProducts/CategoryProductsApi";

import SearchProductReducer from "./src/features/search/SearchProductSlice";
const store = configureStore({
  reducer: {
    [loginDataApi.reducerPath]: loginDataApi.reducer,
    [RegDataApi.reducerPath]: RegDataApi.reducer,
    [HomeProductApi.reducerPath]: HomeProductApi.reducer,
    [SearchResultApi.reducerPath]: SearchResultApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [CategoryProductsApi.reducerPath]: CategoryProductsApi.reducer,
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
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
