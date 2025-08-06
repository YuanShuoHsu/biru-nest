import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class AddInvoiceWordSettingEcpayEncryptedRequestHeaderDto {
  @ApiProperty({
    description: `傳入時間（必填）  
請將傳輸時間轉換為時間戳(GMT+8)，綠界會利用此參數將當下的時間轉為 Unix TimeStamp 來驗證此次介接的時間區間。

注意事項：
- 驗證時間區間暫訂為 10 分鐘內有效，若超過此驗證時間則此次訂單將無法建立，參考資料：http://www.epochconverter.com/。
- 合作特店須進行主機「時間校正」，避免主機產生時差，導致 API 無法正常運作。`,
    example: 1525168923,
  })
  @IsDefined()
  @IsNumber()
  Timestamp: number;
}

export class AddInvoiceWordSettingEcpayRequestDto {
  @ApiPropertyOptional({
    description: `特約合作平台商代號  
- 這個參數是專為與綠界簽約的指定平台商所設計，只有在申請開通後才能使用。
- 如果您是一般廠商，請在介接時將此參數欄位保留為空。
- 對於平台商，在使用時需要在 MerchantID（特店編號）欄位中填入與您已經完成綁定子廠商的 MerchantID（特定編號）。  
請注意，只能使用已綁定的子廠商編號，以避免操作失敗。綁定作業請洽所屬業務。`,
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @Length(0, 10)
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
    type: () => AddInvoiceWordSettingEcpayEncryptedRequestHeaderDto,
  })
  @IsDefined()
  @Type(() => AddInvoiceWordSettingEcpayEncryptedRequestHeaderDto)
  @ValidateNested()
  RqHeader: AddInvoiceWordSettingEcpayEncryptedRequestHeaderDto;

