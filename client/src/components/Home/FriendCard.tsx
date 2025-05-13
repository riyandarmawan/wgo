import { Friend } from "@/utils/types/friend";
import usePost from "@/hooks/usePost";
import { useAuth } from "@/auth/useAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FriendCardButton } from "./FriendCardButton";

export function FriendCard({ id, name, username, friendshipStatus }: Friend) {
  const { token, user } = useAuth();
  const { error, execute } = usePost({
    endpoint: "/friends/requests/",
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const [status, setStatus] = useState<"accept" | "pending" | null>(
    friendshipStatus,
  );

  async function handleAddFriend() {
    await execute({ receiverId: id });

    setStatus("pending");
  }

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  function renderFriendCardButton() {
    return status === null ? (
      <FriendCardButton status={null} action={handleAddFriend} />
    ) : status === "pending" && username === user?.username ? (
      <FriendCardButton status="pending" action={handleAddFriend} />
    ) : status === "pending" && username !== user?.username ? (
      <>
        <FriendCardButton status="accept" action={handleAddFriend} />
        <FriendCardButton status="delete" action={handleAddFriend} />
      </>
    ) : status === "accept" ? (
      <>
        <FriendCardButton action={handleAddFriend} />
        <FriendCardButton status="delete" action={handleAddFriend} />
      </>
    ) : (
      ""
    );
  }

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
      {renderFriendCardButton()}
    </div>
  );
}
