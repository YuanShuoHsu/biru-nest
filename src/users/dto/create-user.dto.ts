import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsDefined()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Biru', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
