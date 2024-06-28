import React, { createContext } from "react";

type AuthContextType = {
  promptAsync: () => void;
};

const AuthContext = createContext<AuthContextType>({
  promptAsync: () => {},
});

type AuthContextProvider = {
  children: React.ReactNode;
  value: AuthContextType;
};

export const AuthProvider = ({ children, value }: AuthContextProvider) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

export default AuthContext;
