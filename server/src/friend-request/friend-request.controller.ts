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

@Controller('friends/requests')
export class FriendRequestController {
  constructor(private readonly friendRequestService: FriendRequestService) {}

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

    return friendRequest;
  }

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

    return response;
  }

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
