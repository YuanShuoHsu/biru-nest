import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class BaseEcpayDto {
  @ApiProperty({
    description: '交易編號，必須為唯一值，建議使用 20 碼 UID',
    example: 'ORD20250603ABCDE1234',
  })
  @IsDefined()
  @IsString()
  @Length(1, 20)
  MerchantTradeNo: string;

  @ApiProperty({
    description: '交易日期時間，格式為 yyyy/MM/dd HH:mm:ss',
    example: '2025/06/03 17:45:30',
  })
  @IsDefined()
  @IsString()
  @Length(19, 20)
  @Matches(/^\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}$/)
  MerchantTradeDate: string;

  @ApiProperty({
    description: `交易總金額，須為正整數
    僅限新台幣，金額不可為 0 元
    CVS&BARCODE 最低限制為 30 元，最高限制為 20000 元`,
    example: '1500',
  })
  @IsDefined()
  @IsNumberString()
  @Length(1, 20)
  TotalAmount: string;

  @ApiProperty({
    description: '交易描述',
    example: '購買咖啡與甜點',
  })
  @IsDefined()
  @IsString()
  @Length(1, 200)
  TradeDesc: string;

  @ApiProperty({
    description:
      '商品名稱，若有多筆，需在金流選擇頁一行一行顯示商品名稱的話，商品名稱請以符號#分隔。',
    example: '咖啡#甜點',
  })
  @IsDefined()
  @IsString()
  @Length(1, 200)
  ItemName: string;

  @ApiProperty({
    description:
      '當消費者付款完成後，綠界科技會將付款結果參數以幕後（Server POST）回傳到該網址。',
    example: 'https://your-domain.com/ecpay/return',
  })
  @IsDefined()
  @IsUrl()
  @Length(1, 200)
  ReturnURL: string;

  @ApiPropertyOptional({
    description:
      '若設定此參數，使用者則無法看見金流選擇頁。例如：付款方式[ChoosePayment]設定 WebATM，付款子項目[ChooseSubPayment]設定 TAISHIN，此次交易僅會以台新銀行的網路 ATM 付款。請參考付款方式一覽表',
    example: 'TAISHIN',
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  ChooseSubPayment?: string;

  @ApiPropertyOptional({
    description:
      '付款完成後，綠界科技將頁面導回到會 員網址，並將付款結果帶回 注意事項： 1. 沒帶此參數則會顯示綠界科技的付款完成頁。 2. 如果要將付款結果頁顯示在會員系統內，請設定此參數。 3. 若設定此參數，將會使設定的 Client 端返回會員系統的按鈕連 結[ClientBackURL]失效。 4. 部分銀行 WebATM 在交易成功後,會停留在銀行的頁面,並不會導回給綠界科技,所以綠界科技也不會將頁面導回到[OrderResultURL]的頁面 5. 銀聯卡和非及時交易(ATM、CVS、BARCODE) 不支援此參數。 6. 建議在測試階段時先不要設定此參數，可將畫面停留在綠界科技，看見綠界科技所提供的錯誤訊息，便可以有效除錯。 7. 若有設定此參數，請務必根據回傳 的交易狀態來判斷顯示付款成功 與否的頁面。 8. 若導回網址未使用 https 時，部份 瀏覽器可能會出現警告訊息。',
    example: 'https://your-domain.com/ecpay/result',
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  OrderResultURL?: string;

  @ApiPropertyOptional({
    description: '回傳更詳細的付款資訊至 ReturnURL 參數指定的 URL',
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[01]$/)
  NeedExtraPaidInfo?: string;

  @ApiPropertyOptional({
    description:
      '設定此參數，綠界科技會在付款完成或取號完成頁面上顯示[返回商店] 的按鈕。消費者點選此按鈕後，會將頁面導回到此設定的網址。注意事項：本參數僅控制將頁面導回，不會將付款結果資訊 POST 到設定值內的 URL。發生簡訊 OTP 驗證失敗而此參數有值時，頁面上亦會顯示按鈕。若導回網址未使用 https 時，部份 瀏覽器可能會出現警告訊息。',
    example: 'https://your-domain.com/shop',
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  ClientBackURL?: string;

  @ApiPropertyOptional({
    description: '商品銷售網址',
    example: 'https://your-domain.com/products/coffee',
  })
  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  ItemURL?: string;

  @ApiPropertyOptional({
    description: '備註',
    example: '訂單備註：週末優惠',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  Remark?: string;

  @ApiPropertyOptional({
    description: `是否延遲撥款。
    1. 若為不延遲撥款，請帶：0，買方付款完成後，綠界科技依合約約定之時間，撥款給會員
    2. 若為延遲撥款，請帶：1，買方付款完成後，需再呼叫「會員申請撥款退款」API，讓綠界科技撥款給會員，或退款給買方。
    注意事項：※倘若會員一直不申請撥款，此筆訂單款項會一直放在綠界科技，直到會員申請撥款。
    ※延遲撥款不適用「信用卡」之付款方式。`,
    example: '0',
  })
  @IsOptional()
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[01]$/)
  HoldTradeAMT?: string;

  @ApiPropertyOptional({
    description: '提供合作特店填入店家代碼使用',
    example: 'STORE12345',
  })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  StoreID?: string;

  @ApiPropertyOptional({
    description: '提供合作廠商使用記錄用客製化使用欄位',
    example: 'CUSTOM_FIELD_1',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField1?: string;

  @ApiPropertyOptional({
    description: '提供合作廠商使用記錄用客製化使用欄位',
    example: 'CUSTOM_FIELD_2',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField2?: string;

  @ApiPropertyOptional({
    description: '提供合作廠商使用記錄用客製化使用欄位',
    example: 'CUSTOM_FIELD_3',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField3?: string;

  @ApiPropertyOptional({
    description: '提供合作廠商使用記錄用客製化使用欄位',
    example: 'CUSTOM_FIELD_4',
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomField4?: string;

  @ApiPropertyOptional({
    description: `當 ChoosePayment 參數為 Credit 付款方式有效
    預設語系為中文，若要變更語系參數值請帶：
    英語：ENG
    日語：JPN
    韓語：KOR
    簡體中文：CHI`,
    example: 'ENG',
  })
  @IsOptional()
  @ValidateIf(({ Language }) => Language !== '')
  @IsString()
  @Length(3, 3)
  @Matches(/^(ENG|JPN|KOR|CHI)?$/)
  Language?: string;

  @ApiPropertyOptional({
    description: `當 ChoosePayment 參數為 Credit 付款方式有效
    使用記憶信用卡
    使用：1
    不使用：0`,
    example: '1',
  })
  @IsOptional()
  @ValidateIf(({ BidingCard }) => BidingCard !== '')
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[01]$/)
  BidingCard?: string;

  @ApiPropertyOptional({
    description: `當 ChoosePayment 參數為 Credit 付款方式有效
    為合作特店使用的會員識別碼
    若記憶卡號為 1 時，記憶卡號識別碼為必填`,
    example: 'MEMBER123456789',
  })
  @IsOptional()
  @ValidateIf(({ BidingCard }) => BidingCard === '1')
  @IsString()
  @Length(1, 20)
  MerchantMemberID?: string;
}
