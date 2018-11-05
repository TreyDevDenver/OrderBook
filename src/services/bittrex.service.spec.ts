import { Test, TestingModule } from '@nestjs/testing';
import { BittrexService } from './bittrex.service';

describe('BittrexService', () => {
  let provider: BittrexService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BittrexService],
    }).compile();
    provider = module.get<BittrexService>(BittrexService);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
