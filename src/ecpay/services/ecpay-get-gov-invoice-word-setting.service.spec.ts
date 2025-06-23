import { Test, TestingModule } from '@nestjs/testing';

import { EcpayGetGovInvoiceWordSettingService } from './ecpay-get-gov-invoice-word-setting.service';

describe('EcpayGetGovInvoiceWordSettingService', () => {
  let service: EcpayGetGovInvoiceWordSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayGetGovInvoiceWordSettingService],
    }).compile();

    service = module.get<EcpayGetGovInvoiceWordSettingService>(
      EcpayGetGovInvoiceWordSettingService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
