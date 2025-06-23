import { Test, TestingModule } from '@nestjs/testing';
import { EcpayController } from './ecpay.controller';
import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayIssueInvoiceService } from './services/ecpay-issue-invoice.service';

describe('EcpayController', () => {
  let controller: EcpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcpayController],
      providers: [EcpayBaseService, EcpayIssueInvoiceService],
    }).compile();

    controller = module.get<EcpayController>(EcpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
