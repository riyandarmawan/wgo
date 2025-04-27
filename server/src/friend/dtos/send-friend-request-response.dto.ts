export class SendFriendRequestResponseDto {
  status: 'success';
  message: string;
  data: {
    id: string;
    senderId: string;
    receiverId: string;
    status: 'pending' | 'accepted';
    createdAt: Date;
  };
}
