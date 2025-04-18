import { useAuth } from "@/auth/useAuth";
import { useEffect, useRef } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "sonner";

export default function RequireAuth() {
  // get status
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      // show message toast
      toast.warning("Please login first!");
      hasShownToast.current = true;
    }
  }, [isAuthenticated]);

  //   if token not available return to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  //   otherwise it will continue to the next route
  return <Outlet />;
}
