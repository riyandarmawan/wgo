import { useTheme } from "./components/ThemeProvider";
import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        theme={theme === "dark" ? "dark" : "light"}
      />
      <AppRoutes />
    </>
  );
}

export default App;
