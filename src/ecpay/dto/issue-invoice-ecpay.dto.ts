// https://developers.ecpay.com.tw/?p=7896

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class IssueInvoiceEcpayEncryptedRequestHeaderDto {
  @ApiProperty({
    description: `傳入時間（必填）  
請將傳輸時間轉換為時間戳（GMT+8），綠界會利用此參數將當下的時間轉為 Unix TimeStamp 來驗證此次介接的時間區間。

注意事項：
- 驗證時間區間暫訂為 10 分鐘內有效，若超過此驗證時間則此次訂單將無法建立，參考資料：http://www.epochconverter.com/。
- 合作特店須進行主機「時間校正」，避免主機產生時差，導致 API 無法正常運作。`,
    example: 1525168923,
  })
  @IsDefined()
  @IsNumber()
  Timestamp: number;
}

export class IssueInvoiceEcpayEncryptedRequestDto {
  @ApiPropertyOptional({
    description: `特約合作平台商代號
- 這個參數是專為與綠界簽約的指定平台商所設計，只有在申請開通後才能使用。
- 如果您是一般廠商，請在介接時將此參數欄位保留為空。
- 對於平台商，在使用時需要在 MerchantID（特店編號）欄位中填入與您已經完成綁定子廠商的 MerchantID（特定編號）。  
請注意，只能使用已綁定的子廠商編號，以避免操作失敗。綁定作業請洽所屬業務。`,
    example: '',
    maxLength: 10,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  PlatformID?: string;

  @ApiProperty({
    description: `特店編號（必填）
- 測試環境合作特店編號
- 正式環境金鑰取得`,
    example: '2000132',
    maxLength: 10,
    minLength: 1,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  MerchantID: string;

  @ApiProperty({
    description: '傳入資料（必填）',
    type: () => IssueInvoiceEcpayEncryptedRequestHeaderDto,
  })
  @IsDefined()
  @Type(() => IssueInvoiceEcpayEncryptedRequestHeaderDto)
  @ValidateNested()
  RqHeader: IssueInvoiceEcpayEncryptedRequestHeaderDto;

  @ApiProperty({
    description: `加密資料（必填）  
此為加密過JSON格式的資料。加密方法說明`,
    example: '加密資料',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  Data: string;
}

const ISSUE_INVOICE_ECPAY_CUSTOMER_EMAIL_REGEX =
  // eslint-disable-next-line
  /^((([A-Za-z]|\d|[!#\$%&’\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([A-Za-z]|\d|[!#\$%&’\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([A-Za-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([A-Za-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/u;

enum IssueInvoiceEcpayClearanceMark {
  Taxable = '1',
  ZeroTaxRate = '2',
}

enum IssueInvoiceEcpayPrint {
  No = '0',
  Yes = '1',
}

enum IssueInvoiceEcpayDonation {
  No = '0',
  Yes = '1',
}

enum IssueInvoiceEcpayCarrierType {
  None = '',
  EcpayCarrier = '1',
  Citizen = '2',
  MobileBarcode = '3',
  EasyCard = '4',
  iPass = '5',
}

export class IssueInvoiceEcpayDecryptedRequestDto {
  @ApiProperty({
    description: '特店編號（必填）',
    example: '2000132',
    maxLength: 10,
    minLength: 1,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  MerchantID: string;

  @ApiProperty({
    description: `特店自訂編號（必填）  
需為唯一值不可重複使用

注意事項：
- 請勿使用特殊符號
- 大小寫英文視為相同 (e.g. 123abc456=123ABC456)`,
    example: '20181028000000001',
    maxLength: 50,
    minLength: 1,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  RelateNumber: string;

  @ApiPropertyOptional({
    description: `通路商編號  
1：蝦皮  
其餘數值忽略無效`,
    example: '',
    maxLength: 1,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 1)
  ChannelPartner?: string;

  @ApiPropertyOptional({
    description: `客戶編號  
格式為『英文、數字、下底線』等字元`,
    example: '',
    maxLength: 20,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  CustomerID?: string;

  @ApiPropertyOptional({
    description: `產品服務別代號
- 該參數必須由英文字母（A-Z, a-z）和數字（0-9）組成，其長度必須在 1 到 10 個字符之間。
- 此參數只有在【B2C 系統多組字軌】開關為【啟用】時，帶入值才會進行處理，否則會忽略此參數。如需啟用請洽所屬業務。
- 具體步驟參考如下：
1. 聯繫所屬業務 <啟用> B2C 系統多組字軌功能
2. 至廠商後台 <字軌分類管理> 節點，新增商品/服務別，例如 A0001-餐具、A0002-清潔用品，可參考 電子發票系統操作手冊 <字軌分類管理> 章節說明
3. 至廠商後台 <字軌與配號設定> 節點，新增字軌配號，可參考 電子發票系統操作手冊 <字軌與配號設定> 章節說明
4. 透過開立發票 API，此參數 [ProductServiceID] 帶入先前廠商後台設定的 A0001 或 A0002，即可完成發票開立`,
    example: '',
    maxLength: 20,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  ProductServiceID?: string;

  @ApiPropertyOptional({
    description: `統一編號
- 格式為數字，固定長度為 8 碼
- 根據財政部的最新公告，針對統一編號的檢核方式做了調整。  
您可以點擊以下連結查看：  
[財政部財政資訊中心營利事業統一編號檢查碼邏輯修正說明]
- 如未符合上述檢核邏輯，則開立發票、設定交易對象維護資料時將會失敗，請營業人務必提供正確的統一編號
- 只會做格式邏輯檢核，不會去查詢公開資料庫是否存在`,
    example: '',
    maxLength: 8,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 8)
  CustomerIdentifier?: string;

  @ApiPropertyOptional({
    description: `客戶名稱
- 當列印註記 [Print]=1（列印）時，此參數為必填
- 格式為中、英文及數字等。
- 當統一編號 [CustomerIdentifier] 有值時，請帶入相對應的營業人名稱，可參照以下 API 取得多數的對應公司名稱統一編號驗證 API`,
    example: '綠界科技股份有限公司',
    maxLength: 60,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 60)
  CustomerName?: string;

  @ApiPropertyOptional({
    description: `客戶地址  
當列印註記 [Print]=1（列印）時，此參數為必填`,
    example: '106台北市南港區發票一街1號1樓',
    maxLength: 100,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  CustomerAddr?: string;

  @ApiPropertyOptional({
    description: `客戶手機號碼
- 當客戶電子信箱[CustomerEmail]為空字串時，為必填。
- 格式為數字`,
    example: '',
    maxLength: 20,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  CustomerPhone?: string;

  @ApiPropertyOptional({
    description: `客戶電子信箱
- 當客戶手機號碼[CustomerPhone]為空字串時，為必填。
- 需為有效的Email格式，且僅可填寫一組Email。
- 格式檢核正規表達式為：

注意事項：
- 測試環境請勿帶入之真實電子信箱，避免個資外洩。
- 測試環境僅作API串接測試使用，僅以API回覆成功或失敗；不提供發信測試，僅驗規則。
- 格式檢核正規表達式為：\`\`\`${ISSUE_INVOICE_ECPAY_CUSTOMER_EMAIL_REGEX}\`\`\``,
    example: 'test@ecpay.com.tw',
    maxLength: 80,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 80)
  @Matches(ISSUE_INVOICE_ECPAY_CUSTOMER_EMAIL_REGEX)
  CustomerEmail?: string;

  @ApiPropertyOptional({
    description: `通關方式
- 當課稅類別 [TaxType] 為 2（零稅率）或 9（混合應稅與零稅率）時，為必填  
1：非經海關出口  
2：經海關出口`,
    enum: IssueInvoiceEcpayClearanceMark,
    example: IssueInvoiceEcpayClearanceMark.Taxable,
    maxLength: 1,
    minLength: 1,
  })
  @IsOptional()
  @IsNumberString()
  @Length(1, 1)
  @IsEnum(IssueInvoiceEcpayClearanceMark)
  ClearanceMark?: IssueInvoiceEcpayClearanceMark;

  @ApiProperty({
    description: `列印註記（必填）  
0：不列印  
1：列印

注意事項：
1. 請注意此參數的意義為註記這張發票之後會被廠商自行印出紙本，綠界上傳財政部時也會提供這個參數讓財政部知道這張發票是被列印成紙本的，並不是指由綠界代為列印與寄送
2. 當捐贈註記 [Donation]=1（要捐贈），此參數請帶 0
3. 當統一編號 [CustomerIdentifier] 有值時  
2.a 載具類別 [CarrierType] 為空值時，此參數請帶 1  
2.b 載具類別 [CarrierType]=1 或 2 時，此參數請帶 0  
2.c 載具類別 [CarrierType]=3 時，此參數可帶 0 或 1

注意事項：

超商 KIOSK 事務機列印注意事項（除須向業務申請開通外，請按以下需求帶入參數）
1. 要列印消費發票（ibon）  
Print=1，CarrierType=””，CustomerIdentifier=””，Donation=0，只能列印一次（之後中獎也無法再次列印）
2. 要列印中獎發票（ibon, FamiPort）  
Print=0，CarrierType=1，CustomerIdentifier=””，Donation=0，只能列印一次
3. 折讓後發票金額為 0 元，不可列印`,
    enum: IssueInvoiceEcpayPrint,
    example: IssueInvoiceEcpayPrint.Yes,
    maxLength: 1,
    minLength: 1,
  })
  @IsDefined()
  @IsNumberString()
  @Length(1, 1)
  @IsEnum(IssueInvoiceEcpayPrint)
  Print: IssueInvoiceEcpayPrint;

  @ApiProperty({
    description: `捐贈註記（必填）  
0：不捐贈  
1：捐贈

注意事項：
1. 當統一編號 [CustomerIdentifier] 有值時，此參數請帶 0
2. 當載具類別 [CarrierType] 不為空字串且捐贈註記 [Donation]=1 時，代表此張發票開立當下是存在載具內，之後消費者將此張發票進行捐贈成功，所以此張發票最終狀態是捐贈成功`,
    enum: IssueInvoiceEcpayDonation,
    example: IssueInvoiceEcpayDonation.No,
    maxLength: 1,
    minLength: 1,
  })
  @IsDefined()
  @IsNumberString()
  @Length(1, 1)
  @IsEnum(IssueInvoiceEcpayDonation)
  Donation: IssueInvoiceEcpayDonation;

  @ApiPropertyOptional({
    description: `捐贈碼
- 當捐贈註記 [Donation]=1（要捐贈）時，為必填。
- 格式為阿拉伯數字為限，最少三碼，最多七碼，首位可以為零。

注意事項：使用捐贈碼時，請先呼叫捐贈碼驗證進行檢核，避免輸入錯誤。

推薦捐贈碼 168001  
OMG 關懷社會愛心基金會  
成立於 2009 年，希望能集結網友族群的心意，將愛傳遞到社會的每一個角落。  
本基金會致力於：清寒學生及偏遠學校助學、流浪動物與動物保育議題、老人及弱勢團體、急難救助、人道救援、社會公益活動推廣及廣告贊助…等。`,
    example: '',
    maxLength: 7,
    minLength: 3,
  })
  @IsOptional()
  @IsNumberString()
  @Length(3, 7)
  LoveCode?: string;

  @ApiPropertyOptional({
    description: `載具類別  
空字串：無載具  
1：綠界電子發票載具  
2：自然人憑證號碼  
3：手機條碼載具  
4：悠遊卡  
5：一卡通

注意事項：
- 當列印參數 [Print]=1（需列印）且發票含統編時，若同時需存放載具，則僅能使用手機條碼載具（值為 3）；若不使用載具，則請傳入空字串。
- 當列印註記 [Print]=0（不列印），且統一編號 [CustomerIdentifier] 有值時，此參數不可帶空字串。
- 只有存在綠界電子發票載具（此參數帶 1）的發票，中獎後才能在 ibon 列印領取必填`,
    enum: IssueInvoiceEcpayCarrierType,
    example: IssueInvoiceEcpayCarrierType.None,
    maxLength: 1,
    minLength: 1,
  })
  @IsOptional()
  @IsNumberString()
  @Length(1, 1)
  @IsEnum(IssueInvoiceEcpayCarrierType)
  CarrierType?: IssueInvoiceEcpayCarrierType;

  @ApiPropertyOptional({
    description: `載具編號 
- 當 [CarrierType]=”” 時，請帶空字串。
- 當[CarrierType]=1  
請帶空字串，系統會自動帶入值，為客戶電子信箱或客戶手機號碼擇一（以客戶電子信箱優先），請注意，綠界會重新編碼後產出綠界載具編號。
- [CarrierType]=2  
請帶固定長度為 16 且格式為 2 碼大寫英文字母加上 14 碼數字
- [CarrierType]=3  
請帶固定長度為 8 碼字元，第 1 碼為【/】; 其餘 7 碼則由數字【0-9】、大寫英文【A-Z】與特殊符號【+】【-】【.】這 39 個字元組成的編號。
- 當[CarrierType]=4 或 5  
必填，請帶入實體卡片的 <隱碼id>，不會檢核。

注意事項：
1. 英文、數字、符號僅接受半形字元，格式錯誤會造成開立失敗
2. 若為手機條碼載具時，請先呼叫手機條碼驗證進行檢核，一旦手機條碼有誤，會造成發票歸戶失敗。
3. 針對悠遊卡或一卡通如何取得卡片隱碼（內碼）：您的設備需配備能讀取悠遊卡或一卡通的讀卡機，並確保該設備能讀取卡片內碼
4. 查詢發票 API，當載具類別為悠遊卡/一卡通，因有資安考量，不會回傳 <隱碼id>`,
    example: '',
    maxLength: 64,
    minLength: 0,
  })
  @IsOptional()
  @IsString()
  @ValidateIf(({ CarrierType }) => CarrierType === '' || CarrierType === '1')
  @IsEmpty()
  @ValidateIf(({ CarrierType }) => CarrierType === '2')
  @Length(16, 16)
  @Matches(/^[A-Z]{2}[0-9]{14}$/)
  @ValidateIf(({ CarrierType }) => CarrierType === '3')
  @Length(8, 8)
  @Matches(/^\/[A-Z0-9+\-.]{7}$/)
  @ValidateIf(({ CarrierType }) => CarrierType === '4' || CarrierType === '5')
  @Length(1, 64)
  CarrierNum?: string;

  @ApiPropertyOptional({
    description: `第二載具編號
- 當 [CarrierType]=4 或 5  
必填，請帶入實體卡片的 <顯碼id>，以便發票查詢可以顯示用來識別不同的實體卡片，不會檢核。
- 當 [CarrierType]=不等於 4 或 5 時，此參數不須帶入。

注意事項：
1. 英文、數字、符號僅接受半形字元，格式錯誤會造成開立失敗
2. 當 CarrierType 數值為 1、2 或 3 時，請廠商無須填入此欄位，以避免系統阻擋。
3. 針對悠遊卡或一卡通的顯碼（外碼）指的是卡片上外顯的號碼，用來方便持有卡片者區別不同的實體卡片
4. 查詢發票 API，會於參數 IIS_Carrier_Num 內回傳 <顯碼id>`,
    example: '',
    maxLength: 64,
    minLength: 0,
  })
  @IsOptional()
  @IsString()
  @ValidateIf(({ CarrierType }) => CarrierType === '4' || CarrierType === '5')
  @Length(1, 64)
  @ValidateIf(({ CarrierType }) => CarrierType !== '4' && CarrierType !== '5')
  @IsEmpty()
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

export class IssueInvoiceEcpayEncryptedResponseDto {
  PlatformID: string;
  MerchantID: string;
  RpHeader: {
    Timestamp: number;
  };
  TransCode: number;
  TransMsg: string;
  Data: string;
}

export class IssueInvoiceEcpayDecryptedResponseDto {
  RtnCode: number;
  RtnMsg: string;
  InvoiceNo: string;
  InvoiceDate: string;
  RandomNumber: string;
}
