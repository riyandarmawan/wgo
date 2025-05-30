import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendRequestException extends HttpException {
  constructor(msg?: string) {
    const defaultMessage = 'Friend request exception';
    const error = msg ? defaultMessage.concat(': ', msg) : defaultMessage;
    super(error, HttpStatus.BAD_REQUEST);
  }
}
