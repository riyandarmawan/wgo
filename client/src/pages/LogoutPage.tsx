import { useAuth } from "@/auth/useAuth";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const hasShownToast = useRef(false);

  useEffect(() => {
    // delete token
    logout();

    if (!hasShownToast.current) {
      // make a toast
      toast.success("Logout success!");
      hasShownToast.current = true;
    }

    navigate("/auth/login");
  }, [navigate, logout]);

  return null;
}
