// src/ecpay/dto/create-ecpay.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { BaseEcpayDto } from './base-ecpay.dto';
import { InvoiceEcpayDto } from './invoice-ecpay.dto';

export class CreateEcpayDto {
  @ApiProperty({ type: BaseEcpayDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BaseEcpayDto)
  base: BaseEcpayDto;

  @ApiProperty({ type: InvoiceEcpayDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InvoiceEcpayDto)
  invoice: InvoiceEcpayDto;
}
