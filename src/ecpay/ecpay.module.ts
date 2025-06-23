import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EcpayController } from './ecpay.controller';

import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayIssueInvoiceService } from './services/ecpay-issue-invoice.service';

@Module({
  imports: [HttpModule],
  controllers: [EcpayController],
  providers: [EcpayBaseService, EcpayIssueInvoiceService],
})
export class EcpayModule {}
