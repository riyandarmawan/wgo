import { useAuth } from "@/auth/useAuth";
import ChatRoom from "@/components/Home/ChatRoom";
import Header from "@/components/Home/Header";
import Rooms from "@/components/Home/Rooms";
import { socket } from "@/socket";
import { FriendRequest } from "@/utils/types";
import { useEffect } from "react";
import { toast } from "sonner";

export default function HomePage() {
  const { token } = useAuth();

  useEffect(() => {
    function onFriendRequestAccepted(payload: FriendRequest) {
      toast.success("Friend Request", {
        description: `${payload.receiver.name} has accepted your friend request`,
      });
    }

    socket.auth = { token }; // set auth with token to socket
    socket.connect();

    socket.on("friendRequestAccepted", onFriendRequestAccepted);

    return () => {
      socket.off("friendRequestAccepted");
    };
  }, [token]);

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
