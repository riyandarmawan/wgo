import { Friend, FriendRequest } from "@/utils/types";
import usePost from "@/hooks/usePost";
import { useAuth } from "@/auth/useAuth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FriendCardButton } from "./FriendCardButton";
import { socket } from "@/socket";

export function FriendCard({ id, name, username, friendRequest }: Friend) {
  const { token, user } = useAuth();
  const { error: errorAddFriend, execute: executeAddFriend } = usePost({
    endpoint: "/friends/requests/",
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  const [status, setStatus] = useState<"accepted" | "pending" | null>(
    friendRequest?.status ?? null,
  );
  const [sender, setSender] = useState<string | null>(
    friendRequest?.sender?.id ?? null,
  );

  const userId = user?.sub;

  async function handleAddFriend() {
    await executeAddFriend({ receiverId: id });
    setStatus("pending");
    setSender(userId);
  }

  async function handleAcceptFriend() {
    await executeAddFriend({ receiverId: id, action: "accept" });
    setStatus("accepted");
  }

  async function handleDeleteRequest() {
    await executeAddFriend({ receiverId: id, action: "delete" });
    setStatus(null);
    setSender(null);
  }

  useEffect(() => {
    if (errorAddFriend) toast.error(errorAddFriend);

    function onNewFriendRequest(payload: FriendRequest) {
      if (id === payload.sender.id) {
        setStatus(payload.status);
        setSender(payload.sender.id);

        toast.message("New Friend Request", {
          description: `${payload.sender.name} want to be your friend`,
        });
      }
    }

    socket.on("newFriendRequest", onNewFriendRequest);

    return () => {
      socket.off("newFriendRequest");
    };
  }, [errorAddFriend, id]);

  function renderFriendCardButton() {
    if (status === null) {
      return <FriendCardButton status={null} action={handleAddFriend} />;
    }

    if (status === "pending") {
      const isSender = sender === userId;
      return (
        <>
          <FriendCardButton
            status={isSender ? "pending" : "accepted"}
            action={isSender ? handleDeleteRequest : handleAcceptFriend}
          />
          <FriendCardButton status="delete" action={handleDeleteRequest} />
        </>
      );
    }

    if (status === "accepted") {
      return (
        <>
          <FriendCardButton status="chat" action={() => {}} />
          <FriendCardButton status="delete" action={handleDeleteRequest} />
        </>
      );
    }

    return null;
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
