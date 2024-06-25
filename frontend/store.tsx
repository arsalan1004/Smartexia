import { configureStore } from "@reduxjs/toolkit";
import { loginDataApi } from "./src/features/login/loginDataApi";

const store = configureStore({
  reducer: {
    [loginDataApi.reducerPath]: loginDataApi.reducer,
  },
});

export default store;
