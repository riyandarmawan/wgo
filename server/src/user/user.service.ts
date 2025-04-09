import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createUser(user: { name: string; username: string; password: string }) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
