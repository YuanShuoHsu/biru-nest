import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class BaseEcpayDto {
  @ApiProperty({
    description: '交易編號，必須為唯一值，建議使用最長 20 碼的 UID。',
    type: String,
    example: 'ORD20250603ABCDE1234',
  })
  @IsString()
  @Length(1, 20)
  MerchantTradeNo: string;

  @ApiProperty({
    description: '交易日期時間，格式為 yyyy/MM/dd HH:mm:ss。',
    type: String,
    example: '2025/06/03 17:45:30',
  })
  @IsString()
  @Length(19, 20)
  @Matches(/^\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}$/)
  MerchantTradeDate: string;

  @ApiProperty({
    description:
      '交易總金額，須為正整數（僅限新台幣，金額不可為 0；CVS & BARCODE 最低限制 30 元，最高限制 20000 元）。',
    type: String,
    example: '1500',
  })
  @IsNumberString()
  @Length(1, 20)
  TotalAmount: string;

  @ApiProperty({
    description: '交易描述，最長 200 字元。',
    type: String,
    example: '購買咖啡與甜點',
  })
  @IsString()
  @Length(1, 200)
  TradeDesc: string;

  @ApiProperty({
    description:
      '商品名稱，最長 200 字元。若有多筆商品，請以「#」分隔，例如「咖啡#甜點」。',
    type: String,
    example: '咖啡#甜點',
  })
  @IsString()
  @Length(1, 200)
  ItemName: string;

  @ApiProperty({
    description:
      '綠界付款完成後會以伺服器端 POST 方式將付款結果回傳到此網址（必須使用 HTTPS）。最長 200 字元。',
    type: String,
    example: 'https://your-domain.com/ecpay/return',
  })
  @IsUrl()
  @Length(1, 200)
  ReturnURL: string;

  @ApiPropertyOptional({
    description:
      '若設定此參數，使用者將無法在付款方式選擇頁做二次選擇。最長 20 字元，多筆時請以陣列形式傳遞。',
    type: [String],
    example: ['Credit', 'WebATM'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(1, 20, { each: true })
  ChooseSubPayment?: string[];

  @ApiPropertyOptional({
    description:
      '付款完成後，綠界科技會將頁面導回到此網址。若未設定則使用綠界預設的付款完成頁。最長 200 字元。',
    type: String,
    example: 'https://your-domain.com/ecpay/result',
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  OrderResultURL?: string;

  @ApiPropertyOptional({
    description:
      '若設定「1」，綠界會回傳更詳細的付款資訊至 ReturnURL；設「0」或不帶則不回傳。僅允許「0」或「1」。',
    type: String,
    example: '1',
  })
  @IsOptional()
  @Matches(/^[01]$/)
  NeedExtraPaidInfo?: string;

  @ApiPropertyOptional({
    description:
      '付款完成頁面上的「返回商店」按鈕所導回的網址。若未設定，按鈕不會出現。最長 200 字元。',
    type: String,
    example: 'https://your-domain.com/shop',
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  ClientBackURL?: string;

  @ApiPropertyOptional({
    description: '商品詳細頁面網址，最長 200 字元。',
    type: String,
    example: 'https://your-domain.com/products/coffee',
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  ItemURL?: string;

  @ApiPropertyOptional({
    description: '備註，最長 100 字元。',
    type: String,
    example: '訂單備註：週末優惠',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  Remark?: string;

  @ApiPropertyOptional({
    description:
      '是否延遲撥款。0 表示不延遲（系統自動撥款），1 表示延遲（需後續呼叫「會員申請撥款退款」API）。僅允許「0」或「1」。',
    type: String,
    example: '0',
  })
  @IsOptional()
  @Matches(/^[01]$/)
  HoldTradeAMT?: string;

  @ApiPropertyOptional({
    description: '特店代號（合作廠商使用），最長 20 字元。',
    type: String,
    example: 'STORE12345',
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  StoreID?: string;

  @ApiPropertyOptional({
    description: '自訂欄位 1（合作廠商可自行紀錄用途），最長 50 字元。',
    type: String,
    example: 'CUSTOM_FIELD_1',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField1?: string;

  @ApiPropertyOptional({
    description: '自訂欄位 2（合作廠商可自行紀錄用途），最長 50 字元。',
    type: String,
    example: 'CUSTOM_FIELD_2',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField2?: string;

  @ApiPropertyOptional({
    description: '自訂欄位 3（合作廠商可自行紀錄用途），最長 50 字元。',
    type: String,
    example: 'CUSTOM_FIELD_3',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField3?: string;

  @ApiPropertyOptional({
    description: '自訂欄位 4（合作廠商可自行紀錄用途），最長 50 字元。',
    type: String,
    example: 'CUSTOM_FIELD_4',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField4?: string;

  @ApiPropertyOptional({
    description:
      '語系設定（僅對信用卡付款有效）。預設中文，若要變更請帶：ENG（英語）、JPN（日語）、KOR（韓語）、CHI（簡體中文）。長度 3 字元。',
    type: String,
    example: 'ENG',
  })
  @IsOptional()
  @IsString()
  @Length(1, 3)
  Language?: string;

  @ApiPropertyOptional({
    description:
      '是否使用記憶信用卡（僅對信用卡付款有效）。1 表示使用，0 表示不使用。',
    type: String,
    example: '1',
  })
  @IsOptional()
  @Matches(/^[01]$/)
  BidingCard?: string;

  @ApiPropertyOptional({
    description:
      '合作特店使用的會員識別碼（僅對信用卡付款且 BidingCard=1 時必填）。最長 20 字元。',
    type: String,
    example: 'MEMBER123456789',
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  MerchantMemberID?: string;
}
