import { Body, Controller, Header, Post } from '@nestjs/common';

import { BaseEcpayDto } from './dto/base-ecpay.dto';
import { IssueInvoiceEcpayDecryptedRequestDto } from './dto/issue-invoice-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';
import { EcpayService } from './ecpay.service';

@Controller('ecpay')
export class EcpayController {
  constructor(private readonly ecpayService: EcpayService) {}

  @Post()
  @Header('Content-Type', 'text/html; charset=utf-8')
  create(@Body() baseEcpayDto: BaseEcpayDto) {
    return this.ecpayService.aioCheckOutAll(baseEcpayDto);
  }

  @Post('return')
  return(@Body() returnEcpayDto: ReturnEcpayDto) {
    return this.ecpayService.isCheckMacValueValid(returnEcpayDto);
  }

  @Post('invoice')
  issueInvoice(@Body() dto: IssueInvoiceEcpayDecryptedRequestDto) {
    return this.ecpayService.issueInvoice(dto);
  }
}
