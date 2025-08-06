import { AuthService } from './auth.service';

import { Public } from './decorators/public.decorator';

import { CreateAuthDto } from './dto/create-auth.dto';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { RequestWithUser } from './types';

import { ApiCreateResponse } from '../common/decorators/api-response.decorator';

import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '登入並取得 JWT' })
  @ApiBody({ type: CreateAuthDto })
  @ApiCreateResponse()
  async login(@Request() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: RequestWithUser) {
    return req.user;
  }
}
