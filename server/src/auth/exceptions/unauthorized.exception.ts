import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(msg?: string) {
    const defaultMessage = 'Unauthorized';
    const error = msg ? defaultMessage.concat(': ', msg) : defaultMessage;
    super(error, HttpStatus.UNAUTHORIZED);
  }
}
