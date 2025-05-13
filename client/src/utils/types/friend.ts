export type Friend = {
  id: string;
  username: string;
  name: string;
  friendshipStatus: "accepted" | "pending" | null;
  requestSender: string | null;
};
