// https://developers.ecpay.com.tw/?p=7896

export class InvoiceEcpayEncryptedRequestDto {
  PlatformID: string;
  MerchantID: string;
  RqHeader: {
    Timestamp: number;
  };
  Data: string;
}

export class InvoiceEcpayDecryptedRequestDto {
  MerchantID: string;
  RelateNumber: string;
  ChannelPartner?: string;
  CustomerID?: string;
  ProductServiceID?: string;
  CustomerIdentifier?: string;
  CustomerName?: string;
  CustomerAddr?: string;
  CustomerPhone?: string;
  CustomerEmail?: string;
  ClearanceMark?: '1' | '2';
  Print: '0' | '1';
  Donation: '0' | '1';
  LoveCode?: string;
  CarrierType?: '' | '1' | '2' | '3' | '4' | '5';
  CarrierNum?: string;
  CarrierNum2?: string;
  TaxType: '1' | '2' | '3' | '4' | '9';
  ZeroTaxRateReason?: string;
  SpecialTaxType?: number;
  SalesAmount: number;
  InvoiceRemark?: string;
  Items: {
    ItemSeq: number;
    ItemName: string;
    ItemCount: number;
    ItemWord: string;
    ItemPrice: number;
    ItemTaxType?: '1' | '2' | '3';
    ItemAmount: number;
    ItemRemark?: string;
  }[];
  InvType: '07' | '08';
  vat?: '0' | '1';
}

export class InvoiceEcpayEncryptedResponseDto {
  PlatformID: string;
  MerchantID: string;
  RpHeader: {
    Timestamp: number;
  };
  TransCode: number;
  TransMsg: string;
  Data: string;
}

export class InvoiceEcpayDecryptedResponseDto {
  RtnCode: number;
  RtnMsg: string;
  InvoiceNo: string;
  InvoiceDate: string;
  RandomNumber: string;
}
