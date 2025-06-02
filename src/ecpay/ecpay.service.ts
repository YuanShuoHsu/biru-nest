import { Injectable } from '@nestjs/common';
import { CreateEcpayDto } from './dto/create-ecpay.dto';
import { UpdateEcpayDto } from './dto/update-ecpay.dto';

@Injectable()
export class EcpayService {
  create(createEcpayDto: CreateEcpayDto) {
    return 'This action adds a new ecpay';
  }

  findAll() {
    return `This action returns all ecpay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ecpay`;
  }

  update(id: number, updateEcpayDto: UpdateEcpayDto) {
    return `This action updates a #${id} ecpay`;
  }

  remove(id: number) {
    return `This action removes a #${id} ecpay`;
  }
}
