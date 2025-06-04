import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

export class InvoiceEcpayDto {
  @ApiProperty({
    description: '發票關聯號碼，請用 30 碼 UID',
    example: 'INV20250603-000000000000000000000000',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 30)
  RelateNumber: string;

  @ApiProperty({
    description: '客戶代號',
    example: 'CUST000001234567890',
  })
  @IsDefined()
  @IsString()
  @Length(0, 20)
  CustomerID: string;

  @ApiProperty({
    description: '固定 8 位長度數字',
    example: '12345678',
  })
  @IsDefined()
  @ValidateIf(({ CustomerIdentifier }) => CustomerIdentifier !== '')
  @IsNumberString()
  @Length(8, 8)
  CustomerIdentifier: string;

  @ApiProperty({
    description: '買受人姓名，須為中英文及數字',
    example: '王小明',
  })
  @IsDefined()
  @IsString()
  @Length(0, 20)
  CustomerName: string;

  @ApiProperty({
    description: '買受人地址',
    example: '臺北市中正區忠孝東路一段1號',
  })
  @IsDefined()
  @IsString()
  @Length(0, 200)
  CustomerAddr: string;

  @ApiProperty({
    description: '買受人電話(純數字)',
    example: '0912345678',
  })
  @IsDefined()
  @ValidateIf(({ CustomerPhone }) => CustomerPhone !== '')
  @IsNumberString()
  @Length(1, 20)
  CustomerPhone: string;

  @ApiProperty({
    description: '買受人電子郵件',
    example: 'test@example.com',
  })
  @IsDefined()
  @ValidateIf(({ CustomerEmail }) => CustomerEmail !== '')
  @IsEmail()
  @Length(1, 200)
  CustomerEmail: string;

  @ApiProperty({
    description: `經海關出口: 1
非經海關出口: 2`,
    example: '1',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[12]$/)
  ClearanceMark: string;

  @ApiProperty({
    description: '',
    example: '1',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[12]$/)
  TaxType: string;

  @ApiProperty({
    description: `載具類別:
無載具: 空字串
會員載具: 1
自然人憑證: 2
手機條碼: 3`,
    example: '3',
  })
  @IsDefined()
  @ValidateIf(({ CarruerType }) => CarruerType !== '')
  @IsNumberString()
  @Matches(/^[123]$/)
  @Length(1, 1)
  CarruerType: string;

  @ApiProperty({
    description: `1. 當載具類別[CarruerType]為空字串(無載具)或 1(會員載具)時，則請帶空字串。
    2. 當載具類別[CarruerType]為 2(自然人憑證)時，則請帶固定長度為 16 且格式為 2 碼大小寫字母 加上 14 碼數字。
    3. 當載具類別[CarruerType]為 3(買受人之手機條碼)時，則請帶固定長度為 8 且格式為 1 碼斜線「/」加上由 7 碼數字及大小寫字母組成`,
    example: '/ABCD123',
  })
  @IsDefined()
  @ValidateIf(({ CarruerType }) => CarruerType === '' || CarruerType === '1')
  @Matches(/^$/)
  @ValidateIf(({ CarruerType }) => CarruerType === '2')
  @Matches(/^[A-Za-z]{2}[0-9]{14}$/)
  @Length(16, 16)
  @ValidateIf(({ CarruerType }) => CarruerType === '3')
  @Matches(/^\/[A-Za-z0-9]{7}$/)
  @Length(8, 8)
  CarruerNum: string;

  @ApiProperty({
    description: `是否捐贈發票
捐贈: 1
不捐贈: 0`,
    example: '1',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[01]$/)
  Donation: string;

  @ApiProperty({
    description: '受捐贈單位愛心碼',
    example: '1234567',
  })
  @IsDefined()
  @ValidateIf(({ LoveCode }) => LoveCode !== '')
  @IsNumberString()
  @Length(7, 7)
  LoveCode: string;

  @ApiProperty({
    description: `列印: 1
不列印: 0`,
    example: '0',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(1, 1)
  @Matches(/^[01]$/)
  Print: string;

  @ApiProperty({
    description: '商品名稱，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '咖啡|甜點',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4096)
  InvoiceItemName: string;

  @ApiProperty({
    description: '商品數量，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '1|2',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4096)
  InvoiceItemCount: string;

  @ApiProperty({
    description: '商品單位，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '杯|份',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4096)
  InvoiceItemWord: string;

  @ApiProperty({
    description: '商品價格，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '100|200',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4096)
  InvoiceItemPrice: string;

  @ApiProperty({
    description: `商品課稅類別，若有兩項以上商品時請用管線符號”|”分隔。`,
    example: '1|2',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4096)
  InvoiceItemTaxType: string;

  @ApiProperty({
    description: '商品備註，若有兩項以上商品時請用管線符號”|”分隔。',
    example: '限量|贈品',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Length(1, 4096)
  InvoiceRemark: string;

  @ApiProperty({
    description: `發票開立延遲天數。本參數值請帶 0~15(天)，當天數為 0 時，則付款完成後立即開立發票。`,
    example: '0',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^(?:\d|1[0-5])$/)
  @Length(1, 2)
  DelayDay: string;

  @ApiProperty({
    description: `一般稅額: 07
特種稅額: 08`,
    example: '07',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsNumberString()
  @Length(2, 2)
  @Matches(/^(?:07|08)$/)
  InvType: string;
}
