import ChatRoom from "@/components/Home/ChatRoom";
import Header from "@/components/Home/Header";
import Rooms from "@/components/Home/Rooms";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="h-dvh flex flex-col">
        <Header />
        <Rooms />
      </div>
      <ChatRoom />
    </div>
  );
}
