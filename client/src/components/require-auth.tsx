import { useAuth } from "@/auth/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  // get status
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  //   if token not available return to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  //   otherwise it will continue to the next route
  return <Outlet />;
}
