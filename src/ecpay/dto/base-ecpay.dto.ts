import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
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
  @IsDefined()
  @IsString()
  @Length(1, 20)
  MerchantTradeNo: string;

  @ApiProperty({
    description: '交易日期時間，格式為 yyyy/MM/dd HH:mm:ss。',
    type: String,
    example: '2025/06/03 17:45:30',
  })
  @IsDefined()
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
  @IsDefined()
  @IsNumberString()
  @Length(1, 20)
  TotalAmount: string;

  @ApiProperty({
    description: '交易描述，最長 200 字元。',
    type: String,
    example: '購買咖啡與甜點',
  })
  @IsDefined()
  @IsString()
  @Length(1, 200)
  TradeDesc: string;

  @ApiProperty({
    description:
      '商品名稱，最長 200 字元。若有多筆商品，請以「#」分隔，例如「咖啡#甜點」。',
    type: String,
    example: '咖啡#甜點',
  })
  @IsDefined()
  @IsString()
  @Length(1, 200)
  ItemName: string;

  @ApiProperty({
    description:
      '綠界付款完成後會以伺服器端 POST 方式將付款結果回傳到此網址（必須使用 HTTPS）。最長 200 字元。',
    type: String,
    example: 'https://your-domain.com/ecpay/return',
  })
  @IsDefined()
  @IsUrl()
  @Length(1, 200)
  ReturnURL: string;

  @ApiPropertyOptional({
    description: `若設定此參數，使用者則無法看見金流選擇頁。 例如：付款方式[ChoosePayment]設定 WebATM，付款子項目 [ChooseSubPayment]設定 TAISHIN，此次交易僅會以台新銀行的 網路 ATM 付款。
    請參考付款方式一覽表`,
    type: [String],
    example: ['Credit', 'WebATM'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(1, 20, { each: true })
  ChooseSubPayment?: string[];

  @ApiPropertyOptional({
    description: `付款完成後，綠界科技將頁面導回到會員網址，並將付款結果帶回
    注意事項：
    1. 沒帶此參數則會顯示綠界科技的付款完成頁。
    2. 如果要將付款結果頁顯示在會員系統內，請設定此參數。
    3. 若設定此參數，將會使設定的 Client 端返回會員系統的按鈕連結[ClientBackURL]失效。
    4. 部分銀行 WebATM 在交易成功後，會停留在銀行的頁面，並不會導回給綠界科技，所以綠界科技也不會將頁面導回到[OrderResultURL]的頁面。
    5. 銀聯卡和非及時交易（ATM、CVS、BARCODE）不支援此參數。
    6. 建議在測試階段時先不要設定此參數，可將畫面停留在綠界科技，看見綠界科技所提供的錯誤訊息，便可以有效除錯。
    7. 若有設定此參數，請務必根據回傳的交易狀態來判斷顯示付款成功與否的頁面。
    8. 若導回網址未使用 https 時，部份瀏覽器可能會出現警告訊息。`,
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
    description: `當 ChoosePayment 參數為 Credit 付款方式有效
    使用記憶信用卡
    使用：1
    不使用：0`,
    type: String,
    example: '1',
  })
  @IsOptional()
  @Matches(/^[01]$/)
  BidingCard?: string;

  @ApiPropertyOptional({
    description: `當 ChoosePayment 參數為 Credit 付款方式有效
    為合作特店使用的會員識別碼
    若記憶卡號為 1 時，記憶卡號識別碼為必填`,
    type: String,
    example: 'MEMBER123456789',
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  MerchantMemberID?: string;
}
