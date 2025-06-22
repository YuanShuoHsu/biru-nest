import { Test, TestingModule } from '@nestjs/testing';

import { EcpayInvoiceService } from './ecpay-invoice.service';

describe('EcpayService', () => {
  let service: EcpayInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayInvoiceService],
    }).compile();

    service = module.get<EcpayInvoiceService>(EcpayInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
