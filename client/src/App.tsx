import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/HomePage";
import LogoutPage from "./pages/LogoutPage";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/logout" element={<LogoutPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
