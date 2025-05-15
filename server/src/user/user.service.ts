import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { In, Like, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsernameAlreadyExistsException } from './exceptions/username-already-exists.exception';
import { FriendRequest } from 'src/friend-request/friend-request.entity';
import { UserSearchResultDto } from './dtos/user-search-result.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private friendRequestRepository: Repository<FriendRequest>,
  ) {}

  /**
   * Find a user by their unique ID.
   * @param id - The ID of the user.
   * @returns A Promise resolving to the User or null if not found.
   */
  findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Find a user by their username.
   * @param username - The username to look for.
   * @returns A Promise resolving to the User or null if not found.
   */
  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * Search for users by keyword, excluding the current user.
   * Also includes friendship status (if any) with each user in the results.
   * @param keyword - Search keyword (matches name or username).
   * @param userId - ID of the current user to exclude from results.
   * @returns A Promise resolving to an array of users with optional friendship status.
   */
  async search({
    keyword,
    userId,
  }: {
    keyword: string;
    userId: string;
  }): Promise<UserSearchResultDto[]> {
    // Find users matching keyword in username or name, excluding self
    const users = await this.userRepository.find({
      select: ['id', 'username', 'name'],
      where: [
        { id: Not(userId), username: Like(`%${keyword}%`) },
        { id: Not(userId), name: Like(`%${keyword}%`) },
      ],
    });

    const userIds = users.map((user) => user.id);

    if (userIds.length === 0) return [];

    // Find existing friend requests between current user and found users
    const friendships = await this.friendRequestRepository.find({
      where: [
        { sender: { id: userId }, receiver: { id: In(userIds) } },
        { sender: { id: In(userIds) }, receiver: { id: userId } },
      ],
      relations: ['sender', 'receiver'],
    });

    // Create a map of friendship status keyed by other user ID
    const friendRequestMap = new Map<string, FriendRequest>();

    friendships.forEach((friendship) => {
      const otherUserId =
        friendship.sender.id === userId
          ? friendship.receiver.id
          : friendship.sender.id;

      friendRequestMap.set(otherUserId, friendship);
    });

    // Return search results with friendship status
    return users.map((user) => ({
      ...user,
      friendRequest: friendRequestMap.get(user.id) || null,
    }));
  }

  /**
   * Creates a new user after validating uniqueness and hashing the password.
   * @param createUserDto - The DTO containing username, password, and name.
   * @returns A Promise resolving to the newly created user (without password).
   * @throws UsernameAlreadyExistsException if the username is already taken.
   */
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    // Check if username already exists
    if (await this.findByUsername(createUserDto.username))
      throw new UsernameAlreadyExistsException();

    // Hash the password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    // Create and save the new user
    const newUser = this.userRepository.create(userWithHashedPassword);
    const savedUser = await this.userRepository.save(newUser);

    // Remove password from returned user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }
}
