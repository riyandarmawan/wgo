import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @MinLength(1, { message: 'Username is required' })
  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
