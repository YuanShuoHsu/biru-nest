import { EcpayGetInvoiceWordSettingService } from './ecpay-get-invoice-word-setting.service';

import { Test, TestingModule } from '@nestjs/testing';

describe('EcpayGetInvoiceWordSettingService', () => {
  let service: EcpayGetInvoiceWordSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayGetInvoiceWordSettingService],
    }).compile();

    service = module.get<EcpayGetInvoiceWordSettingService>(
      EcpayGetInvoiceWordSettingService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
