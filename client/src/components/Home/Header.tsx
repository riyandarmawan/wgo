// Import necessary hooks and components
import { Separator } from "../ui/separator"; // Reusable separator component
import { useState } from "react"; // React hooks
import { cn } from "@/lib/utils"; // Utility for conditionally joining classNames
import { AppTitle } from "../AppTitle";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { SearchInput } from "./SearchInput";

export default function Header() {
  const [search, setSearch] = useState<string>(""); // Local state for search input

  return (
    <header
      className={cn(
        "py-4 container inset-x-0 top-0 fixed bg-secondary transition-all duration-300 ease-in-out flex gap-4 flex-col z-10",
        search ? "h-dvh" : "h-32" // Expand height if search is active
      )}
    >
      {/* Header top row: logo/title and dropdown menu */}
      <div className="flex items-center justify-between">
        {/* App title and icon */}
        <AppTitle />

        {/* Dropdown menu with user options */}
        <UserDropdownMenu />
      </div>

      <Separator />

      <SearchInput search={search} onChange={setSearch} />
    </header>
  );
}
