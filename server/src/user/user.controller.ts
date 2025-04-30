import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthUser } from 'src/utils/decorators/auth-user.decorator';
import { User } from './user.entity';
import { SearchUsersDto } from './dtos/search-users.dto';
import { UserSearchResultDto } from './dtos/user-search-result.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * GET /users/search
   *
   * Searches for users by keyword, excluding the currently authenticated user.
   * Returns basic user info along with any existing friendship status.
   *
   * @param query - Contains the search keyword.
   * @param user - Injected authenticated user using custom @AuthUser decorator.
   * @returns A list of matching users with friendship status (if any).
   *
   * Requires a valid JWT token to access (guarded by JwtAuthGuard).
   */
  @UseGuards(JwtAuthGuard)
  @Get('search')
  searchUsers(
    @Query() query: SearchUsersDto,
    @AuthUser() user: User,
  ): Promise<UserSearchResultDto[]> {
    return this.userService.search({ keyword: query.keyword, userId: user.id });
  }
}
