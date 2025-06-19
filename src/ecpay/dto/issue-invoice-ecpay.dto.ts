// https://developers.ecpay.com.tw/?p=7896

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

class IssueInvoiceEcpayEncryptedRequestHeaderDto {
  @ApiProperty({
    description: `傳入時間（必填）<br>
    請將傳輸時間轉換為時間戳(GMT+8)，綠界會利用此參數將當下的時間轉為 Unix TimeStamp 來驗證此次介接的時間區間。<br>
    注意事項：
    <ul>
    <li>驗證時間區間暫訂為 10 分鐘內有效，若超過此驗證時間則此次訂單將無法建立，參考資料：http://www.epochconverter.com/。</li>
    <li>合作特店須進行主機「時間校正」，避免主機產生時差，導致API無法正常運作。</li>
    </ul>`,
    example: 1525168923,
  })
  @IsDefined()
  @IsNumber()
  Timestamp: number;
}

export class IssueInvoiceEcpayEncryptedRequestDto {
  @ApiPropertyOptional({
    description: `特約合作平台商代號
    <ul>
    <li>這個參數是專為與綠界簽約的指定平台商所設計，只有在申請開通後才能使用。</li>
    <li>如果您是一般廠商，請在介接時將此參數欄位保留為空。</li>
    <li>對於平台商，在使用時需要在 MerchantID（特店編號）欄位中填入與您已經完成綁定子廠商的 MerchantID（特定編號）。</li>
    </ul>
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
    <ul>
    <li>測試環境合作特店編號</li>
    <li>正式環境金鑰取得</li>
    </ul>`,
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
    description: `加密資料（必填）<br>
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
    description: `特店自訂編號（必填）<br>
    需為唯一值不可重複使用<br>
    注意事項：
    <ul>
    <li>請勿使用特殊符號</li>
    <li>大小寫英文視為相同 (e.g. 123abc456=123ABC456)</li>
    </ul>
    `,
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
    description: `通路商編號<br>
    1：蝦皮<br>
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
    description: `客戶編號<br>
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
    <ul>
    <li>該參數必須由英文字母（A-Z, a-z）和數字（0-9）組成，其長度必須在 1 到 10 個字符之間。</li>
    <li>此參數只有在【B2C 系統多組字軌】開關為【啟用】時，帶入值才會進行處理，否則會忽略此參數。如需啟用請洽所屬業務。</li>
    <li>具體步驟參考如下：
    <ol>
    <li>聯繫所屬業務 <啟用> B2C 系統多組字軌功能</li>
    <li>至廠商後台 <字軌分類管理> 節點，新增商品/服務別，例如 A0001-餐具、A0002-清潔用品，可參考 電子發票系統操作手冊 <字軌分類管理> 章節說明</li>
    <li>至廠商後台 <字軌與配號設定> 節點，新增字軌配號，可參考 電子發票系統操作手冊 <字軌與配號設定> 章節說明</li>
    <li>透過開立發票 API，此參數 [ProductServiceID] 帶入先前廠商後台設定的 A0001 或 A0002，即可完成發票開立</li>
    </ol></li>
    </ul>`,
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
    <ul>
    <li>格式為數字，固定長度為 8 碼</li>
    <li>根據財政部的最新公告，針對統一編號的檢核方式做了調整。<br>
    您可以點擊以下連結查看：<br>
    [財政部財政資訊中心營利事業統一編號檢查碼邏輯修正說明]</li>
    <li>如未符合上述檢核邏輯，則開立發票、設定交易對象維護資料時將會失敗，請營業人務必提供正確的統一編號</li>
    <li>只會做格式邏輯檢核，不會去查詢公開資料庫是否存在</li>
    </ul>`,
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
    <ul>
    <li>當列印註記 [Print]=1（列印）時，此參數為必填</li>
    <li>格式為中、英文及數字等。</li>
    <li>當統一編號 [CustomerIdentifier] 有值時，請帶入相對應的營業人名稱，可參照以下 API 取得多數的對應公司名稱統一編號驗證 API</li>
    </ul>`,
    example: '綠界科技股份有限公司',
    maxLength: 60,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 60)
  CustomerName?: string;

  @ApiPropertyOptional({
    description: `客戶地址<br>
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
    <ul>
    <li>當客戶電子信箱[CustomerEmail]為空字串時，為必填。</li>
    <li>格式為數字</li>
    </ul>
    `,
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
