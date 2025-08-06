import { EcpayUpdateInvoiceWordStatusService } from './ecpay-update-invoice-word-status.service';

import { Test, TestingModule } from '@nestjs/testing';

describe('EcpayUpdateInvoiceWordStatusService', () => {
  let service: EcpayUpdateInvoiceWordStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayUpdateInvoiceWordStatusService],
    }).compile();

    service = module.get<EcpayUpdateInvoiceWordStatusService>(
      EcpayUpdateInvoiceWordStatusService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
