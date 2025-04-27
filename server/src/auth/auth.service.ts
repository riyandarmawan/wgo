import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async generateAccessToken({
    id,
    username,
    name,
  }: {
    id: string;
    username: string;
    name: string;
  }) {
    const payload: JwtPayload = {
      sub: id,
      username: username,
      name: name,
    };

    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async login({ username, password }: LoginDto): Promise<string> {
    const user = await this.validateUser(username, password);
    const accessToken = await this.generateAccessToken(user);

    return accessToken;
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.createUser(createUserDto);
    const accessToken = await this.generateAccessToken(user);

    return accessToken;
  }
}
