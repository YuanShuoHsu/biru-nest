import { Test, TestingModule } from '@nestjs/testing';

import { EcpayController } from './ecpay.controller';
import { EcpayAddInvoiceWordSettingService } from './services/ecpay-add-invoice-word-setting.service';
import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayGetGovInvoiceWordSettingService } from './services/ecpay-get-gov-invoice-word-setting.service';
import { EcpayGetInvoiceWordSettingService } from './services/ecpay-get-invoice-word-setting.service';
import { EcpayIssueInvoiceService } from './services/ecpay-issue-invoice.service';
import { EcpayUpdateInvoiceWordStatusService } from './services/ecpay-update-invoice-word-status.service';

describe('EcpayController', () => {
  let controller: EcpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcpayController],
      providers: [
        EcpayBaseService,
        EcpayGetGovInvoiceWordSettingService,
        EcpayGetInvoiceWordSettingService,
        EcpayAddInvoiceWordSettingService,
        EcpayUpdateInvoiceWordStatusService,
        EcpayIssueInvoiceService,
      ],
    }).compile();

    controller = module.get<EcpayController>(EcpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
