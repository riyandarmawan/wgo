import { HttpException, HttpStatus } from '@nestjs/common';

export class UsernameAlreadyExistsException extends HttpException {
  constructor() {
    super('Username already exists', HttpStatus.CONFLICT);
  }
}
