import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { wrapResponse } from 'src/utils/response-wrapper';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; data: { access_token: string } }> {
    const user = await this.userService.findByUsername(loginDto.username);
    const isPasswordValid =
      user && (await bcrypt.compare(loginDto.password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: JwtPayload = { sub: user.id, username: user.username };

    const token = await this.jwtService.signAsync(payload);

    return wrapResponse('Login successful', {
      access_token: token,
    });
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; data: { access_token: string } }> {
    const user = await this.userService.createUser(createUserDto);

    const payload: JwtPayload = { sub: user.id, username: user.username };

    const token = await this.jwtService.signAsync(payload);

    return wrapResponse('Registration successful', { access_token: token });
  }
}
