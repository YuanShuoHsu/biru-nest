import { Test, TestingModule } from '@nestjs/testing';

import { EcpayIssueInvoiceService } from './ecpay-issue-invoice.service';

describe('EcpayService', () => {
  let service: EcpayIssueInvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayIssueInvoiceService],
    }).compile();

    service = module.get<EcpayIssueInvoiceService>(EcpayIssueInvoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
