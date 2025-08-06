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
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class UpdateInvoiceWordStatusEcpayEncryptedRequestHeaderDto {
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

export class UpdateInvoiceWordStatusEcpayEncryptedRequestDto {
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
    type: () => UpdateInvoiceWordStatusEcpayEncryptedRequestHeaderDto,
  })
  @IsDefined()
  @Type(() => UpdateInvoiceWordStatusEcpayEncryptedRequestHeaderDto)
  @ValidateNested()
  RqHeader: UpdateInvoiceWordStatusEcpayEncryptedRequestHeaderDto;

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

enum UpdateInvoiceWordStatusEcpayInvoiceStatus {
  Disabled = 0,
  Suspended = 1,
  Enabled = 2,
}

export class UpdateInvoiceWordStatusEcpayDecryptedRequestDto {
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
    description: `字軌號碼 ID（必填）  
為新增字軌後取到的TrackID`,
    example: '1234567890',
    maxLength: 10,
    minLength: 1,
  })
  @IsDefined()
  @IsNumberString()
  @Length(1, 10)
  TrackID: string;

  @ApiProperty({
    description: `發票字軌狀態（必填）
- 如狀態設定為停用，該字軌區間無法上傳發票
- 0：停用  
1：暫停  
2：啟用`,
    enum: UpdateInvoiceWordStatusEcpayInvoiceStatus,
    example: UpdateInvoiceWordStatusEcpayInvoiceStatus.Suspended,
    maximum: 2,
    minimum: 0,
  })
  @IsDefined()
  @IsInt()
  @Max(2)
  @Min(0)
  @IsEnum(UpdateInvoiceWordStatusEcpayInvoiceStatus)
  InvoiceStatus: UpdateInvoiceWordStatusEcpayInvoiceStatus;
}

class UpdateInvoiceWordStatusEcpayEncryptedResponseRpHeaderDto {
  @ApiProperty({
    description: `回傳時間  
Unix timestamp(GMT+8)`,
    example: 1525169058,
  })
  @IsDefined()
  @IsNumber()
  Timestamp: number;
}

export class UpdateInvoiceWordStatusEcpayEncryptedResponseDto {
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
    type: () => UpdateInvoiceWordStatusEcpayEncryptedResponseRpHeaderDto,
  })
  @IsDefined()
  @Type(() => UpdateInvoiceWordStatusEcpayEncryptedResponseRpHeaderDto)
  @ValidateNested()
  RpHeader: UpdateInvoiceWordStatusEcpayEncryptedResponseRpHeaderDto;

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

export class UpdateInvoiceWordStatusEcpayDecryptedResponseDto {
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
}
