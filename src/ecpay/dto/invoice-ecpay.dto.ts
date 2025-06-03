import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class InvoiceEcpayDto {
  @ApiProperty({
    description: '發票關聯號碼，請用 30 碼 UID',
    example: 'INV20250603-000000000000000000000000',
  })
  @IsString()
  @Length(1, 30)
  RelateNumber: string;

  @ApiProperty({
    description: '客戶代號',
    example: 'CUST000001234567890',
  })
  @IsString()
  @Length(0, 20)
  @IsNotEmpty()
  CustomerID: string;

  @ApiProperty({
    description: '固定 8 位長度數字',
    example: '12345678',
  })
  @IsNumberString()
  @Length(0, 8)
  @IsNotEmpty()
  CustomerIdentifier: string;

  @ApiProperty({
    description: '買受人姓名，須為中英文及數字',
    example: '王小明',
  })
  @IsString()
  @Length(0, 20)
  @IsNotEmpty()
  CustomerName: string;

  @ApiProperty({
    description: '買受人地址',
    example: '臺北市中正區忠孝東路一段1號',
  })
  @IsString()
  @Length(0, 200)
  @IsNotEmpty()
  CustomerAddr: string;

  @ApiProperty({
    description: '買受人電話(純數字)',
    example: '0912345678',
  })
  @IsNumberString()
  @Length(0, 20)
  @IsNotEmpty()
  CustomerPhone: string;

  @ApiProperty({
    description: '買受人電子郵件',
    example: 'test@example.com',
  })
  @IsEmail()
  @Length(0, 200)
  @IsNotEmpty()
  CustomerEmail: string;

  @ApiProperty({
    description: `經海關出口: 1
非經海關出口: 2`,
    example: '1',
  })
  @Matches(/^[12]$/, {
    message: 'ClearanceMark 只能是 "1" 或 "2"',
  })
  ClearanceMark: string;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @Matches(/^[12]$/, {
    message: 'TaxType 只能是 "1" 或 "2"',
  })
  TaxType: string;

  @ApiProperty({
    description: `載具類別:
無載具: 空字串
會員載具: 1
自然人憑證: 2
手機條碼: 3`,
    example: '3',
  })
  @IsString()
  @Length(0, 1)
  CarruerType: string;

  @ApiProperty({
    description: `1. 當載具類別[CarruerType]為空字串(無載具)或 1(會員載具)時，則請帶空字串。
2. 當載具類別[CarruerType]為 2(自然人憑證)時，則請帶固定長度為 16 且格式為 2 碼大小寫字母 加上 14 碼數字。
3. 當載具類別[CarruerType]為 3(買受人之手機條碼)時，則請帶固定長度為 8 且格式為 1 碼斜線「/」加上 由 7 碼數字及大小寫字母組成`,
    example: '/ABCD123',
  })
  @IsString()
  @Length(0, 64)
  CarruerNum: string;

  @ApiProperty({
    description: `是否捐贈發票
捐贈: 1
不捐贈: 0`,
    example: '1',
  })
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[01]$/, {
    message: 'Donation 只能是 "0" 或 "1"',
  })
  Donation: string;

  @ApiProperty({
    description: '受捐贈單位愛心碼',
    example: '1234567',
  })
  @IsString()
  @Length(1, 7)
  @IsNotEmpty()
  LoveCode: string;

  @ApiProperty({
    description: `列印: 1
不列印: 0`,
    example: '0',
  })
  @IsNumberString()
  @Matches(/^[01]$/, {
    message: 'Print 只能是 "0" 或 "1"',
  })
  Print: string;

  @ApiProperty({
    description: '商品名稱，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '咖啡|甜點',
  })
  @IsString()
  @Length(1, 4096)
  InvoiceItemName: string;

  @ApiProperty({
    description: '商品數量，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '1|2',
  })
  @IsString()
  @Length(1, 4096)
  InvoiceItemCount: string;

  @ApiProperty({
    description: '商品單位，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '杯|份',
  })
  @IsString()
  @Length(1, 4096)
  InvoiceItemWord: string;

  @ApiProperty({
    description: '商品價格，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '100|200',
  })
  @IsString()
  @Length(1, 4096)
  InvoiceItemPrice: string;

  @ApiProperty({
    description: `商品課稅類別，若有兩項以上商品時請用管線符號”|”
分隔。`,
    example: '1|2',
  })
  @IsString()
  @Length(1, 4096)
  InvoiceItemTaxType: string;

  @ApiProperty({
    description: '商品備註，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '限量|贈品',
  })
  @IsString()
  @Length(1, 4096)
  InvoiceRemark: string;

  @ApiProperty({
    description: `發票開立延遲天數。本參數值請帶 0~15(天)，當天數
為 0 時，則付款完成後立即開立發票。`,
    example: '0',
  })
  @IsNumberString()
  @Length(1, 2)
  @Matches(/^(?:\d|1[0-5])$/, {
    message: 'DelayDay 必須為 0~15 的數字字串',
  })
  DelayDay: string;

  @ApiProperty({
    description: `一般稅額: 07
特種稅額: 08`,
    example: '07',
  })
  @IsString()
  @Length(2, 2)
  @Matches(/^(?:07|08)$/, {
    message: 'InvType 必須是 "07" 或 "08"',
  })
  InvType: string;
}
