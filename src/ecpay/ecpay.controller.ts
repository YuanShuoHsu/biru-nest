import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEcpayDto } from './dto/create-ecpay.dto';
import { UpdateEcpayDto } from './dto/update-ecpay.dto';
import { EcpayService } from './ecpay.service';

@Controller('ecpay')
export class EcpayController {
  constructor(private readonly ecpayService: EcpayService) {}

  @Post()
  create(@Body() createEcpayDto: CreateEcpayDto) {
    return this.ecpayService.create(createEcpayDto);
  }

  @Get()
  findAll() {
    return this.ecpayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ecpayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEcpayDto: UpdateEcpayDto) {
    return this.ecpayService.update(+id, updateEcpayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecpayService.remove(+id);
  }
}
