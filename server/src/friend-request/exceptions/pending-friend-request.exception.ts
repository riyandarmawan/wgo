import { HttpException, HttpStatus } from '@nestjs/common';

export class PendingFriendRequestException extends HttpException {
  constructor() {
    super('Friend request is pending.', HttpStatus.BAD_REQUEST);
  }
}
