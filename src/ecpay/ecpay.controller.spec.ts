import { Test, TestingModule } from '@nestjs/testing';
import { EcpayController } from './ecpay.controller';
import { EcpayService } from './ecpay.service';

describe('EcpayController', () => {
  let controller: EcpayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcpayController],
      providers: [EcpayService],
    }).compile();

    controller = module.get<EcpayController>(EcpayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
