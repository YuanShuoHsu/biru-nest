import { Body, Controller, Post } from '@nestjs/common';
import { CreateEcpayDto } from './dto/create-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';
import { EcpayService } from './ecpay.service';

@Controller('ecpay')
export class EcpayController {
  constructor(private readonly ecpayService: EcpayService) {}

  @Post()
  create(@Body() createEcpayDto: CreateEcpayDto) {
    console.log(createEcpayDto);
    return this.ecpayService.aioCheckOutAll(createEcpayDto);
  }

  @Post('return')
  return(@Body() returnEcpayDto: ReturnEcpayDto) {
    return this.ecpayService.isCheckMacValueValid(returnEcpayDto);
  }
}
