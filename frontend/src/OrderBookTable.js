import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class OrderBookTable extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventory.map((item, index) => 
            <tr key={index}>
              <td>{item.rate.toFixed(8)}</td>
              <td>{item.stock.map((stock, stockIndex) => 
                <div key={stockIndex} className={'exchange-' + stock.exchange}>{stock.quantity.toFixed(8)}</div>)
              }</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </Table>
    );
  }
}

export default OrderBookTable;