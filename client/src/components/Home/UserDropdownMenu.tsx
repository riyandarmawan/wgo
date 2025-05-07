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
  Moon,
  Sun,
  User,
  UserSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/auth/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import {
  Dialog,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { SearchFriendDialog } from "./SearchFriendDialog";

export function UserDropdownMenu() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Dialog>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="cursor-pointer"
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Link
              to="/profile/me"
              className="flex cursor-pointer items-center gap-2"
            >
              <User />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={() => setOpenDropdown(false)}
            >
              <UserSearch />
              Search friends
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={toggleTheme}
            className="flex cursor-pointer items-center gap-2"
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

          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={logout}
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SearchFriendDialog />
    </Dialog>
  );
}
