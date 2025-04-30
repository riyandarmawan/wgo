import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UnauthorizedException } from './exceptions/unauthorized.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates the user's credentials (username and password).
   * - Searches for a user by username.
   * - Compares the provided password with the stored hashed password.
   *
   * @param username - The username of the user.
   * @param password - The password to validate.
   * @returns The user if credentials are valid.
   * @throws UnauthorizedException if the username or password is incorrect.
   */
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const isPasswordValid =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  /**
   * Generates an access token (JWT) for the authenticated user.
   * - Creates a JWT payload with user ID, username, and name.
   * - Signs the payload to generate a token.
   *
   * @param id - The user ID.
   * @param username - The username of the user.
   * @param name - The name of the user.
   * @returns A signed JWT token.
   */
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

  /**
   * Logs in a user by validating credentials and generating an access token.
   *
   * @param username - The username of the user attempting to log in.
   * @param password - The password of the user attempting to log in.
   * @returns A JWT access token if login is successful.
   * @throws UnauthorizedException if login credentials are invalid.
   */
  async login({ username, password }: LoginDto): Promise<string> {
    const user = await this.validateUser(username, password);
    const accessToken = await this.generateAccessToken(user);

    return accessToken;
  }

  /**
   * Registers a new user and generates an access token.
   * - Calls the `createUser` method from the user service to register the user.
   * - Generates a JWT access token for the newly created user.
   *
   * @param createUserDto - DTO containing the user's registration information.
   * @returns A JWT access token for the newly registered user.
   */
  async register(createUserDto: CreateUserDto): Promise<string> {
    const user = await this.userService.createUser(createUserDto);
    const accessToken = await this.generateAccessToken(user);

    return accessToken;
  }
}
