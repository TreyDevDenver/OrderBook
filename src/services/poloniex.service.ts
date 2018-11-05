import { 
  Injectable, 
  HttpService, 
} from '@nestjs/common';
import { OrderBook } from 'orderbook/orderbook';
import { 
  Exchange, 
  Market, 
} from '../orderbook/orderbook.enums';

@Injectable()
export class PoloniexService {
  protected static readonly baseUrl: string = 'https://poloniex.com/public';

  constructor(private readonly httpService: HttpService) { }

  public async getOrderBook(
    market: Market = Market.BTC_ETH,
  ): Promise<OrderBook> {
    console.log('Get Poloniex order book from "'
      + PoloniexService.baseUrl
      + '?currencyPair=' + Market[market]
      + '&command=returnOrderBook'
      + '"');
    return this.httpService
      .get(
        PoloniexService.baseUrl,
        {
          params: {
            currencyPair: Market[market],
            command: 'returnOrderBook',
          }
        }
      )
      .toPromise()
      .then(response => {
        if (!response.data) {
          // throw something?
        }
        return this.parseResponseData(response, market);
      })
      // .catch(err => {
      //   //todo - handle errors when getting poloniex book
      // })
      ;
  }

  /**
   * Convert Poloniex response to OrderBook type.
   * @param response 
   * @param market 
   */
  protected parseResponseData(
    response: any, 
    market: Market,
  ): OrderBook {
    return {
      exchange: Exchange.Poloniex,
      retrieved: new Date(),
      market: market,
      asks: response.data.asks.map(ask => {
        return {
          quantity: ask[1],
          rate: parseFloat(ask[0])
        }
      }),
      bids: response.data.bids.map(ask => {
        return {
          quantity: ask[1],
          rate: parseFloat(ask[0])
        }
      }),
    }
  }
}
