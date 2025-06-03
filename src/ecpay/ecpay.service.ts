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

  aioCheckOutAll({ Base, Invoice }: CreateEcpayDto) {
    const base_param: EcpayBaseParams = {
      MerchantTradeNo: Base.MerchantTradeNo,
      MerchantTradeDate: Base.MerchantTradeDate,
      TotalAmount: Base.TotalAmount,
      TradeDesc: Base.TradeDesc,
      ItemName: Base.ItemName,
      ReturnURL: Base.ReturnURL,
      ChooseSubPayment: Base.ChooseSubPayment
        ? Base.ChooseSubPayment.join(',')
        : undefined,
      OrderResultURL: Base.OrderResultURL,
      NeedExtraPaidInfo: Base.NeedExtraPaidInfo,
      ClientBackURL: Base.ClientBackURL,
      ItemURL: Base.ItemURL,
      Remark: Base.Remark,
      HoldTradeAMT: Base.HoldTradeAMT,
      StoreID: Base.StoreID,
      CustomField1: Base.CustomField1,
      CustomField2: Base.CustomField2,
      CustomField3: Base.CustomField3,
      CustomField4: Base.CustomField4,
    };

    const inv_params: EcpayInvParams = {
      RelateNumber: Invoice.RelateNumber,
      CustomerName: Invoice.CustomerName,
      InvoiceItemName: Invoice.InvoiceItemName,
      InvoiceItemCount: Invoice.InvoiceItemCount,
      InvoiceItemWord: Invoice.InvoiceItemWord,
      InvoiceItemPrice: Invoice.InvoiceItemPrice,
      InvoiceItemTaxType: Invoice.InvoiceItemTaxType,
      CustomerIdentifier: Invoice.CustomerIdentifier,
      CustomerAddr: Invoice.CustomerAddr,
      CustomerPhone: Invoice.CustomerPhone,
      CustomerEmail: Invoice.CustomerEmail,
      ClearanceMark: Invoice.ClearanceMark,
      TaxType: Invoice.TaxType,
      CarruerType: Invoice.CarruerType,
      CarruerNum: Invoice.CarruerNum,
      Donation: Invoice.Donation,
      LoveCode: Invoice.LoveCode,
      Print: Invoice.Print,
      InvoiceRemark: Invoice.InvoiceRemark,
      DelayDay: Invoice.DelayDay,
      InvType: Invoice.InvType,
    };

    const create = new ECPayPayment(this.options);
    const html = create.payment_client.aio_check_out_all(
      base_param,
      inv_params,
    );

    return html;
  }
}
