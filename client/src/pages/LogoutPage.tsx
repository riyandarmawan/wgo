import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // delete token
    localStorage.removeItem("token");

    navigate("/auth/login");
  }, [navigate]);

  return null;
}
