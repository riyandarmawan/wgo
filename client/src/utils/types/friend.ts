export type Friend = {
  id: string;
  username: string;
  name: string;
  friendshipStatus: "accept" | "pending" | null;
};
