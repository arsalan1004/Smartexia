import React, { createContext, useState } from "react";

type LoginContextType = {
  isLoggedIn: boolean;
  updateIsLoggedIn: (value: boolean) => void;
};

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  updateIsLoggedIn: (value: boolean) => {},
});

type LoginContextProvider = {
  children: React.ReactNode;
};

export const LoginProvider = ({ children }: LoginContextProvider) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateIsLoggedIn = (value: boolean) => {
    console.log("updateIsLoggedIn In Context", value);
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn: isLoggedIn, updateIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
