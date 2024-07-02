import { configureStore } from "@reduxjs/toolkit";
import { loginDataApi } from "./src/features/loginReg/loginDataApi";
import { RegDataApi } from "./src/features/loginReg/RegDataApi";
import { HomeProductApi } from "./src/features/products/HomeProductApi";
import HomeProductReducer from "./src/features/products/HomeProductSlice";
const store = configureStore({
  reducer: {
    [loginDataApi.reducerPath]: loginDataApi.reducer,
    [RegDataApi.reducerPath]: RegDataApi.reducer,
    [HomeProductApi.reducerPath]: HomeProductApi.reducer,
    homeProduct: HomeProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginDataApi.middleware,
      RegDataApi.middleware,
      HomeProductApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
