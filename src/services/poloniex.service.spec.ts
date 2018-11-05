import { Test, TestingModule } from '@nestjs/testing';
import { PoloniexService } from './poloniex.service';

describe('PoloniexService', () => {
  let provider: PoloniexService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoloniexService],
    }).compile();
    provider = module.get<PoloniexService>(PoloniexService);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
