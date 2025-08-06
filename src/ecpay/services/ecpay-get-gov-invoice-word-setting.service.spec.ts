import { EcpayGetGovInvoiceWordSettingService } from './ecpay-get-gov-invoice-word-setting.service';

import { Test, TestingModule } from '@nestjs/testing';

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
