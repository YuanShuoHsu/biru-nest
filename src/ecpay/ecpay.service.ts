import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { CreateEcpayDto } from './dto/create-ecpay.dto';

type EcpayMode = 'Test' | 'Production';

const getEcpayApiUrl = (mode: EcpayMode): string => {
  const map: Record<EcpayMode, string> = {
    Test: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
    Production: 'https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5',
  };

  return map[mode];
};

@Injectable()
export class EcpayService {
  private readonly merchantId: string;
  private readonly hashKey: string;
  private readonly hashIV: string;
  private readonly apiUrl: string;

  private readonly returnUrl: string;
  private readonly clientBackUrl: string;
  private readonly orderResultUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.merchantId = configService.getOrThrow('ECPAY_MERCHANT_ID');
    this.hashKey = configService.getOrThrow('ECPAY_HASH_KEY');
    this.hashIV = configService.getOrThrow('ECPAY_HASH_IV');

    const mode = this.configService.getOrThrow<EcpayMode>(
      'ECPAY_OPERATION_MODE',
    );
    this.apiUrl = getEcpayApiUrl(mode);

    this.returnUrl = configService.getOrThrow('ECPAY_RETURN_URL');
    this.clientBackUrl = configService.getOrThrow('ECPAY_CLIENT_BACK_URL');
    this.orderResultUrl = configService.getOrThrow('ECPAY_ORDER_RESULT_URL');
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

  aioCheckOutAll({ base }: CreateEcpayDto): string {
    const tradeNo = `ecpay${uuidv4().replace(/-/g, '').slice(0, 15)}`;

    const raw = {
      MerchantID: this.merchantId,
      MerchantTradeNo: tradeNo,
      MerchantTradeDate: this.getEcpayDateString(),
      PaymentType: 'aio',
      EncryptType: '1',
      ReturnURL: this.returnUrl,
      ChoosePayment: 'ALL',
      ClientBackURL: this.clientBackUrl,
      OrderResultURL: this.orderResultUrl,
      ...base,
    };

    const payload: Record<string, string> = Object.fromEntries(
      Object.entries(raw).map(([key, val]) => [key, String(val)]),
    );

    payload.CheckMacValue = this.generateCheckMacValue(payload);

    const inputs = Object.entries(payload)
      .map(([k, v]) => `<input type="hidden" name="${k}" value="${v}" />`)
      .join('\n');

    return `<form id="ecpayForm" method="POST" action="${this.apiUrl}">
    ${inputs}
    </form>
    <script>document.getElementById('ecpayForm').submit();</script>`;
  }

  isCheckMacValueValid({
    CheckMacValue,
    ...rest
  }: Record<string, string>): '1|OK' | '0|FAIL' {
    const checkValue = this.generateCheckMacValue(rest);

    return checkValue === CheckMacValue ? '1|OK' : '0|FAIL';
  }
}
