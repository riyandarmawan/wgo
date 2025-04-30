import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/login
   *
   * Authenticates a user based on the provided credentials (username and password).
   * - Validates the user using the AuthService.
   * - Generates an access token if login is successful.
   *
   * @param loginDto - DTO containing the user's login credentials (username and password).
   * @returns A success response with the generated JWT access token.
   * @throws UnauthorizedException if login credentials are invalid.
   */
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

  /**
   * POST /auth/register
   *
   * Registers a new user by creating an account.
   * - Validates the provided registration data (username, password, etc.).
   * - Creates a new user using the AuthService and generates an access token.
   *
   * @param createUserDto - DTO containing the user's registration data (username, password, etc.).
   * @returns A success response with the generated JWT access token.
   */
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
