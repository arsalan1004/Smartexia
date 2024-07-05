import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

type AuthState = {
  token: string;
  userId: number;
};

const initiatState: AuthState = {
  token: "",
  userId: 10,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initiatState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userId: number }>
    ) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.token = "";
      state.userId = -1;
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
