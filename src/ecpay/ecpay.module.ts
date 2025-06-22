import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EcpayController } from './ecpay.controller';

import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayInvoiceService } from './services/ecpay-invoice.service';

@Module({
  imports: [HttpModule],
  controllers: [EcpayController],
  providers: [EcpayBaseService, EcpayInvoiceService],
})
export class EcpayModule {}
