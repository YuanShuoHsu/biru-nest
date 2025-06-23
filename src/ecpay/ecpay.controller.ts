import { Body, Controller, Header, Post } from '@nestjs/common';

import { BaseEcpayDto } from './dto/base-ecpay.dto';
import { IssueInvoiceEcpayDecryptedRequestDto } from './dto/issue-invoice-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';
import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayIssueInvoiceService } from './services/ecpay-issue-invoice.service';

@Controller('ecpay')
export class EcpayController {
  constructor(
    private readonly ecpayBaseService: EcpayBaseService,
    private readonly EcpayIssueInvoiceService: EcpayIssueInvoiceService,
  ) {}

  @Post()
  @Header('Content-Type', 'text/html; charset=utf-8')
  create(@Body() baseEcpayDto: BaseEcpayDto) {
    return this.ecpayBaseService.aioCheckOutAll(baseEcpayDto);
  }

  @Post('return')
  return(@Body() returnEcpayDto: ReturnEcpayDto) {
    return this.ecpayBaseService.isCheckMacValueValid(returnEcpayDto);
  }

  @Post('invoice')
  issueInvoice(@Body() dto: IssueInvoiceEcpayDecryptedRequestDto) {
    return this.EcpayIssueInvoiceService.issueInvoice(dto);
  }
}
