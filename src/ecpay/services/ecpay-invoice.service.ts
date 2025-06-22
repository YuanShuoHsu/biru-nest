import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import {
  IssueInvoiceEcpayDecryptedRequestDto,
  IssueInvoiceEcpayDecryptedResponseDto,
  IssueInvoiceEcpayEncryptedResponseDto,
} from '../dto/issue-invoice-ecpay.dto';
import { EcpayMode } from '../types/ecpay.types';

const getEcpayInvoiceApiUrl = (mode: EcpayMode): string => {
  return mode === 'Test'
    ? 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue'
    : 'https://einvoice.ecpay.com.tw/B2CInvoice/Issue';
};

@Injectable()
export class EcpayInvoiceService {
  private readonly merchantId: string;
  private readonly hashKey: string;
  private readonly hashIV: string;
  private readonly invoiceApiUrl: string;

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
    this.invoiceApiUrl = getEcpayInvoiceApiUrl(mode);
  }

  private encryptData(plaintext: string): string {
    const cipher = crypto.createCipheriv(
      'aes-128-cbc',
      Buffer.from(this.hashKey, 'utf8'),
      Buffer.from(this.hashIV, 'utf8'),
    );
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }

  private decryptData(base64Data: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      Buffer.from(this.hashKey, 'utf8'),
      Buffer.from(this.hashIV, 'utf8'),
    );
    let decrypted = decipher.update(base64Data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async issueInvoice(dto: IssueInvoiceEcpayDecryptedRequestDto) {
    const timestamp = Math.floor(Date.now() / 1000);

    const relateNumber = uuidv4().replace(/-/g, '');
    dto.RelateNumber = relateNumber;

    const plainText = JSON.stringify(dto);
    const urlEncoded = encodeURIComponent(plainText);
    const encryptedData = this.encryptData(urlEncoded);

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
        this.invoiceApiUrl,
        requestPayload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );

    const decryptedData = this.decryptData(Data);
    const urlDecoded = decodeURIComponent(decryptedData);
    const decryptedPayload: IssueInvoiceEcpayDecryptedResponseDto =
      JSON.parse(urlDecoded);

    return {
      ...decryptedPayload,
    };
  }
}
