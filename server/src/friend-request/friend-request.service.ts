import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from './friend-request.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { SelfFriendRequestException } from './exceptions/self-friend-request.exception';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exception';
import { PendingFriendRequestException } from './exceptions/pending-friend-request.exception';
import { AcceptedFriendRequestException } from './exceptions/accepted-friend-request.exception';
import { FriendRequestStatus } from './types/friend-request-status.enum';
import { FriendRequestException } from './exceptions/friend-request.exception';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
    private readonly userService: UserService,
  ) {}

  async create({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }): Promise<FriendRequest> {
    if (senderId === receiverId) throw new SelfFriendRequestException();

    const sender = await this.userService.findById(senderId);

    const receiver = await this.userService.findById(receiverId);

    if (!sender || !receiver) throw new UserNotFoundException();

    const existingRequest = await this.friendRequestRepository.findOne({
      where: { sender: { id: sender.id }, receiver: { id: receiver.id } },
    });

    if (
      existingRequest &&
      existingRequest.status === FriendRequestStatus.PENDING
    )
      throw new PendingFriendRequestException();

    const newRequestFriend = this.friendRequestRepository.create({
      sender,
      receiver,
      status: FriendRequestStatus.PENDING,
    } as Partial<FriendRequest>);

    return await this.friendRequestRepository.save(newRequestFriend);
  }

  async accept({
    requestId,
    userId,
  }: {
    requestId: string;
    userId: string;
  }): Promise<FriendRequest> {
    const friendRequest = await this.friendRequestRepository.findOneOrFail({
      where: { id: requestId },
      relations: ['receiver'],
    });

    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();

    if (friendRequest.status === FriendRequestStatus.ACCEPTED)
      throw new AcceptedFriendRequestException();

    friendRequest.status = FriendRequestStatus.ACCEPTED;
    await this.friendRequestRepository.save(friendRequest);

    return friendRequest;
  }

  async delete({
    requestId,
    userId,
  }: {
    requestId: string;
    userId: string;
  }): Promise<FriendRequest> {
    const existingRequest = await this.friendRequestRepository.findOneOrFail({
      where: { id: requestId },
      relations: ['sender', 'receiver'],
    });

    if (
      existingRequest.sender.id !== userId &&
      existingRequest.receiver.id !== userId
    )
      throw new FriendRequestException();

    await this.friendRequestRepository.delete({ id: requestId });

    return existingRequest;
  }
}
