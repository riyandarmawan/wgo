import { useAuth } from "@/auth/useAuth";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  LogOut,
  MessageCircle,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="py-4 container inset-x-0 top-0 fixed bg-secondary flex justify-between items-center">
      {/* title */}
      <Link to="/" className="flex items-center gap-1">
        <MessageCircle className="" />
        <h1 className="text-lg font-medium">WGO</h1>
      </Link>

      {/* options menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="cursor-pointer">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* user */}
          <DropdownMenuItem>
            <Link
              to="/profile/me"
              className="flex items-center gap-2 cursor-pointer"
            >
              <User />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* options */}
          {/* theme toggle */}
          <DropdownMenuItem
            onClick={toggleTheme}
            className="flex items-center gap-2 cursor-pointer"
          >
            {theme === "light" ? (
              <>
                <Moon />
                Dark theme
              </>
            ) : (
              <>
                <Sun />
                Light theme
              </>
            )}
          </DropdownMenuItem>

          {/* Log out */}
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer"
            onClick={logout}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
