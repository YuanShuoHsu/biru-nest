import { Test, TestingModule } from '@nestjs/testing';

import { EcpayBaseService } from './ecpay-base.service';

describe('EcpayService', () => {
  let service: EcpayBaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcpayBaseService],
    }).compile();

    service = module.get<EcpayBaseService>(EcpayBaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
