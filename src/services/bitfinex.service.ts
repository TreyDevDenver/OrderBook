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
export class BitfinexService {
  protected static readonly baseUrl: string = 'https://api.bitfinex.com/v1/book/';

  constructor(private readonly httpService: HttpService) { }

  /**
   * Get the Bitfinex order book for a market.
   * @param market 
   */
  public async getOrderBook(
    market: Market = Market.BTC_ETH,
  ): Promise<OrderBook> {
    const marketParam = this.marketEnumToParam(market);

    console.log('Get Bitfinex order book from "'
      + BitfinexService.baseUrl + marketParam
      + '?group=1'
      + '"');
    return this.httpService
      .get(
        BitfinexService.baseUrl + marketParam,
        {
          params: {
            group: 1,
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
      //   //todo - handle errors when getting Bitfinex book
      // })
      ;
  }

  /**
   * Convert Bitfinex response to OrderBook type.
   * @param response 
   * @param market 
   */
  protected parseResponseData(
    response: any, 
    market: Market,
  ): OrderBook {
    return {
      exchange: Exchange.Bitfinex,
      retrieved: new Date(),
      market: market,
      asks: response.data.asks.map(ask => {
        return {
          quantity: parseFloat(ask.amount),
          rate: parseFloat(ask.price),
        }
      }),
      bids: response.data.bids.map(ask => {
        return {
          quantity: parseFloat(ask.amount),
          rate: parseFloat(ask.price),
        }
      }),
    }
  }
  
  /**
   * Convert from market enum to string.
   * see: https://api.bitfinex.com/v1/symbols
   * @param market 
   */
  private marketEnumToParam(market: Market): string {
    switch(+market) {
      case Market.BTC_ETH:
        return 'ethbtc';
    }
    return market.toString();
  }
}
