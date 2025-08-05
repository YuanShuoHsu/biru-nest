import { IsDefined, IsEmail, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsDefined()
  @IsString()
  password: string;
}
