import { FriendRequest } from 'src/friend-request/friend-request.entity';

export class UserSearchResultDto {
  id: string;
  username: string;
  name: string;
  friendRequest: FriendRequest | null;
}
