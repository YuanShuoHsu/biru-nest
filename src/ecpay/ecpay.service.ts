import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import ECPayPayment, {
  EcpayBaseParams,
  EcpayInvParams,
  EcpayOptions,
} from 'ecpay_aio_nodejs';

import { CreateEcpayDto } from './dto/create-ecpay.dto';

@Injectable()
export class EcpayService {
  private readonly options: EcpayOptions;

  constructor(private readonly configService: ConfigService) {
    const MerchantID = this.configService.get<string>('ECPAY_MERCHANTID', '');
    const HashKey = this.configService.get<string>('ECPAY_HASHKEY', '');
    const HashIV = this.configService.get<string>('ECPAY_HASHIV', '');

    this.options = {
      OperationMode: 'Test',
      MercProfile: {
        MerchantID,
        HashKey,
        HashIV,
      },
      IgnorePayment: [],
      IsProjectContractor: false,
    };
  }

  aioCheckOutAll({
    base: {
      MerchantTradeNo,
      MerchantTradeDate,
      TotalAmount,
      TradeDesc,
      ItemName,
      ReturnURL,
      ChooseSubPayment,
      OrderResultURL,
      NeedExtraPaidInfo,
      ClientBackURL,
      ItemURL,
      Remark,
      HoldTradeAMT,
      StoreID,
      CustomField1,
      CustomField2,
      CustomField3,
      CustomField4,
    },
    invoice: {
      RelateNumber,
      CustomerName,
      InvoiceItemName,
      InvoiceItemCount,
      InvoiceItemWord,
      InvoiceItemPrice,
      InvoiceItemTaxType,
      CustomerIdentifier,
      CustomerAddr,
      CustomerPhone,
      CustomerEmail,
      ClearanceMark,
      TaxType,
      CarruerType,
      CarruerNum,
      Donation,
      LoveCode,
      Print,
      InvoiceRemark,
      DelayDay,
      InvType,
    },
  }: CreateEcpayDto) {
    const base_param: EcpayBaseParams = {
      MerchantTradeNo,
      MerchantTradeDate,
      TotalAmount,
      TradeDesc,
      ItemName,
      ReturnURL,
      ChooseSubPayment,
      OrderResultURL,
      NeedExtraPaidInfo,
      ClientBackURL,
      ItemURL,
      Remark,
      HoldTradeAMT,
      StoreID,
      CustomField1,
      CustomField2,
      CustomField3,
      CustomField4,
    };

    const inv_params: EcpayInvParams = {
      RelateNumber,
      CustomerName,
      InvoiceItemName,
      InvoiceItemCount,
      InvoiceItemWord,
      InvoiceItemPrice,
      InvoiceItemTaxType,
      CustomerIdentifier,
      CustomerAddr,
      CustomerPhone,
      CustomerEmail,
      ClearanceMark,
      TaxType,
      CarruerType,
      CarruerNum,
      Donation,
      LoveCode,
      Print,
      InvoiceRemark,
      DelayDay,
      InvType,
    };

    const create = new ECPayPayment(this.options);
    const html = create.payment_client.aio_check_out_all(
      base_param,
      inv_params,
    );

    return html;
  }
}