  @ApiProperty({
    description: `加密資料（必填）  
此為加密過 JSON 格式的資料。加密方法說明`,
    example: '加密資料',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  Data: string;
}

enum AddInvoiceWordSettingEcpayInvoiceTerm {
  JanFeb = 1,
  MarApr = 2,
  MayJun = 3,
  JulAug = 4,
  SepOct = 5,
  NovDec = 6,
}

enum AddInvoiceWordSettingEcpayInvType {
  GeneralTax = '07',
  SpecialTax = '08',
}

enum AddInvoiceWordSettingEcpayInvoiceCategory {
  B2C = '1',
}

export class AddInvoiceWordSettingEcpayDecryptedRequestDto {
  @ApiProperty({
    description: `特店編號（必填）`,
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
    description: `發票期別  
1：1-2月  
2：3-4月  
3：5-6月  
4：7-8月  
5：9-10月  
6：11-12月

注意事項：  
不可帶入小於當年的期別`,
    enum: AddInvoiceWordSettingEcpayInvoiceTerm,
    example: AddInvoiceWordSettingEcpayInvoiceTerm.JanFeb,
    maximum: 6,
    minimum: 1,
  })
  @IsDefined()
  @IsInt()
  @Max(6)
  @Min(1)
  @IsEnum(AddInvoiceWordSettingEcpayInvoiceTerm)
  InvoiceTerm: AddInvoiceWordSettingEcpayInvoiceTerm;

  @ApiProperty({
    description: `發票年度（必填）  
僅可設定當年與明年 ex：109`,
    example: '109',
    maxLength: 3,
    minLength: 3,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(3, 3)
  InvoiceYear: string;

  @ApiProperty({
    description: `字軌類別  
07：一般稅額發票  
08：特種稅額發票`,
    enum: AddInvoiceWordSettingEcpayInvType,
    example: AddInvoiceWordSettingEcpayInvType.GeneralTax,
    maxLength: 2,
    minLength: 2,
  })
  @IsDefined()
  @IsNumberString()
  @Length(2, 2)
  @IsEnum(AddInvoiceWordSettingEcpayInvType)
  InvType: AddInvoiceWordSettingEcpayInvType;

  @ApiProperty({
    description: `發票種類（必填）  
1：B2C，請固定填寫為 1`,
    enum: AddInvoiceWordSettingEcpayInvoiceCategory,
    example: AddInvoiceWordSettingEcpayInvoiceCategory.B2C,
    maxLength: 1,
    minLength: 1,
  })
  @IsDefined()
  @IsNumberString()
  @Length(1, 1)
  @IsEnum(AddInvoiceWordSettingEcpayInvoiceCategory)
  InvoiceCategory: AddInvoiceWordSettingEcpayInvoiceCategory;

  @ApiPropertyOptional({
    description: `產品服務別代號 
- 該參數必須由英文字母（A-Z, a-z）和數字（0-9）組成，其長度必須在 1 到 10 個字符之間。
- 此參數只有在【B2C 系統多組字軌】開關為【啟用】時，帶入值才會進行處理，否則會忽略此參數。如需啟用請洽所屬業務。`,
    maxLength: 10,
    minLength: 1,
  })
  @IsOptional()
  @IsString()
  @Length(1, 10)
  @Matches(/^[A-Za-z0-9]{1,10}$/)
  ProductServiceId?: string;

  @ApiProperty({
    description: `發票字軌（必填）`,
    example: 'TW',
    maxLength: 2,
    minLength: 2,
  })
  @IsDefined()
  @IsString()
  @Length(2, 2)
  InvoiceHeader: string;

  @ApiProperty({
    description: `起始發票編號（必填）  
請輸入 8 碼發票號碼，尾數需為 00 或 50。(例：10000000)`,
    example: '10000000',
    maxLength: 8,
    minLength: 8,
  })
  @IsDefined()
  @IsNumberString()
  @Length(8, 8)
  @Matches(/^\d{6}(00|50)$/)
  InvoiceStart: string;

  @ApiProperty({
    description: `結束發票編號（必填）  
請輸入 8 碼發票號碼，尾數需為 49 或 99。(例：10000049)`,
    example: '10000049',
    maxLength: 8,
    minLength: 8,
  })
  @IsDefined()
  @IsNumberString()
  @Length(8, 8)
  @Matches(/^\d{6}(49|99)$/)
  InvoiceEnd: string;
}

class AddInvoiceWordSettingEcpayResponseHeaderDto {
  @ApiProperty({
    description: `回傳時間  
Unix timestamp（GMT+8）`,
    example: 1525169058,
  })
  @IsDefined()
  @IsNumber()
  Timestamp: number;
}

export class AddInvoiceWordSettingEcpayEncryptedResponseDto {
  @ApiPropertyOptional({
    description: '特約合作平台商代號',
    maxLength: 10,
  })
  @IsOptional()
  @IsString()
  @Length(0, 10)
  PlatformID?: string;

  @ApiProperty({
    description: '特店編號',
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
    description: '回傳資料',
    type: () => AddInvoiceWordSettingEcpayResponseHeaderDto,
  })
  @IsDefined()
  @Type(() => AddInvoiceWordSettingEcpayResponseHeaderDto)
  @ValidateNested()
  RpHeader: AddInvoiceWordSettingEcpayResponseHeaderDto;

  @ApiProperty({
    description: `回傳代碼  
1 代表 API 傳輸資料（MerchantID, RqHeader, Data）接收成功，實際的 API 執行結果狀態請參考 RtnCode。`,
    example: 1,
  })
  @IsDefined()
  @IsInt()
  TransCode: number;

  @ApiProperty({
    description: '回傳訊息',
    example: '',
    maxLength: 200,
  })
  @IsDefined()
  @IsString()
  @Length(0, 200)
  TransMsg: string;

  @ApiProperty({
    description: `加密資料  
回傳相關資料，此為加密過 JSON 格式的資料。加密方法說明`,
    example: '加密資料',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  Data: string;
}

export class AddInvoiceWordSettingEcpayDecryptedResponseDto {
  @ApiProperty({
    description: `回應代碼  
1 代表 API 執行成功，其餘代碼均為失敗。`,
    example: 1,
  })
  @IsDefined()
  @IsInt()
  RtnCode: number;

  @ApiProperty({
    description: '回應訊息',
    example: '成功',
    maxLength: 200,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  RtnMsg: string;

  @ApiProperty({
    description: `字軌號碼 ID  
需留存 TrackID 作為設定字軌號碼啟用狀態用`,
    example: '1234567890',
    maxLength: 10,
    minLength: 1,
  })
  @IsDefined()
  @IsNumberString()
  @Length(1, 10)
  TrackID: string;
}
