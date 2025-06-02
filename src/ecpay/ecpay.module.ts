import { Module } from '@nestjs/common';
import { EcpayService } from './ecpay.service';
import { EcpayController } from './ecpay.controller';

@Module({
  controllers: [EcpayController],
  providers: [EcpayService],
})
export class EcpayModule {}
