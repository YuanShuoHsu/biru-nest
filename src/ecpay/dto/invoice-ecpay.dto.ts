import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class InvoiceEcpayDto {
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  RelateNumber: string;

  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  CustomerName: string;

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  InvoiceItemName: string;

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  InvoiceItemCount: string;

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  InvoiceItemWord: string;

  @IsNumberString()
  @Length(1, 200)
  @IsNotEmpty()
  InvoiceItemPrice: string;

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  InvoiceItemTaxType: string;

  @IsOptional()
  @IsString()
  @Length(1, 8)
  CustomerIdentifier?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  CustomerAddr?: string;

  @IsOptional()
  @Matches(/^[0-9\-\+]{7,20}$/)
  CustomerPhone?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 200)
  CustomerEmail?: string;

  @IsOptional()
  @Matches(/^[123]$/)
  ClearanceMark?: string;

  @IsOptional()
  @Matches(/^[12]$/)
  TaxType?: string;

  /**
   * 載具類別（選填）
   * - Str(1)，1 個字元
   */
  @IsOptional()
  @IsString()
  @Length(1, 1)
  CarruerType?: string;

  @IsOptional()
  @IsString()
  @Length(1, 64)
  CarruerNum?: string;

  @IsOptional()
  @IsString()
  @Length(1, 7)
  LoveCode?: string;

  @IsOptional()
  @Matches(/^[012]$/)
  Donation?: string;

  @IsOptional()
  @Matches(/^[01]$/)
  Print?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  InvoiceRemark?: string;

  @IsOptional()
  @IsNumberString()
  @Length(1, 2)
  DelayDay?: string;

  @IsOptional()
  @IsString()
  @Length(1, 2)
  InvType?: string;
}
