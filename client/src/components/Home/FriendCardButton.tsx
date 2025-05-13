import { Clock, MessageCircle, UserMinus, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type FriendCardButtonProps = {
  status: null | "accepted" | "pending" | "delete" | "chat";
  action: React.MouseEventHandler<HTMLButtonElement>;
};

export function FriendCardButton({ status, action }: FriendCardButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={status === null ? "accepted" : status}
          className="cursor-pointer"
          onClick={action}
          disabled={status === "pending"}
        >
          {status === null || status === "accepted" ? (
            <UserPlus />
          ) : status === "pending" ? (
            <Clock />
          ) : status === "delete" ? (
            <UserMinus />
          ) : (
            <MessageCircle />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {status === null ? (
          <p>Add friend</p>
        ) : status === "accepted" ? (
          <p>Accept the friend request</p>
        ) : status === "pending" ? (
          <p>Friend request is pending</p>
        ) : status === "delete" ? (
          <p>Delete the friend request</p>
        ) : (
          <p>Go chat with your friends!</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
