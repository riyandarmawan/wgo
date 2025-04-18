import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, JwtPayload } from "@/types/auth";
import { AuthContext } from "@/context/auth-context";

type props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: props) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);

  const decodeAndSetUser = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);
    setUser(decoded);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      decodeAndSetUser(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    decodeAndSetUser(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
