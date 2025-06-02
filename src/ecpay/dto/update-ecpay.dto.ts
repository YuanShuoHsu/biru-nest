import { PartialType } from '@nestjs/swagger';
import { CreateEcpayDto } from './create-ecpay.dto';

export class UpdateEcpayDto extends PartialType(CreateEcpayDto) {}
