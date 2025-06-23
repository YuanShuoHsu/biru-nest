import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {
  IssueInvoiceEcpayDecryptedRequestDto,
  IssueInvoiceEcpayDecryptedResponseDto,
  IssueInvoiceEcpayEncryptedResponseDto,
} from '../dto/issue-invoice-ecpay.dto';
import { EcpayMode } from '../types/ecpay.types';
import { decryptData, encryptData } from '../utils/ecpay';

const getIssueInvoiceApiUrl = (mode: EcpayMode): string => {
  return mode === 'Test'
    ? 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue'
    : 'https://einvoice.ecpay.com.tw/B2CInvoice/Issue';
};

@Injectable()
export class EcpayIssueInvoiceService {
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
    this.apiUrl = getIssueInvoiceApiUrl(mode);
  }

  async issueInvoice(dto: IssueInvoiceEcpayDecryptedRequestDto) {
    const timestamp = Math.floor(Date.now() / 1000);

    const relateNumber = uuidv4().replace(/-/g, '');
    dto.RelateNumber = relateNumber;

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
      this.httpService.post<IssueInvoiceEcpayEncryptedResponseDto>(
        this.apiUrl,
        requestPayload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );

    const decryptedData = decryptData(Data, this.hashKey, this.hashIV);
    const decodedUrl = decodeURIComponent(decryptedData);
    const decryptedPayload = JSON.parse(
      decodedUrl,
    ) as IssueInvoiceEcpayDecryptedResponseDto;

    return decryptedPayload;
  }
}
