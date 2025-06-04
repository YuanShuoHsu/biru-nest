import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ReturnEcpayDto {
  @ApiProperty({ description: '特店編號' })
  @IsDefined()
  @IsString()
  @Length(10, 10)
  MerchantID: string;

  @ApiProperty({
    description: `特店交易編號
    訂單產生時傳送給綠界的特店交易編號。`,
  })
  @IsDefined()
  @IsString()
  @Length(1, 20)
  MerchantTradeNo: string;

  @ApiPropertyOptional({ description: '特店旗下店舖代號' })
  @IsOptional()
  @IsString()
  @Length(1, 20)
  StoreID?: string;

  @ApiProperty({
    description: `交易狀態
    若回傳值為1時，為付款成功
    其餘代碼皆為交易異常，請至廠商管理後台確認後再出貨。

    常見交易狀態：
    10300066：「交易付款結果待確認中，請勿出貨」，請至廠商管理後台確認已付款完成再出貨。
    10100248：「拒絕交易，請客戶聯繫發卡行確認原因」
    10100252：「額度不足，請客戶檢查卡片額度或餘額」
    10100254：「交易失敗，請客戶聯繫發卡行確認交易限制」
    10100251：「卡片過期，請客戶檢查卡片重新交易」
    10100255：「報失卡，請客戶更換卡片重新交易」
    10100256：「被盜用卡，請客戶更換卡片重新交易」`,
  })
  @IsDefined()
  @IsNumber()
  RtnCode: number;

  @ApiProperty({ description: '交易訊息' })
  @IsDefined()
  @IsString()
  RtnMsg: string;

  @ApiProperty({
    description: `綠界的交易編號
    請保存綠界的交易編號與特店交易編號 [MerchantTradeNo] 的關連。`,
  })
  @IsDefined()
  @IsString()
  @Length(1, 20)
  TradeNo: string;

  @ApiProperty({ description: '交易金額' })
  @IsDefined()
  @IsNumber()
  TradeAmt: number;

  @ApiProperty({
    description: `付款時間
    格式為yyyy/MM/dd HH:mm:ss`,
  })
  @IsDefined()
  @IsString()
  @Length(19, 20)
  PaymentDate: string;

  @ApiProperty({
    description: `特店選擇的付款方式
    請參考回覆付款方式一覽表`,
  })
  @IsDefined()
  @IsString()
  @Length(1, 20)
  PaymentType: string;

  @ApiProperty({
    description: `交易服務金額
    交易手續費+交易處理費的總金額`,
  })
  @IsDefined()
  @IsNumber()
  PaymentTypeChargeFee: number;

  @ApiProperty({
    description: `訂單成立時間
    格式為 yyyy/MM/dd HH:mm:ss`,
  })
  @IsDefined()
  @IsString()
  @Length(19, 20)
  TradeDate: string;

  @ApiPropertyOptional({
    description: `特約合作平台商代號
    為專案合作的平台商使用。`,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  PlatformID?: string;

  @ApiPropertyOptional({
    description: `是否為模擬付款
      0：代表此交易非模擬付款。
      1：代表此交易為模擬付款，RtnCode 也為 1。並非是由消費者實際真的付款，所以綠界也不會撥款給廠商，請勿對該筆交易做出貨等動作，以避免損失。
      
      注意事項：
      特店可透過廠商後台來針對單筆訂單模擬綠界回傳付款通知，以方便介接API。
      此功能僅只是用於測試 ReturnURL 是否能成功接收，不會改變付款狀態。
      只有透過廠商後台的定期定額查詢功能發動的模擬付款通知，綠界才會傳送此參數，正常由定期定額排程所發送的付款通知，不會傳送此參數。`,
  })
  @IsOptional()
  @IsNumber()
  SimulatePaid?: number;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 1
    提供合作廠商使用記錄用客製化使用欄位`,
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  CustomField1?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 2
    提供合作廠商使用記錄用客製化使用欄位`,
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  CustomField2?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 3
    提供合作廠商使用記錄用客製化使用欄位`,
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  CustomField3?: string;

  @ApiPropertyOptional({
    description: `自訂名稱欄位 4
    提供合作廠商使用記錄用客製化使用欄位`,
  })
  @IsOptional()
  @IsString()
  @Length(0, 50)
  CustomField4?: string;

  @ApiProperty({
    description: `檢查碼
    特店必須檢查檢查碼 [CheckMacValue] 來驗證，請參考附錄檢查碼機制。`,
  })
  @IsDefined()
  @IsString()
  @Length(1, 200)
  CheckMacValue: string;
}
