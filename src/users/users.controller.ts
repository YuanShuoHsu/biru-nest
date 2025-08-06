import { CreateUserDto } from './dto/create-user.dto';

import { UsersService } from './users.service';

import { Public } from '../auth/decorators/public.decorator';

import {
  ApiCreateResponse,
  ApiDeleteResponse,
  ApiReadResponse,
  ApiUpdateResponse,
} from '../common/decorators/api-response.decorator';

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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post()
  @ApiCreateResponse()
  signup(@Body() userData: CreateUserDto): Promise<UserModel> {
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
