import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Friend } from './friend.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { FriendStatus } from './friend-status.enum';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private friendRepository: Repository<Friend>,
    private readonly userService: UserService,
  ) {}

  async sendFriendRequest({
    senderId,
    receiverId,
  }: {
    senderId: string;
    receiverId: string;
  }): Promise<Friend> {
    if (senderId === receiverId)
      throw new BadRequestException(
        "You can't send a friend request to Yourself.",
      );

    const sender = await this.userService.findById(senderId);

    const receiver = await this.userService.findById(receiverId);

    if (!sender || !receiver) throw new BadRequestException('User not found.');

    const existingRequest = await this.friendRepository.findOne({
      where: { sender: { id: sender.id }, receiver: { id: receiver.id } },
    });

    if (existingRequest && existingRequest.status === FriendStatus.PENDING)
      throw new BadRequestException('Friend request already sent.');

    if (existingRequest && existingRequest.status === FriendStatus.ACCEPTED)
      throw new BadRequestException('You are already friends.');

    const newRequestFriend = this.friendRepository.create({
      sender,
      receiver,
      status: 'pending',
    } as Partial<Friend>);

    return await this.friendRepository.save(newRequestFriend);
  }

  async acceptFriendRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<Friend> {
    const existingRequest = await this.friendRepository.findOne({
      where: { id: requestId },
    });

    if (!existingRequest)
      throw new BadRequestException('Friend request not found.');

    if (existingRequest.status === FriendStatus.ACCEPTED)
      throw new BadRequestException('This request have been accepted.');

    existingRequest.status = FriendStatus.ACCEPTED;
    await this.friendRepository.save(existingRequest);

    return existingRequest;
  }

  async deleteFriendRequest({
    requestId,
  }: {
    requestId: string;
  }): Promise<boolean> {
    const existingRequest = await this.friendRepository.findOne({
      where: { id: requestId },
    });

    if (!existingRequest)
      throw new BadRequestException('Friend request not found.');

    await this.friendRepository.delete(existingRequest);

    return true;
  }
}
