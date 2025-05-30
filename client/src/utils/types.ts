export type AuthContextType = {
  token: string | null;
  user: JwtPayload | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export type JwtPayload = {
  sub: string;
  username: string;
  name: string;
  exp: number;
  iat: number;
};

export type registerPayload = {
  name: string;
  username: string;
  password: string;
};

export type loginPayload = {
  username: string;
  password: string;
};

export type authResponse = {
  data: { access_token: string };
  message: string;
};

export type FriendRequest = {
  id: string;
  sender: {
    id: string;
    username: string;
    name: string;
  };
  receiver: {
    id: string;
    username: string;
    name: string;
  };
  status: "accepted" | "pending" | null;
};

export type Friend = {
  id: string;
  username: string;
  name: string;
  friendRequest: FriendRequest;
};