import { Body, Controller, Header, Post } from '@nestjs/common';

import { BaseEcpayDto } from './dto/base-ecpay.dto';
import { IssueInvoiceEcpayDecryptedRequestDto } from './dto/issue-invoice-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';
import { EcpayAddInvoiceWordSettingService } from './services/ecpay-add-invoice-word-setting.service';
import { EcpayBaseService } from './services/ecpay-base.service';
import { EcpayGetGovInvoiceWordSettingService } from './services/ecpay-get-gov-invoice-word-setting.service';
import { EcpayGetInvoiceWordSettingService } from './services/ecpay-get-invoice-word-setting.service';
import { EcpayIssueInvoiceService } from './services/ecpay-issue-invoice.service';

@Controller('ecpay')
export class EcpayController {
  constructor(
    private readonly ecpayBaseService: EcpayBaseService,
    private readonly ecpayGetGovInvoiceWordSettingService: EcpayGetGovInvoiceWordSettingService,
    private readonly ecpayGetInvoiceWordSettingService: EcpayGetInvoiceWordSettingService,
    private readonly ecpayAddInvoiceWordSettingService: EcpayAddInvoiceWordSettingService,
    private readonly ecpayIssueInvoiceService: EcpayIssueInvoiceService,
  ) {}

  @Post()
  @Header('Content-Type', 'text/html; charset=utf-8')
  base(@Body() baseEcpayDto: BaseEcpayDto) {
    return this.ecpayBaseService.aioCheckOutAll(baseEcpayDto);
  }

  @Post('return')
  return(@Body() returnEcpayDto: ReturnEcpayDto) {
    return this.ecpayBaseService.isCheckMacValueValid(returnEcpayDto);
  }

  @Post('get-gov-invoice-word-setting')
  async getGovInvoiceWordSetting() {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    const invoiceTerm = Math.floor(now.getMonth() / 2) + 1;
    const rocYear = (now.getFullYear() - 1911).toString();

    const { InvoiceInfo } =
      await this.ecpayGetGovInvoiceWordSettingService.getGovInvoiceWordSetting({
        rocYear,
        timestamp,
      });

    const { InvoiceInfo: existingInvoiceInfo } =
      await this.ecpayGetInvoiceWordSettingService.getInvoiceWordSetting({
        invoiceTerm,
        rocYear,
        timestamp,
      });

    console.log(existingInvoiceInfo);

    // const existingTrackIDs = new Set(existingInvoiceInfo.map((i) => i.TrackID));

    // const toBeAdded = govInvoiceInfo.filter(
    //   (item) => !existingTrackIDs.has(item.TrackID),
    // );

    const result =
      await this.ecpayAddInvoiceWordSettingService.addInvoiceWordSetting({
        invoiceInfo: InvoiceInfo,
        invoiceTerm,
        rocYear,
        timestamp,
      });

    return result;
  }

  @Post('issue-invoice')
  issueInvoice(@Body() dto: IssueInvoiceEcpayDecryptedRequestDto) {
    return this.ecpayIssueInvoiceService.issueInvoice(dto);
  }
}
