import RequireAuth from "@/components/require-auth";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import LogoutPage from "@/pages/LogoutPage";
import RegisterPage from "@/pages/RegisterPage";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/logout" element={<LogoutPage />} />
    </Routes>
  );
}
