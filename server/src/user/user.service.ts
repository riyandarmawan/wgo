import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  searchUser(search: string) {
    return this.userRepository.find({
      select: { id: true, username: true, name: true },
      where: [{ username: Like(`%${search}%`) }, { name: Like(`%${search}%`) }],
    });
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    if (await this.findByUsername(createUserDto.username))
      throw new ConflictException('Username already exists');

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
