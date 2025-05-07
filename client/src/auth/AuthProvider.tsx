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
  const [loading, setLoading] = useState(true); // <- Add loading state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      const isTokenExpire = decoded.exp * 1000 < Date.now();
      if (isTokenExpire) {
        logout();
      } else {
        setToken(storedToken);
        setUser(decoded);
      }
    }
    setLoading(false); // <- done loading
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode<JwtPayload>(newToken);
    setToken(newToken);
    setUser(decoded);
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

  if (loading) return; // <- Delay rendering until ready

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
