import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContextType, JwtPayload } from "@/utils/types";
import { AuthContext } from "@/context/auth-context";
import { socket } from "@/socket";

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
        socket.disconnect();
      } else {
        setToken(storedToken);
        setUser(decoded);
        socket.auth = { token: storedToken }; // set auth with token to socket
        socket.connect();
      }
    } else {
      socket.disconnect();
    }
    setLoading(false); // <- done loading
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    const decoded = jwtDecode<JwtPayload>(newToken);
    setToken(newToken);
    setUser(decoded);
    socket.auth = { token: newToken }; // set auth with token to socket
    socket.connect();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    socket.disconnect();
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
