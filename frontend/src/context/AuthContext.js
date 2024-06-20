import React, { createContext, useContext } from "react";

const AuthContext = createContext({
  promptAsync: () => {},
});

export const AuthProvider = ({ children, value }) => (
  <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
);

export default AuthContext;
