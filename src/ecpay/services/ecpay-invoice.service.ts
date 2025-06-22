import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';

import {
  IssueInvoiceEcpayDecryptedRequestDto,
  IssueInvoiceEcpayDecryptedResponseDto,
  IssueInvoiceEcpayEncryptedResponseDto,
} from '../dto/issue-invoice-ecpay.dto';
import { EcpayMode } from '../types/ecpay.types';

const getEcpayInvoiceApiUrl = (mode: EcpayMode): string => {
  return mode === 'Production'
    ? 'https://einvoice.ecpay.com.tw/B2CInvoice/Issue'
    : 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue';
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
      Buffer.from(this.hashKey, 'ascii'),
      Buffer.from(this.hashIV, 'ascii'),
    );
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private decryptData(hexData: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      Buffer.from(this.hashKey, 'ascii'),
      Buffer.from(this.hashIV, 'ascii'),
    );
    let decrypted = decipher.update(hexData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async issueInvoice(dto: IssueInvoiceEcpayDecryptedRequestDto) {
    const timestamp = Math.floor(Date.now() / 1000);
    const encrypted = this.encryptData(JSON.stringify(dto));

    const requestPayload = {
      MerchantID: this.merchantId,
      RqHeader: {
        Timestamp: timestamp,
      },
      Data: encrypted,
    };

    let response;
    try {
      response = await firstValueFrom(
        this.httpService.post(this.invoiceApiUrl, requestPayload, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    } catch (error) {
      throw new Error(`發票開立失敗：${error}`);
    }

    const responseBody = response.data as IssueInvoiceEcpayEncryptedResponseDto;

    if (responseBody.TransCode !== 1 || !responseBody.Data) {
      throw new Error('ECPay 發票傳輸失敗');
    }

    let decrypted: string;
    try {
      decrypted = this.decryptData(responseBody.Data);
    } catch {
      throw new Error('資料解密失敗');
    }

    let parsed: IssueInvoiceEcpayDecryptedResponseDto;
    try {
      parsed = JSON.parse(decrypted) as IssueInvoiceEcpayDecryptedResponseDto;
    } catch {
      throw new Error('解密後資料 JSON 格式錯誤');
    }

    return {
      ...responseBody,
      Decrypted: parsed,
    };
  }
}
