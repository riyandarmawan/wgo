import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SendFriendRequestDto } from './dtos/send-friend-request.dto';
import { Request } from 'express';
import { SendFriendRequestResponseDto } from './dtos/send-friend-request-response.dto';

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request')
  async sendFriendRequest(
    @Body() body: SendFriendRequestDto,
    @Req() request: Request,
  ): Promise<SendFriendRequestResponseDto> {
    const currentUser = request.user as {
      id: string;
      username: string;
      name: string;
    };
    const senderId = currentUser?.id;
    const { receiverId } = body;

    const { id, status, createdAt } =
      await this.friendService.sendFriendRequest({
        senderId,
        receiverId: receiverId,
      });

    return {
      status: 'success',
      message: 'Friend request sent successfully',
      data: {
        id,
        senderId,
        receiverId,
        status,
        createdAt,
      },
    };
  }
}
