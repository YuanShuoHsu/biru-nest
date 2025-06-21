import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { EcpayController } from './ecpay.controller';
import { EcpayService } from './ecpay.service';

@Module({
  imports: [HttpModule],
  controllers: [EcpayController],
  providers: [EcpayService],
})
export class EcpayModule {}
