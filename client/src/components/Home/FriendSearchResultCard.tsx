import { Button } from "../ui/button";
import { UserPlus2 } from "lucide-react";

interface FriendSearchResultCardProps {
  name: string;
  username: string;
}

export function FriendSearchResultCard({
  name,
  username,
}: FriendSearchResultCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-md border bg-secondary/20 px-4 py-2 shadow-md transition hover:bg-secondary">
      <div className="size-12 shrink-0 rounded-full bg-blue-500" />
      <div className="flex w-full flex-col gap-1">
        <h2 className="line-clamp-1 text-sm sm:text-base font-semibold">{name}</h2>
        <h3 className="line-clamp-1 text-xs sm:text-sm text-primary/80">@{username}</h3>
      </div>
      <Button variant="accept" className="cursor-pointer">
        <UserPlus2 />
      </Button>
    </div>
  );
}
