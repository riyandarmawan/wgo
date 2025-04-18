import { useAuth } from "@/auth/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // delete token
    logout();

    navigate("/auth/login");
  }, [navigate, logout]);

  return null;
}
