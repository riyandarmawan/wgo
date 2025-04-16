import { Navigate, Outlet } from "react-router";

export default function RequireAuth() {
  // get token
  const token = localStorage.getItem("token");

  //   if token not available return to login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  //   otherwise it will continue to the next route
  return <Outlet />;
}
