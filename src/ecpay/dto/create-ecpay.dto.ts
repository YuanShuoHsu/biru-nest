// src/ecpay/dto/create-ecpay.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseEcpayDto } from './base-ecpay.dto';
import { InvoiceEcpayDto } from './invoice-ecpay.dto';

export class CreateEcpayDto {
  @ApiProperty({ type: BaseEcpayDto })
  @ValidateNested()
  @Type(() => BaseEcpayDto)
  Base: BaseEcpayDto;

  @ApiProperty({ type: InvoiceEcpayDto })
  @ValidateNested()
  @Type(() => InvoiceEcpayDto)
  Invoice: InvoiceEcpayDto;
}
