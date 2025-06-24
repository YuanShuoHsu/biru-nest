import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
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

class GetGovInvoiceWordSettingEcpayEncryptedRequestHeaderDto {
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

export class GetGovInvoiceWordSettingEcpayRequestDto {
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
    type: () => GetGovInvoiceWordSettingEcpayEncryptedRequestHeaderDto,
  })
  @IsDefined()
  @Type(() => GetGovInvoiceWordSettingEcpayEncryptedRequestHeaderDto)
  @ValidateNested()
  RqHeader: GetGovInvoiceWordSettingEcpayEncryptedRequestHeaderDto;

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

export class GetGovInvoiceWordSettingEcpayDecryptedRequestDto {
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
    description: `發票年度（必填）  
- 僅可查詢去年、當年與明年的發票年度
- 格式為民國年 ex：110`,
    example: '110',
    maxLength: 3,
    minLength: 3,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(3, 3)
  InvoiceYear: string;
}

class GetGovInvoiceWordSettingEcpayResponseHeaderDto {
  @ApiProperty({
    description: `回傳時間  
Unix timestamp（GMT+8）`,
    example: 1525169058,
  })
  @IsDefined()
  @IsNumber()
  Timestamp: number;
}

export class GetGovInvoiceWordSettingEcpayEncryptedResponseDto {
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
    type: () => GetGovInvoiceWordSettingEcpayResponseHeaderDto,
  })
  @IsDefined()
  @Type(() => GetGovInvoiceWordSettingEcpayResponseHeaderDto)
  @ValidateNested()
  RpHeader: GetGovInvoiceWordSettingEcpayResponseHeaderDto;

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

export enum GetGovInvoiceWordSettingEcpayInvoiceTerm {
  JanFeb = 1,
  MarApr = 2,
  MayJun = 3,
  JulAug = 4,
  SepOct = 5,
  NovDec = 6,
}

export enum GetGovInvoiceWordSettingEcpayInvType {
  GeneralTax = '07',
  SpecialTax = '08',
}

export class GetGovInvoiceWordSettingEcpayInvoiceInfoDto {
  @ApiProperty({
    description: `發票期別  
1：1-2月  
2：3-4月  
3：5-6月  
4：7-8月  
5：9-10月  
6：11-12月`,
    enum: GetGovInvoiceWordSettingEcpayInvoiceTerm,
    example: GetGovInvoiceWordSettingEcpayInvoiceTerm.JanFeb,
    maximum: 6,
    minimum: 1,
  })
  @IsDefined()
  @IsInt()
  @Max(6)
  @Min(1)
  @IsEnum(GetGovInvoiceWordSettingEcpayInvoiceTerm)
  InvoiceTerm: GetGovInvoiceWordSettingEcpayInvoiceTerm;

  @ApiProperty({
    description: `字軌類別  
07：一般稅額發票  
08：特種稅額發票`,
    enum: GetGovInvoiceWordSettingEcpayInvType,
    example: GetGovInvoiceWordSettingEcpayInvType.GeneralTax,
    maxLength: 2,
    minLength: 2,
  })
  @IsDefined()
  @IsNumberString()
  @Length(2, 2)
  @IsEnum(GetGovInvoiceWordSettingEcpayInvType)
  InvType: GetGovInvoiceWordSettingEcpayInvType;

  @ApiProperty({
    description: `發票字軌  
發票字軌名稱  ex：KK`,
    example: 'KK',
    maxLength: 2,
    minLength: 2,
  })
  @IsDefined()
  @IsString()
  @Length(2, 2)
  InvoiceHeader: string;

  @ApiProperty({
    description: `起始發票編號  
8 碼發票號碼，尾數需為 00 或 50。（例：10000000）`,
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
    description: `結束發票編號  
8 碼發票號碼，尾數需為 49 或 99。（例：10000049）`,
    example: '10000049',
    maxLength: 8,
    minLength: 8,
  })
  @IsDefined()
  @IsNumberString()
  @Length(8, 8)
  @Matches(/^\d{6}(49|99)$/)
  InvoiceEnd: string;

  @ApiProperty({
    description: `申請本數  
本數為特店向財政部申請字軌配號的單位。一本為 50 個發票號碼。`,
    example: 1,
    minimum: 1,
  })
  @IsDefined()
  @IsInt()
  @Min(1)
  Number: number;
}

export class GetGovInvoiceWordSettingEcpayDecryptedResponseDto {
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
    minLength: 1,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 200)
  RtnMsg: string;

  @ApiProperty({
    description: '發票配號結果清單',
    type: () => [GetGovInvoiceWordSettingEcpayInvoiceInfoDto],
  })
  @IsDefined()
  @IsArray()
  @Type(() => GetGovInvoiceWordSettingEcpayInvoiceInfoDto)
  @ValidateNested({ each: true })
  InvoiceInfo: GetGovInvoiceWordSettingEcpayInvoiceInfoDto[];
}
