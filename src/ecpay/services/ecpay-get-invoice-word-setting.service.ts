// src/ecpay/ecpay-get-invoice-word-setting.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { GetGovInvoiceWordSettingEcpayInvoiceTerm } from '../dto/get-gov-invoice-word-setting-ecpay.dto';
import {
  GetInvoiceWordSettingEcpayDecryptedResponseDto,
  GetInvoiceWordSettingEcpayEncryptedResponseDto,
} from '../dto/get-invoice-word-setting-ecpay.dto';
import { EcpayMode } from '../types/ecpay.types';
import { decryptData, encryptData } from '../utils/ecpay';

const getEcpayGetInvoiceWordSettingApiUrl = (mode: EcpayMode): string =>
  mode === 'Test'
    ? 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/GetInvoiceWordSetting'
    : 'https://einvoice.ecpay.com.tw/B2CInvoice/GetInvoiceWordSetting';

interface GetInvoiceWordSettingParams {
  invoiceTerm: GetGovInvoiceWordSettingEcpayInvoiceTerm;
  timestamp: number;
  rocYear: string;
}

@Injectable()
export class EcpayGetInvoiceWordSettingService {
  private readonly merchantId: string;
  private readonly hashKey: string;
  private readonly hashIV: string;
  private readonly apiUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.merchantId = configService.getOrThrow('ECPAY_INVOICE_MERCHANT_ID');
    this.hashKey = configService.getOrThrow('ECPAY_INVOICE_HASH_KEY');
    this.hashIV = configService.getOrThrow('ECPAY_INVOICE_HASH_IV');

    const mode = this.configService.getOrThrow<EcpayMode>(
      'ECPAY_OPERATION_MODE',
    );
    this.apiUrl = getEcpayGetInvoiceWordSettingApiUrl(mode);
  }

  async getInvoiceWordSetting({
    rocYear,
    invoiceTerm,
    timestamp,
  }: GetInvoiceWordSettingParams) {
    const payload = {
      MerchantID: this.merchantId,
      InvoiceYear: rocYear,
      InvoiceTerm: invoiceTerm,
      UseStatus: 0,
      InvoiceCategory: 1,
      InvType: '07',
      //   ProductServiceId: '',
      //   InvoiceHeader: '',
    };

    const plainText = JSON.stringify(payload);
    const encodedUrl = encodeURIComponent(plainText);
    const encryptedData = encryptData(encodedUrl, this.hashKey, this.hashIV);

    const requestPayload = {
      // PlatformID: '',
      MerchantID: this.merchantId,
      RqHeader: {
        Timestamp: timestamp,
      },
      Data: encryptedData,
    };

    const {
      data: { Data },
    } = await firstValueFrom(
      this.httpService.post<GetInvoiceWordSettingEcpayEncryptedResponseDto>(
        this.apiUrl,
        requestPayload,
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );

    const decryptedData = decryptData(Data, this.hashKey, this.hashIV);
    const decodedUrl = decodeURIComponent(decryptedData);
    const decryptedPayload = JSON.parse(
      decodedUrl,
    ) as GetInvoiceWordSettingEcpayDecryptedResponseDto;

    return decryptedPayload;
  }
}
