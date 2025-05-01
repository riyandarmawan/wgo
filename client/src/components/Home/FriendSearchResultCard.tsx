import { Friend } from "@/utils/types/friend";
import { Button } from "../ui/button";
import { Clock, UserMinus, UserPlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { postJSON } from "@/lib/http/post-json";
import { toast } from "sonner";
import { useAuth } from "@/auth/useAuth";
import useApi from "@/hooks/useApi";

export function FriendSearchResultCard({
  id,
  name,
  username,
  friendshipStatus,
}: Friend) {
  const { token } = useAuth();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const { error, loading, execute } = useApi({
    method: "POST",
    url: `${SERVER_URL}/friends/requests`,
    headers: { Authorization: `Bearer ${token}` },
    payload: { receiverId: id },
  });

  if (error) return toast.error(error);

  const handleAddFriend = async () => {
    execute();
  };

  return (
    <div className="flex items-center gap-4 rounded-md border bg-secondary/20 px-4 py-2 shadow-md transition hover:bg-secondary">
      <div className="size-12 shrink-0 rounded-full bg-blue-500" />
      <div className="flex w-full flex-col gap-1">
        <h2 className="line-clamp-1 text-sm font-semibold sm:text-base">
          {name}
        </h2>
        <h3 className="line-clamp-1 text-xs text-primary/80 sm:text-sm">
          @{username}
        </h3>
      </div>
      <TooltipProvider>
        {friendshipStatus === null ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="accept"
                className="cursor-pointer"
                onClick={handleAddFriend}
              >
                <UserPlus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Friend</p>
            </TooltipContent>
          </Tooltip>
        ) : friendshipStatus === "pending" ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled variant="pending" className="cursor-pointer">
                <Clock />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Request Pending</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="delete" className="cursor-pointer">
                <UserMinus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove Friend</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}
