import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.user({ email });
    if (!user) return null;

    const { password, ...result } = user;
    const isMatch = await bcrypt.compare(pass, password);
    if (!isMatch) return null;

    return result;
  }

  async login(user: Omit<User, 'password'>): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
