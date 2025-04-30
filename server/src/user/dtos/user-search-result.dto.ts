import { FriendRequestStatus } from 'src/friend-request/types/friend-request-status.enum';

export class UserSearchResultDto {
  id: string;
  username: string;
  name: string;
  friendshipStatus: FriendRequestStatus | null;
}
