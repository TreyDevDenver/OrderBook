import { Test, TestingModule } from '@nestjs/testing';
import { OrderbookController } from './orderbook.controller';

describe('Orderbook Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrderbookController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: OrderbookController = module.get<OrderbookController>(OrderbookController);
    expect(controller).toBeDefined();
  });
});
