import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ECPayPayment from 'ecpay_aio_nodejs';
import { CreateEcpayDto } from './dto/create-ecpay.dto';

type OperationMode = 'Test' | 'Production';

type IgnorePayment =
  | 'Credit'
  | 'WebATM'
  | 'ATM'
  | 'CVS'
  | 'BARCODE'
  | 'AndroidPay';

interface EcpayOptions {
  OperationMode: OperationMode;
  MercProfile: {
    MerchantID: string;
    HashKey: string;
    HashIV: string;
  };
  IgnorePayment: IgnorePayment[];
  IsProjectContractor: boolean;
}

interface EcpayBaseParams {
  MerchantTradeNo: string;
  MerchantTradeDate: string;
  TotalAmount: string;
  TradeDesc: string;
  ItemName: string;
  ReturnURL: string;
  ChooseSubPayment?: string;
  OrderResultURL?: string;
  NeedExtraPaidInfo?: string;
  ClientBackURL?: string;
  ItemURL?: string;
  Remark?: string;
  HoldTradeAMT?: string;
  StoreID?: string;
  CustomField1?: string;
  CustomField2?: string;
  CustomField3?: string;
  CustomField4?: string;
}

interface EcpayInvParams {
  RelateNumber: string;
  CustomerID?: string;
  CustomerIdentifier?: string;
  CustomerName?: string;
  CustomerAddr?: string;
  CustomerPhone?: string;
  CustomerEmail?: string;
  ClearanceMark?: string;
  TaxType?: string;
  CarruerType?: string;
  CarruerNum?: string;
  Donation?: string;
  LoveCode?: string;
  Print?: string;
  InvoiceItemName?: string;
  InvoiceItemCount?: string;
  InvoiceItemWord?: string;
  InvoiceItemPrice?: string;
  InvoiceItemTaxType?: string;
  InvoiceRemark?: string;
  DelayDay?: string;
  InvType?: string;
}

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

  aioCheckOutAll(createDto: CreateEcpayDto) {
    const base_param: EcpayBaseParams = {
      MerchantTradeNo: createDto.Base.MerchantTradeNo,
      MerchantTradeDate: createDto.Base.MerchantTradeDate,
      TotalAmount: createDto.Base.TotalAmount,
      TradeDesc: createDto.Base.TradeDesc,
      ItemName: createDto.Base.ItemName,
      ReturnURL: createDto.Base.ReturnURL,
      ChooseSubPayment: createDto.Base.ChooseSubPayment
        ? createDto.Base.ChooseSubPayment.join(',')
        : undefined,
      OrderResultURL: createDto.Base.OrderResultURL,
      NeedExtraPaidInfo: createDto.Base.NeedExtraPaidInfo,
      ClientBackURL: createDto.Base.ClientBackURL,
      ItemURL: createDto.Base.ItemURL,
      Remark: createDto.Base.Remark,
      HoldTradeAMT: createDto.Base.HoldTradeAMT,
      StoreID: createDto.Base.StoreID,
      CustomField1: createDto.Base.CustomField1,
      CustomField2: createDto.Base.CustomField2,
      CustomField3: createDto.Base.CustomField3,
      CustomField4: createDto.Base.CustomField4,
    };

    // 再把 Invoice 部分拆出來
    const inv_params: EcpayInvParams = {
      RelateNumber: createDto.Invoice.RelateNumber,
      CustomerName: createDto.Invoice.CustomerName,
      InvoiceItemName: createDto.Invoice.InvoiceItemName,
      InvoiceItemCount: createDto.Invoice.InvoiceItemCount,
      InvoiceItemWord: createDto.Invoice.InvoiceItemWord,
      InvoiceItemPrice: createDto.Invoice.InvoiceItemPrice,
      InvoiceItemTaxType: createDto.Invoice.InvoiceItemTaxType,
      CustomerIdentifier: createDto.Invoice.CustomerIdentifier,
      CustomerAddr: createDto.Invoice.CustomerAddr,
      CustomerPhone: createDto.Invoice.CustomerPhone,
      CustomerEmail: createDto.Invoice.CustomerEmail,
      ClearanceMark: createDto.Invoice.ClearanceMark,
      TaxType: createDto.Invoice.TaxType,
      CarruerType: createDto.Invoice.CarruerType,
      CarruerNum: createDto.Invoice.CarruerNum,
      Donation: createDto.Invoice.Donation,
      LoveCode: createDto.Invoice.LoveCode,
      Print: createDto.Invoice.Print,
      InvoiceRemark: createDto.Invoice.InvoiceRemark,
      DelayDay: createDto.Invoice.DelayDay,
      InvType: createDto.Invoice.InvType,
    };

    const create = new ECPayPayment(this.options);
    const html = create.payment_client.aio_check_out_all(
      base_param,
      inv_params,
    );
    return html;
  }
}
