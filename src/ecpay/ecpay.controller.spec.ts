import { Test, TestingModule } from '@nestjs/testing';
import { EcpayController } from './ecpay.controller';
import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayInvoiceService } from './services/ecpay-invoice.service';

describe('EcpayController', () => {
  let controller: EcpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcpayController],
      providers: [EcpayBaseService, EcpayInvoiceService],
    }).compile();

    controller = module.get<EcpayController>(EcpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
