import { Body, Controller, Header, Post } from '@nestjs/common';

import { CreateEcpayDto } from './dto/create-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';
import { EcpayService } from './ecpay.service';

@Controller('ecpay')
export class EcpayController {
  constructor(private readonly ecpayService: EcpayService) {}

  @Post()
  @Header('Content-Type', 'text/html; charset=utf-8')
  create(@Body() createEcpayDto: CreateEcpayDto) {
    return this.ecpayService.aioCheckOutAll(createEcpayDto);
  }

  @Post('return')
  return(@Body() returnEcpayDto: ReturnEcpayDto) {
    console.log(returnEcpayDto);
    return this.ecpayService.isCheckMacValueValid(returnEcpayDto);
  }
}
