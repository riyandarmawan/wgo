import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FriendRequestService } from './friend-request.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from 'src/user/user.entity';
import { CreateFriendRequestDto } from './dtos/create-friend-request.dto';
import { FriendRequest } from './friend-request.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('friends/requests')
export class FriendRequestController {
  constructor(
    private readonly friendRequestService: FriendRequestService,
    private eventEmitter: EventEmitter2,
  ) {}

  /**
   * POST /friends/requests
   *
   * Creates a new friend request from the authenticated user to the receiver.
   *
   * @param receiverId - ID of the user to send the friend request to.
   * @param senderId - ID of the authenticated user (sender of the request).
   * @returns The created friend request entity.
   * @throws SelfFriendRequestException if sender and receiver are the same.
   * @throws UserNotFoundException if either user doesn't exist.
   * @throws PendingFriendRequestException if a pending request already exists.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async CreateFriendRequest(
    @Body() { receiverId }: CreateFriendRequestDto,
    @AuthUser() { id: senderId }: User,
  ): Promise<FriendRequest> {
    const friendRequest = await this.friendRequestService.create({
      senderId,
      receiverId,
    });

    this.eventEmitter.emit('friendRequest.created', friendRequest);

    return friendRequest;
  }

  /**
   * PATCH /friends/requests/:id/accept
   *
   * Accepts an incoming friend request.
   *
   * @param requestId - The ID of the friend request to accept.
   * @param userId - ID of the authenticated user who is accepting the request.
   * @returns The updated friend request entity with ACCEPTED status.
   * @throws FriendRequestException if the authenticated user is not the receiver.
   * @throws AcceptedFriendRequestException if the request has already been accepted.
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/accept')
  async AcceptFriendRequest(
    @Param('id') requestId: string,
    @AuthUser() { id: userId }: User,
  ): Promise<FriendRequest> {
    const response = await this.friendRequestService.accept({
      requestId,
      userId,
    });

    this.eventEmitter.emit('friendRequest.accepted', response);

    return response;
  }

  /**
   * DELETE /friends/requests/:id/delete
   *
   * Deletes an existing friend request.
   *
   * @param requestId - ID of the friend request to delete.
   * @param userId - ID of the authenticated user attempting to delete the request.
   * @returns The deleted friend request entity.
   * @throws FriendRequestException if the authenticated user is neither the sender nor the receiver.
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async DeleteFriendRequest(
    @Param('id') requestId: string,
    @AuthUser() { id: userId }: User,
  ): Promise<FriendRequest> {
    const friendRequest = await this.friendRequestService.delete({
      requestId,
      userId,
    });

    return friendRequest;
  }
}
