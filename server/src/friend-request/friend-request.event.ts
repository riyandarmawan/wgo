import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from 'src/messaging/messaging.gateway';
import { FriendRequest } from './friend-request.entity';

@Injectable()
export class FriendRequestEvent {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendRequest.created')
  friendRequestCreated(payload: FriendRequest) {
    console.log('friendRequest.created');
  }
}
