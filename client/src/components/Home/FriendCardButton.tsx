import { Clock, MessageCircle, UserMinus, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type FriendCardButtonProps = {
  status?: null | "accept" | "pending" | "delete";
  action: React.MouseEventHandler<HTMLButtonElement>;
};

export function FriendCardButton({ status, action }: FriendCardButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={status === null ? "accept" : status}
          className="cursor-pointer"
          onClick={action}
          disabled={status === "pending"}
        >
          {status === null || status === "accept" ? (
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
        ) : status === "accept" ? (
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
