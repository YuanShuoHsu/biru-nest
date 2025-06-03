// src/ecpay/dto/create-ecpay.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BaseEcpayDto } from './base-ecpay.dto';
import { InvoiceEcpayDto } from './invoice-ecpay.dto';

export class CreateEcpayDto {
  @ValidateNested()
  @Type(() => BaseEcpayDto)
  Base: BaseEcpayDto;

  @ValidateNested()
  @Type(() => InvoiceEcpayDto)
  Invoice: InvoiceEcpayDto;
}
