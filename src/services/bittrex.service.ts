import { 
  Injectable, 
  HttpService, 
} from '@nestjs/common';
import { OrderBook } from 'orderbook/orderbook';
import { 
  Exchange, 
  Market, 
} from 'orderbook/orderbook.enums';

@Injectable()
export class BittrexService {
  protected static readonly baseUrl: string = 'https://bittrex.com/api/v1.1/public';

  constructor(private readonly httpService: HttpService) { }

  /**
   * Get the Bittrex order book for a market.
   * @param market 
   */
  public async getOrderBook(
    market: Market = Market.BTC_ETH,
  ): Promise<OrderBook> {
    const marketParam = this.marketEnumToParam(market);

    console.log('Get Bittrex order book from "'
      + BittrexService.baseUrl + '/getorderbook'
      + '?market=' + marketParam
      + '&type=both'
      + '"');
    return this.httpService
      .get(
        BittrexService.baseUrl + '/getorderbook',
        {
          params: {
            market: marketParam,
            type: 'both',
          }
        }
      )
      .toPromise()
      .then(response => {
        if (!response.data || !response.data.success) {
          // throw something?
        }
        return this.parseResponseData(response, market);
      })
      // .catch(err => {
      //   //todo - handle errors when getting bittrex book
      // })
      ;
  }

  /**
   * Convert Bittrex response to OrderBook type.
   * @param response 
   * @param market 
   */
  protected parseResponseData(
    response: any, 
    market: Market,
  ): OrderBook {
    return {
      exchange: Exchange.Bittrex,
      retrieved: new Date(),
      market: market,
      asks: response.data.result.sell.map(ask => {
        return {
          quantity: ask.Quantity,
          rate: ask.Rate,
        }
      }),
      bids: response.data.result.buy.map(ask => {
        return {
          quantity: ask.Quantity,
          rate: ask.Rate,
        }
      }),
    }
  }
  
  /**
   * Convert from market enum to string as Brttrex uses hypens instead of underscores.
   * @param market 
   */
  private marketEnumToParam(market: Market): string {
    // ts bug/weirdness - enum parsing must be fully exhaustive 
    // see: https://github.com/Microsoft/TypeScript/issues/21985
    // workaround is to convert it to a number first
    switch(+market) {
      case Market.BTC_ETH:
        return 'BTC-ETH';
    }
    // otherwise this throws "Property 'toString()' does not exist on type 'never'."
    return market.toString();
  }
}
