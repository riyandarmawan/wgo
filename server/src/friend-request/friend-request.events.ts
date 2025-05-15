import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from 'src/messaging/messaging.gateway';
import { FriendRequest } from './friend-request.entity';

@Injectable()
export class FriendRequestEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendRequest.created')
  friendRequestCreated(payload: FriendRequest) {
    const receiverSocket = this.gateway.users.get(payload.receiver.id);

    if (receiverSocket) receiverSocket.emit('newFriendRequest', payload);
  }

  @OnEvent('friendRequest.accepted')
  friendRequestAccepted(payload: FriendRequest) {
    const senderSocket = this.gateway.users.get(payload.sender.id);

    if (senderSocket) senderSocket.emit('friendRequestAccepted', payload);
  }
}
