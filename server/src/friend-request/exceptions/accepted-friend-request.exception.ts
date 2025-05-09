import { HttpException, HttpStatus } from '@nestjs/common';

export class AcceptedFriendRequestException extends HttpException {
  constructor() {
    super('Friend request already accepted', HttpStatus.BAD_REQUEST);
  }
}
