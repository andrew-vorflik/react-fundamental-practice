import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();
const AuthContextProvider = authContext.Provider;

export const AuthContext = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const login = (user) => {
    setIsAuth(true);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.clear("user");
  };

  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      login(user);
    } else {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContextProvider value={{ isAuth, login, logout, getUser }}>
      {children}
    </AuthContextProvider>
  );
};

export const useAuth = () => useContext(authContext);
