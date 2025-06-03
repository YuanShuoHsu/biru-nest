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
  @IsString()
  @Length(1, 20)
  MerchantTradeNo: string;

  @IsString()
  @Length(19, 19)
  @Matches(/^\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}$/)
  MerchantTradeDate: string;

  @IsNumberString()
  @Length(1, 20)
  TotalAmount: string;

  @IsString()
  @Length(1, 200)
  TradeDesc: string;

  @IsString()
  @Length(1, 200)
  ItemName: string;

  @IsUrl()
  @Length(1, 200)
  ReturnURL: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(1, 20, { each: true })
  ChooseSubPayment?: string[];

  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  OrderResultURL?: string;

  @IsOptional()
  @Matches(/^[01]$/)
  NeedExtraPaidInfo?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  ClientBackURL?: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 200)
  ItemURL?: string;

  @IsOptional()
  @IsString()
  Remark?: string;

  @IsOptional()
  @IsString()
  HoldTradeAMT?: string;

  @IsOptional()
  @IsString()
  StoreID?: string;

  @IsOptional()
  @IsString()
  CustomField1?: string;

  @IsOptional()
  @IsString()
  CustomField2?: string;

  @IsOptional()
  @IsString()
  CustomField3?: string;

  @IsOptional()
  @IsString()
  CustomField4?: string;
}
