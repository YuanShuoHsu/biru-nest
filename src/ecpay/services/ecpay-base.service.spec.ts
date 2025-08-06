import { EcpayBaseService } from './ecpay-base.service';

import { Test, TestingModule } from '@nestjs/testing';

describe('EcpayBaseService', () => {
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
