import { Test, TestingModule } from '@nestjs/testing';
import { EcpayService } from './ecpay.service';

describe('EcpayService', () => {
  let service: EcpayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayService],
    }).compile();

    service = module.get<EcpayService>(EcpayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
