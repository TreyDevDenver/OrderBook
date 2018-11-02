import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderbookController } from './orderbook/orderbook.controller';
import { BittrexService } from './services/bittrex.service';
import { PoloniexService } from './services/poloniex.service';
import { OrderbookModule } from './orderbook/orderbook.module';
import { BitfinexService } from './services/bitfinex.service';

@Module({
  imports: [OrderbookModule],
  controllers: [AppController, OrderbookController],
  providers: [AppService, BittrexService, PoloniexService, BitfinexService],
})
export class AppModule {}
