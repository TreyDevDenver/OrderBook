import React, { Component } from 'react';
import axios from "axios";
import { Grid, Row, Col, PageHeader, Panel } from 'react-bootstrap';

import OrderBookTable from './OrderBookTable';

import './App.css';

class App extends Component {
  state = {
    asks: [],
    bids: [],
    exchanges: [],
    market: null,
    retrieved: null,
  }
  componentDidMount() {
    axios
      .get('/orderbook')
      .then(response => {
        const data = response.data;
        if (data.retrieved) {
          data.retrieved = new Date(data.retrieved);
        }
        this.setState(data);
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <div className="App">
        <PageHeader>
          OrderBook <small>Showing bids and asks from {this.state.exchanges.length} exchanges.</small>
        </PageHeader>
        {this.state.exchanges.length ? (
          <Grid>
            <Row className="show-grid">
              <Col xs={12} sm={5}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Asks</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <OrderBookTable 
                      inventory={this.state.asks}
                    ></OrderBookTable>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={12} sm={5}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Bids</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <OrderBookTable 
                      inventory={this.state.bids}
                    ></OrderBookTable>
                  </Panel.Body>
                </Panel>
              </Col>
              <Col xs={12} sm={2}>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Market</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>{this.state.market}</Panel.Body>
                </Panel>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Exchanges</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>{this.state.exchanges.map((exchange, index) => 
                    <div key={index} className={'exchange-' + index}>{exchange}</div>
                  )}</Panel.Body>
                </Panel>
                <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h4">Retrieved</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    {this.state.retrieved ? this.state.retrieved.toLocaleDateString() : ''}
                    <br/>
                    {this.state.retrieved ? this.state.retrieved.toLocaleTimeString() : ''}
                  </Panel.Body>
                </Panel>
              </Col>
            </Row>
          </Grid>
        ) : (
          <div>
            <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Loading...
          </div>
        )}
      </div>
    );
  }
}

export default App;
