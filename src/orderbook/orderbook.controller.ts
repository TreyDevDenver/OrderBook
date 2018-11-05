import { 
  Controller, 
  Get, 
} from '@nestjs/common';
import { 
  InventoryList, 
  CombinedOrderBook, 
  OrderBook, 
} from './orderbook';
import { BitfinexService } from '../services/bitfinex.service';
import { BittrexService } from '../services/bittrex.service';
import { PoloniexService } from '../services/poloniex.service';
import { Market } from './orderbook.enums';;

@Controller('orderbook')
export class OrderbookController {
  /**
   * Inject provider services.
   * @param bittrexService 
   * @param poloniexService 
   */
  constructor(
    private readonly bitfinexService: BitfinexService,
    private readonly bittrexService: BittrexService,
    private readonly poloniexService: PoloniexService,
  ) { }

  /**
   * Endpoint to get a combined orderbook.
   */
  @Get()
  async index(): Promise<CombinedOrderBook> {
    const market = Market.BTC_ETH;
    return Promise.all([
      //this.bitfinexService.getOrderBook(),
      this.bittrexService.getOrderBook(),
      this.poloniexService.getOrderBook(),
    ])
    .then(books => {
      const combinedBook = new CombinedOrderBook(market);
      for (let book of books) {
        combinedBook.addOrderBook(book);
      }
      combinedBook.sortInventory();
      return combinedBook;
    });
  }

  /**
   * Add items from a OrderBook to an existing CombinedOrderBook.
   * @param existingInventory 
   * @param newBook 
   * @param dataType 
   */
  private combineInventory(
    existingInventory: Array<InventoryList>, 
    newBook: OrderBook, 
    dataType: string,
  ): Array<InventoryList> {
    for (let item of newBook[dataType]) {
      const found = existingInventory.find((e, i) => {
        if (e.rate === item.rate) {
          existingInventory[i].stock.push({
            quantity: item.quantity,
            exchange: newBook.exchange,
          });
          return true;
        }
      });
      if (!found) {
        existingInventory.push({
          rate: item.rate,
          stock: [{
            quantity: item.quantity,
            exchange: newBook.exchange,
          }]
        });
      }
    }
    return existingInventory;
  }
}
