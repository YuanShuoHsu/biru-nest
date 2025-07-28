import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  signup(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
