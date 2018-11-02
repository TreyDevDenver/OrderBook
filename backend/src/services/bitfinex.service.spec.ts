import { Test, TestingModule } from '@nestjs/testing';
import { BitfinexService } from './bitfinex.service';

describe('BitfinexService', () => {
  let service: BitfinexService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitfinexService],
    }).compile();
    service = module.get<BitfinexService>(BitfinexService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
