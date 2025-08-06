import { EcpayIssueInvoiceService } from './ecpay-issue-invoice.service';

import { Test, TestingModule } from '@nestjs/testing';

describe('EcpayIssueInvoiceService', () => {
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
