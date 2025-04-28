import { HttpException, HttpStatus } from '@nestjs/common';

export class SelfFriendRequestException extends HttpException {
  constructor() {
    super(
      "You can't send a friend request to Yourself",
      HttpStatus.BAD_REQUEST,
    );
  }
}
