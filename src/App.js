import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Details from './components/Details';
import ProductList from './components/ProductList';
import Modal from './components/Modal';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Modal />
        <Switch>
          <Route path='/' exact component={ProductList} />
          <Route path='/details' exact component={Details} />
          <Route path='/cart' exact component={Cart} />
          <Route component={Default} />
        </Switch>
      </div>
    );

  }
}

export default App;


// <span style={{ color: 'red' }}>e</span>
// <span style={{ color: 'blue' }}>b</span>
// <span style={{ color: ' rgb(223, 177, 93)' }}>u</span>
// <span style={{ color: 'green' }}>y</span>