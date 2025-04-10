import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (await this.findByUsername(createUserDto.username))
      throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    const newUser = this.userRepository.create(userWithHashedPassword);
    return this.userRepository.save(newUser);
  }
}
