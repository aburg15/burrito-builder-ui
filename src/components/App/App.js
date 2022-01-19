import React, { Component } from 'react';
import './App.css';
import {getOrders, postNewOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount = () => {
    return getOrders()
      .then(data => {
        this.setState({ orders: data.orders })
      })
      .catch(err => console.error('Error fetching:', err));
  }

  addOrder = (newOrder) => {
    return postNewOrder(newOrder)
      .then(data => {
        this.setState({ orders: [...this.state.orders, data] })
      })
      .catch(err => console.error(err))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addOrder={this.addOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
