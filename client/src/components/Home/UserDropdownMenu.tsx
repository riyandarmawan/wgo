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
  Search,
  Sun,
  User,
  UserPlus2,
  UserSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/auth/useAuth";
import { useTheme } from "@/components/ThemeProvider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";

export function UserDropdownMenu() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Dialog>
      <DropdownMenu>
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
            <DropdownMenuItem className="cursor-pointer">
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Search your friend here, to start a chat with them!
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex items-center gap-2">
            <Input type="search" placeholder="Search by username or by name" />
            <Button variant="secondary">
              <Search />
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-4 rounded-md border bg-secondary/20 py-2 px-4 shadow-md transition hover:bg-secondary">
              <div className="size-16 shrink-0 rounded-full bg-blue-500" />
              <div className="flex flex-col gap-1 w-full">
                <h2 className="line-clamp-1 font-semibold">Riyan Darmawan</h2>
                <h3 className="line-clamp-1 text-sm text-primary/80">
                  @riyandarmawan
                </h3>
              </div>
              <Button variant="accept" className="cursor-pointer">
                <UserPlus2 />
              </Button>
            </div>
            <div className="flex items-center gap-4 rounded-md border bg-secondary/20 py-2 px-4 shadow-md transition hover:bg-secondary">
              <div className="size-16 shrink-0 rounded-full bg-blue-500" />
              <div className="flex flex-col gap-1 w-full">
                <h2 className="line-clamp-1 font-semibold">Riyan Darmawan</h2>
                <h3 className="line-clamp-1 text-sm text-primary/80">
                  @riyandarmawan
                </h3>
              </div>
              <Button variant="accept" className="cursor-pointer">
                <UserPlus2 />
              </Button>
            </div>
            <div className="flex items-center gap-4 rounded-md border bg-secondary/20 py-2 px-4 shadow-md transition hover:bg-secondary">
              <div className="size-16 shrink-0 rounded-full bg-blue-500" />
              <div className="flex flex-col gap-1 w-full">
                <h2 className="line-clamp-1 font-semibold">Riyan Darmawan</h2>
                <h3 className="line-clamp-1 text-sm text-primary/80">
                  @riyandarmawan
                </h3>
              </div>
              <Button variant="accept" className="cursor-pointer">
                <UserPlus2 />
              </Button>
            </div>
            <div className="flex items-center gap-4 rounded-md border bg-secondary/20 py-2 px-4 shadow-md transition hover:bg-secondary">
              <div className="size-16 shrink-0 rounded-full bg-blue-500" />
              <div className="flex flex-col gap-1 w-full">
                <h2 className="line-clamp-1 font-semibold">Riyan Darmawan</h2>
                <h3 className="line-clamp-1 text-sm text-primary/80">
                  @riyandarmawan
                </h3>
              </div>
              <Button variant="accept" className="cursor-pointer">
                <UserPlus2 />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
