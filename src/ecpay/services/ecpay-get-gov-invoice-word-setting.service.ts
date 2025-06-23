// src/ecpay/ecpay-get-gov-invoice-word-setting.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import {
  GetGovInvoiceWordSettingEcpayDecryptedResponseDto,
  GetGovInvoiceWordSettingEcpayEncryptedResponseDto,
  GetGovInvoiceWordSettingEcpayRequestDto,
} from '../dto/get-gov-invoice-word-setting-ecpay.dto';
import { EcpayMode } from '../types/ecpay.types';
import { decryptData, encryptData } from '../utils/ecpay';

const getGovInvoiceWordSettingApiUrl = (mode: EcpayMode): string =>
  mode === 'Test'
    ? 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/GetGovInvoiceWordSetting'
    : 'https://einvoice.ecpay.com.tw/B2CInvoice/GetGovInvoiceWordSetting';

@Injectable()
export class EcpayGetGovInvoiceWordSettingService {
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
    this.apiUrl = getGovInvoiceWordSettingApiUrl(mode);
  }

  async getGovInvoiceWordSetting(dto: GetGovInvoiceWordSettingEcpayRequestDto) {
    const timestamp = Math.floor(Date.now() / 1000);

    const plainText = JSON.stringify(dto);
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
      this.httpService.post<GetGovInvoiceWordSettingEcpayEncryptedResponseDto>(
        this.apiUrl,
        requestPayload,
        { headers: { 'Content-Type': 'application/json' } },
      ),
    );

    const decryptedData = decryptData(Data, this.hashKey, this.hashIV);
    const decodedUrl = decodeURIComponent(decryptedData);
    const decryptedPayload = JSON.parse(
      decodedUrl,
    ) as GetGovInvoiceWordSettingEcpayDecryptedResponseDto;

    return decryptedPayload;
  }
}
