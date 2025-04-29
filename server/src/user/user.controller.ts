import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from './user.entity';
import { SearchUsersDto } from './dtos/search-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  searchUsers(
    @Query() query: SearchUsersDto,
    @AuthUser() user: User,
  ): Promise<User[]> {
    return this.userService.search({ keyword: query.keyword, userId: user.id });
  }
}
