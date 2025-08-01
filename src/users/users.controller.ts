import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { UsersService } from './users.service';

import {
  ApiCreateResponse,
  ApiDeleteResponse,
  ApiReadResponse,
  ApiUpdateResponse,
} from '../common/decorators/api-response.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiCreateResponse()
  signup(
    @Body() userData: { name?: string; email: string; password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Get()
  @ApiReadResponse()
  findAll(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(':id')
  @ApiReadResponse()
  findOne(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Patch(':id')
  @ApiUpdateResponse()
  update(
    @Param('id') id: string,
    @Body() data: { name?: string; email?: string },
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  @ApiDeleteResponse()
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
