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
    example: 1718700000,
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
  })
  @IsOptional()
  @IsString()
  @Length(0, 10)
  PlatformID: string;

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
    example: 'ENCRYPTED_URLENCODED_STRING',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  Data: string;
}

export class IssueInvoiceEcpayDecryptedRequestDto {
  MerchantID: string;
  RelateNumber: string;
  ChannelPartner?: string;
  CustomerID?: string;
  ProductServiceID?: string;
  CustomerIdentifier?: string;
  CustomerName?: string;
  CustomerAddr?: string;
  CustomerPhone?: string;
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
