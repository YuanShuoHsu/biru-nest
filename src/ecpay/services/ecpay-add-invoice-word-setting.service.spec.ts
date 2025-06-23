import { Test, TestingModule } from '@nestjs/testing';

import { EcpayAddInvoiceWordSettingService } from './ecpay-add-invoice-word-setting.service';

describe('EcpayAddInvoiceWordSettingService', () => {
  let service: EcpayAddInvoiceWordSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayAddInvoiceWordSettingService],
    }).compile();

    service = module.get<EcpayAddInvoiceWordSettingService>(
      EcpayAddInvoiceWordSettingService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
