import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EcpayController } from './ecpay.controller';

import { EcpayAddInvoiceWordSettingService } from './services/ecpay-add-invoice-word-setting.service';
import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayGetGovInvoiceWordSettingService } from './services/ecpay-get-gov-invoice-word-setting.service';
import { EcpayIssueInvoiceService } from './services/ecpay-issue-invoice.service';

@Module({
  imports: [HttpModule],
  controllers: [EcpayController],
  providers: [
    EcpayBaseService,
    EcpayGetGovInvoiceWordSettingService,
    EcpayAddInvoiceWordSettingService,
    EcpayIssueInvoiceService,
  ],
})
export class EcpayModule {}
