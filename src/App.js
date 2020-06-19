import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Default from './components/Default/Default';
import Details from './components/Details/Details';
import ProductList from './components/Products/ProductList';
import Modal from './shared/Modal/Modal';
import ErrorModal from './shared/Modal/ErrorModal';
import SignupLogin from './components/SignUpLogin/SignUpLogin';
import Account from './components/Account/Account';
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Modal />
        <ErrorModal />
        <Switch>
          <Route path='/' exact component={ProductList} />
          <Route path='/details' exact component={Details} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/signuplogin' component={SignupLogin} />
          <Route path='/account' component={Account} />
          <Route component={Default} />
        </Switch>
      </div>
    );
  }
}
export default App;