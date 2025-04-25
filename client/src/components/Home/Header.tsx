// Import necessary hooks and components
import { cn } from "@/lib/utils"; // Utility for conditionally joining classNames
import { AppTitle } from "../AppTitle";
import { UserDropdownMenu } from "./UserDropdownMenu";

export default function Header() {
  return (
    <header
      className={cn(
        "bg-secondary p-4 sticky z-10 inset-x-0 top-0 shadow-lg",
      )}
    >
      {/* Header top row: logo/title and dropdown menu */}
      <div className="flex items-center justify-between">
        {/* App title and icon */}
        <AppTitle />

        {/* Dropdown menu with user options */}
        <UserDropdownMenu />
      </div>
    </header>
  );
}
