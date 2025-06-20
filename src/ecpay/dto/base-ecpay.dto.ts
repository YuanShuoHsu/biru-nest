import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class BaseEcpayDto {
  @ApiProperty({
    description: `特店編號
    測試環境特店編號
    正式環境金鑰取得`,
    example: '3002607',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  MerchantID: string;

  @ApiProperty({
    description: `特店訂單編號
    特店訂單編號均為唯一值，不可重複使用。
    英數字大小寫混合`,
    example: 'ORD20250607ABCDE1234',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  MerchantTradeNo: string;

  @ApiProperty({
    description: `特店交易時間
    格式為：yyyy/MM/dd HH:mm:ss`,
    example: '2025/06/07 15:00:00',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(19, 20)
  @Matches(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/)
  MerchantTradeDate: string;

  @ApiProperty({
    description: `交易類型
    請固定填入 aio`,
    example: 'aio',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @IsIn(['aio'])
  PaymentType: string;

  @ApiProperty({
    description: `交易金額
    請帶整數，不可有小數點。
    僅限新台幣`,
    example: 100,
    type: Number,
  })
  @IsDefined()
  @IsInt()
  TotalAmount: number;

  @ApiProperty({
    description: `交易描述
    請勿帶入特殊字元。`,
    example: '商品訂購',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  TradeDesc: string;

  @ApiProperty({
    description: `商品名稱
    如果商品名稱有多筆，需在金流選擇頁一行一行顯示商品名稱的話，商品名稱請以符號 # 分隔。
    商品名稱字數限制為中英數 400 字內，超過此限制系統將自動截斷。 詳細的使用注意事項請參考 FAQ。`,
    example: '商品A#商品B',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 400)
  ItemName: string;

  @ApiProperty({
    description: `付款完成通知回傳網址
    ReturnURL 為付款結果通知回傳網址，為特店 server 或主機的 URL，用來接收綠界後端回傳的付款結果通知。
    當消費者付款完成後，綠界會將付款結果參數以幕後回傳到該網址。詳細說明請參考付款結果通知
    注意事項：
    請勿設定與 Client 端接收付款結果網址 OrderResultURL 相同位置，避免程式判斷錯誤。
    ReturnURL 收到綠界後端回傳的付款結果通知後，請回應字串 1|OK 給綠界。
    1|OK 僅是廠商回應綠界是否收到通知，並不會改變付款狀態。
    參數內容若有包含 %26(&) 及 %3C(<) 這二個值時，請先進行 urldecode() 避免呼叫 API 失敗。`,
    example: 'https://your-domain.com/api/ecpay/notify',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  ReturnURL: string;

  @ApiProperty({
    description: `選擇預設付款方式
    綠界提供下列付款方式：
    Credit：信用卡及銀聯卡（需申請開通）
    TWQR ：歐付寶 TWQR 行動支付（需申請開通）
    WebATM：網路ATM
    ATM：自動櫃員機
    CVS：超商代碼
    BARCODE：超商條碼
    ApplePay：Apple Pay（僅支援手機支付）
    BNPL：裕富無卡分期（需申請開通）
    WeiXin：微信支付
    ALL：不指定付款方式，由綠界顯示付款方式選擇頁面。
    注意事項：
    若為手機版時不支援下列付款方式：WebATM
    如需要不透過綠界畫面取得 ATM、CVS、BARCODE 的繳費代碼，請參考如何不經過綠界畫面取得 ATM、CVS、BARCODE 的繳費代碼。
    當瀏覽器不為 Safari 時，不會顯示 Apple Pay 付款功能。`,
    example: 'ALL',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  @IsIn([
    'Credit',
    'TWQR',
    'WebATM',
    'ATM',
    'CVS',
    'BARCODE',
    'ApplePay',
    'BNPL',
    'WeiXin',
    'ALL',
  ])
  ChoosePayment: string;

  @ApiProperty({
    description: `檢查碼
    請參考檢查碼機制`,
    example: '85D927637935683EA756CDEF76498FEB9F5D098A7A1AC4F0CB3B3609A9D4116A',
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  CheckMacValue: string;

  @ApiProperty({
    description: `CheckMacValue 加密類型
    請固定填入 1，使用 SHA256 加密。`,
    example: 1,
    type: Number,
  })
  @IsDefined()
  @IsInt()
  @IsIn([1])
  EncryptType: number;

  @ApiPropertyOptional({
    description: `特店旗下店舖代號
    提供特店填入分店代號使用，僅可用英數字大小寫混合。`,
    example: 'STORE123',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  StoreID?: string;

  @ApiPropertyOptional({
    description: `Client 端返回特店的按鈕連結
    消費者點選此按鈕後，會將頁面導回到此設定的網址
    注意事項：
    導回時不會帶付款結果到此網址，只是將頁面導回而已。
    設定此參數，綠界會在付款完成或取號完成頁面上顯示 [返回商店] 的按鈕。
    設定此參數，發生簡訊 OTP 驗證失敗時，頁面上會顯示 [返回商店] 的按鈕。
    若未設定此參數，則綠界付款完成頁或取號完成頁面，不會顯示 [返回商店] 的按鈕。
    若導回網址未使用 https 時，部份瀏覽器可能會出現警告訊息。
    參數內容若有包含 %26(&) 及 %3C(<) 這二個值時，請先進行 urldecode() 避免呼叫 API 失敗。`,
    example: 'https://your-domain.com/shop',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @Length(1, 200)
  ClientBackURL?: string;

  @ApiPropertyOptional({
    description: '商品銷售網址',
    example: 'https://your-domain.com/product/123',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @Length(1, 200)
  ItemURL?: string;

  @ApiPropertyOptional({
    description: '備註欄位',
    example: '活動專用',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  Remark?: string;

  @ApiPropertyOptional({
    description: `付款子項目
    若設定此參數，建立訂單將轉導至綠界訂單成立頁，依設定的付款方式及付款子項目帶入訂單，無法選擇其他付款子項目。請參考付款方式一覽表
    注意事項：因板信銀行會於每月進行例行維護，當遇銀行維護時，將會建立訂單失敗。`,
    example: 'Visa',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 20)
  ChooseSubPayment?: string;

  @ApiPropertyOptional({
    description: `Client 端回傳付款結果網址
    有別於 ReturnURL（server端的網址），OrderResultURL 為特店的 client 端（前端）網址。消費者付款完成後，綠界會將付款結果參數以 POST 方式回傳到到該網址。詳細說明請參考付款結果通知。
    注意事項：
    若與 [ClientBackURL] 同時設定，將會以此參數為主。
    銀聯卡及非即時交易（ATM、CVS、BARCODE）不支援此參數。
    付款結果通知請依 ReturnURL（server端的網址）為主,避免因前端操作或網路問題未收到 OrderResultURL 特店的 client 端（前端）的通知。
    參數內容若有包含 %26(&) 及 %3C(<) 這二個值時，請先進行 urldecode() 避免呼叫 API 失敗。`,
    example: 'https://your-domain.com/ecpay/result',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  @Length(1, 200)
  OrderResultURL?: string;

  @ApiPropertyOptional({
    description: `是否需要額外的付款資訊
    額外的付款資訊
    若不回傳額外的付款資訊時，參數值請傳：Ｎ；
    若要回傳額外的付款資訊時，參數值請傳：Ｙ ，付款完成後綠界後端會以 POST 方式回傳額外付款資訊到特店的 ReturnURL 與 OrderResultURL。`,
    example: 'N',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 1)
  @IsIn(['Y', 'N'])
  NeedExtraPaidInfo?: string;

  @ApiPropertyOptional({
    description: `隱藏付款方式
    當付款方式 [ChoosePayment] 為 ALL 時，可隱藏不需要的付款方式，多筆請以井號分隔 (#)。
    可用的參數值：
    Credit：信用卡
    ApplePay：Apple Pay
    WebATM：網路ATM
    ATM：自動櫃員機
    CVS：超商代碼
    BARCODE：超商條碼
    TWQR : 行動支付
    BNPL：裕富無卡分期
    WeiXin：微信支付
    注意事項：綠界付款方式會不斷增加及調整，為避免因新付款方式造成接收付款結果通知失敗，建議串接時付款方式 [ChoosePayment] 固定指定付款方式。`,
    example: 'WebATM#ATM',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  IgnorePayment?: string;

  @ApiPropertyOptional({
    description: `特約合作平台商代號
    為專案合作的平台商使用。`,
    example: 'PLT123',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  PlatformID?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 1
    提供廠商使用記錄客製化欄位。`,
    example: 'Custom1',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  CustomField1?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 2
    提供廠商使用記錄客製化欄位。`,
    example: 'Custom2',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  CustomField2?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 3
    提供廠商使用記錄客製化欄位。`,
    example: 'Custom3',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  CustomField3?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 4
    提供廠商使用記錄客製化欄位。`,
    example: 'Custom4',
    type: String,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  CustomField4?: string;

  @ApiPropertyOptional({
    description: `語系設定
    預設語系為中文，若要變更語系參數值請帶：
    ENG：英語
    KOR：韓語
    JPN：日語
    CHI：簡體中文`,
    example: 'ENG',
    type: String,
  })
  @IsOptional()
  @ValidateIf(({ Language }) => Language !== '')
  @IsString()
  @Length(3, 3)
  @IsIn(['ENG', 'KOR', 'JPN', 'CHI'])
  Language?: string;
}
