declare module 'ecpay_aio_nodejs' {
  type OperationMode = 'Test' | 'Production';

  type IgnorePayment =
    | 'Credit'
    | 'WebATM'
    | 'ATM'
    | 'CVS'
    | 'BARCODE'
    | 'AndroidPay';

  export interface EcpayOptions {
    OperationMode: OperationMode;
    MercProfile: {
      MerchantID: string;
      HashKey: string;
      HashIV: string;
    };
    IgnorePayment: IgnorePayment[];
    IsProjectContractor: boolean;
  }

  export interface EcpayBaseParams {
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

  export interface EcpayInvParams {
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

  class ECPayPayment {
    constructor(options: EcpayOptions);

    payment_client: {
      aio_check_out_all(
        base_param: EcpayBaseParams,
        inv_params: EcpayInvParams,
      ): string;
    };
  }

  export default ECPayPayment;
}
