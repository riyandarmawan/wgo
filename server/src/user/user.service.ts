import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Like, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsernameAlreadyExistsException } from './exceptions/username-already-exists.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  search({
    keyword,
    userId,
  }: {
    keyword: string;
    userId: string;
  }): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'username', 'name'],
      where: [
        { id: Not(userId), username: Like(`%${keyword}%`) },
        { id: Not(userId), name: Like(`%${keyword}%`) },
      ],
    });
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (await this.findByUsername(createUserDto.username))
      throw new UsernameAlreadyExistsException();

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    const newUser = this.userRepository.create(userWithHashedPassword);
    const savedUser = await this.userRepository.save(newUser);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }
}
