import { configureStore } from "@reduxjs/toolkit";
import { loginDataApi } from "./src/features/loginReg/loginDataApi";
import { RegDataApi } from "./src/features/loginReg/RegDataApi";

const store = configureStore({
  reducer: {
    [loginDataApi.reducerPath]: loginDataApi.reducer,
    [RegDataApi.reducerPath]: RegDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      loginDataApi.middleware,
      RegDataApi.middleware,
    ]),
});

export default store;
