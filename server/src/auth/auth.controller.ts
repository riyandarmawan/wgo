import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    const accessToken = await this.authService.login(loginDto);

    return {
      status: 'success',
      message: 'Login successful',
      data: {
        access_token: accessToken,
      },
    };
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AuthResponseDto> {
    const accessToken = await this.authService.register(createUserDto);

    return {
      status: 'success',
      message: 'Login successful',
      data: {
        access_token: accessToken,
      },
    };
  }
}
