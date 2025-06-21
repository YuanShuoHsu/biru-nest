import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';
import { firstValueFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { BaseEcpayDto } from './dto/base-ecpay.dto';
import {
  IssueInvoiceEcpayDecryptedRequestDto,
  IssueInvoiceEcpayDecryptedResponseDto,
  IssueInvoiceEcpayEncryptedResponseDto,
} from './dto/issue-invoice-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';

type EcpayApiType = 'base' | 'invoice';
type EcpayMode = 'Test' | 'Production';

const getEcpayApiUrl = (type: EcpayApiType, mode: EcpayMode): string => {
  const urls = {
    base: {
      Test: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
      Production: 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5',
    },
    invoice: {
      Test: 'https://einvoice-stage.ecpay.com.tw/B2CInvoice/Issue',
      Production: 'https://einvoice.ecpay.com.tw/B2CInvoice/Issue',
    },
  };

  return urls[type][mode];
};

const toStringRecord = (input: Record<string, any>): Record<string, string> =>
  Object.fromEntries(
    Object.entries(input).map(([key, val]) => [key, String(val)]),
  );

@Injectable()
export class EcpayService {
  private readonly merchantId: string;
  private readonly hashKey: string;
  private readonly hashIV: string;

  private readonly baseApiUrl: string;
  private readonly invoiceApiUrl: string;

  private readonly returnUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.merchantId = configService.getOrThrow('ECPAY_MERCHANT_ID');
    this.hashKey = configService.getOrThrow('ECPAY_HASH_KEY');
    this.hashIV = configService.getOrThrow('ECPAY_HASH_IV');

    const mode = this.configService.getOrThrow<EcpayMode>(
      'ECPAY_OPERATION_MODE',
    );
    this.baseApiUrl = getEcpayApiUrl('base', mode);
    this.invoiceApiUrl = getEcpayApiUrl('invoice', mode);

    this.returnUrl = configService.getOrThrow('ECPAY_RETURN_URL');
  }

  private getEcpayDateString(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const HH = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
  }

  private generateCheckMacValue(params: Record<string, string>): string {
    const sorted = Object.keys(params).sort();
    const raw = `HashKey=${this.hashKey}&${sorted.map((k) => `${k}=${params[k]}`).join('&')}&HashIV=${this.hashIV}`;
    const urlEncoded = encodeURIComponent(raw)
      .toLowerCase()
      .replace(/%20/g, '+')
      .replace(/%2d/g, '-')
      .replace(/%5f/g, '_')
      .replace(/%2e/g, '.')
      .replace(/%21/g, '!')
      .replace(/%2a/g, '*')
      .replace(/%28/g, '(')
      .replace(/%29/g, ')');

    return crypto
      .createHash('sha256')
      .update(urlEncoded)
      .digest('hex')
      .toUpperCase();
  }

  aioCheckOutAll(dto: BaseEcpayDto): string {
    const tradeNo = `ecpay${uuidv4().replace(/-/g, '').slice(0, 15)}`;

    const raw = {
      ...dto,
      MerchantID: this.merchantId,
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: this.getEcpayDateString(),
      PaymentType: 'aio',
      EncryptType: '1',
      ReturnURL: this.returnUrl,
      ChoosePayment: 'ALL',
    };

    const payload = toStringRecord(raw);

    payload.CheckMacValue = this.generateCheckMacValue(payload);

    const inputs = Object.entries(payload)
      .map(([k, v]) => `<input type="hidden" name="${k}" value="${v}" />`)
      .join('\n');

    return `<form id="ecpayForm" method="POST" action="${this.baseApiUrl}">
    ${inputs}
    </form>
    <script>document.getElementById('ecpayForm').submit();</script>`;
  }

  isCheckMacValueValid({
    CheckMacValue,
    ...rest
  }: ReturnEcpayDto): '1|OK' | '0|FAIL' {
    const payload = toStringRecord(rest);

    const checkValue = this.generateCheckMacValue(payload);

    return checkValue === CheckMacValue ? '1|OK' : '0|FAIL';
  }

  private encryptData(plaintext: string): string {
    const cipher = crypto.createCipheriv(
      'aes-128-cbc',
      this.hashKey,
      this.hashIV,
    );
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private decryptData(hexData: string): string {
    const decipher = crypto.createDecipheriv(
      'aes-128-cbc',
      this.hashKey,
      this.hashIV,
    );
    let decrypted = decipher.update(hexData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async issueInvoice(dto: IssueInvoiceEcpayDecryptedRequestDto) {
    const timestamp = Math.floor(Date.now() / 1000);

    const encrypted = this.encryptData(JSON.stringify(dto));

    const requestPayload = {
      PlatformID: '',
      MerchantID: this.merchantId,
      RqHeader: {
        Timestamp: timestamp,
      },
      Data: encrypted,
    };

    const response = await firstValueFrom(
      this.httpService.post(this.invoiceApiUrl, requestPayload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const responseBody = response.data as IssueInvoiceEcpayEncryptedResponseDto;

    const decrypted = this.decryptData(responseBody.Data);
    const decryptedResult = JSON.parse(
      decrypted,
    ) as IssueInvoiceEcpayDecryptedResponseDto;

    return {
      ...responseBody,
      Decrypted: decryptedResult,
    };
  }
}
