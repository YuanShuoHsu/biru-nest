import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  EcpayBaseParams,
  EcpayInvParams,
  EcpayOptions,
} from 'ecpay_aio_nodejs';

import * as EcpayPayment from 'ecpay_aio_nodejs';

import { CreateEcpayDto } from './dto/create-ecpay.dto';
import { ReturnEcpayDto } from './dto/return-ecpay.dto';

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
      Language,
      BidingCard,
      MerchantMemberID,
    },
    invoice: {
      RelateNumber,
      CustomerID,
      CustomerIdentifier,
      CustomerName,
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
      InvoiceItemName,
      InvoiceItemCount,
      InvoiceItemWord,
      InvoiceItemPrice,
      InvoiceItemTaxType,
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
      Language,
      BidingCard,
      MerchantMemberID,
    };

    const inv_params: EcpayInvParams = {
      RelateNumber,
      CustomerID,
      CustomerIdentifier,
      CustomerName,
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
      InvoiceItemName,
      InvoiceItemCount,
      InvoiceItemWord,
      InvoiceItemPrice,
      InvoiceItemTaxType,
      InvoiceRemark,
      DelayDay,
      InvType,
    };

    const create = new EcpayPayment(this.options);
    const html = create.payment_client.aio_check_out_all(
      base_param,
      inv_params,
    );
    return html;
  }

  isCheckMacValueValid({
    CheckMacValue,
    ...data
  }: ReturnEcpayDto): '1|OK' | '0|FAIL' {
    const create = new EcpayPayment(this.options);
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

    return checkValue === CheckMacValue ? '1|OK' : '0|FAIL';
  }
}
