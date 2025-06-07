import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { BaseEcpayDto } from './base-ecpay.dto';

class PartialBaseEcpayDto extends PartialType(BaseEcpayDto) {}

export class CreateEcpayDto {
  @ApiProperty({ type: BaseEcpayDto })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PartialBaseEcpayDto)
  base: PartialBaseEcpayDto;

  // @ApiProperty({ type: InvoiceEcpayDto })
  // @IsNotEmptyObject()
  // @ValidateNested()
  // @Type(() => InvoiceEcpayDto)
  // invoice: InvoiceEcpayDto;
}
