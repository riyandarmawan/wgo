import ChatRoom from "@/components/Home/ChatRoom";
import Header from "@/components/Home/Header";
import Rooms from "@/components/Home/Rooms";
import { socket } from "@/socket";
import { useEffect } from "react";
import { toast } from "sonner";

export default function HomePage() {
  useEffect(() => {
    function onNewFriendRequest(payload) {
      toast.message("New Friend Request", {
        description: `${payload.sender.name} want to be your friend`,
      });
    }

    socket.on("newFriendRequest", onNewFriendRequest);

    return () => {
      socket.off("newFriendRequest", onNewFriendRequest);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="flex h-dvh flex-col">
        <Header />
        <Rooms />
      </div>
      <ChatRoom />
    </div>
  );
}
