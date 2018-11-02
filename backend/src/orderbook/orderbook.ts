import { 
  Exchange,
  Market,
} from './orderbook.enums';

interface PriceList {
  readonly quantity: number;
  readonly rate: number;
}

interface InventoryItem {
  readonly quantity: number;
  readonly exchange: Exchange;
}

export interface OrderBook {
  readonly asks: PriceList[];
  readonly bids: PriceList[];
  readonly market: Market;
  readonly exchange: Exchange;
  readonly retrieved: Date;
}

export interface InventoryList {
  readonly rate: number;
  readonly stock: InventoryItem[];
}

export class CombinedOrderBook {
  readonly asks: InventoryList[];
  readonly bids: InventoryList[];
  readonly exchanges: string[];
  readonly market: string;
  readonly retrieved: Date;

  constructor(market: Market) {
    this.asks = [];
    this.bids = [];
    this.exchanges = [];
    this.market = Market[market];
    this.retrieved = new Date();
  }

  public addOrderBook(book:OrderBook) {
    this.exchanges.push(Exchange[book.exchange]);
    this.addInventory(book.exchange, book.asks, 'asks');
    this.addInventory(book.exchange, book.bids, 'bids');
  }

  public sortInventory() {
    this.asks.sort((a, b) => a.rate - b.rate);
    this.bids.sort((a, b) => b.rate - a.rate);
  }

  private addInventory(
    exchange: Exchange,
    inventory: PriceList[], 
    inventoryType: 'asks' | 'bids',
  ): void {
    for (let item of inventory) {
      const found = this[inventoryType].find((e, i) => {
        if (e.rate === item.rate) {
          console.log('Found multiple inventory for ' + inventoryType + ' at ' + item.rate);
          this[inventoryType][i].stock.push({
            quantity: item.quantity,
            exchange: exchange,
          });
          return true;
        }
      });
      if (!found) {
        this[inventoryType].push({
          rate: item.rate,
          stock: [{
            quantity: item.quantity,
            exchange: exchange,
          }]
        });
      }
    }
  }
}
