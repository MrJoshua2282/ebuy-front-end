import React, { useEffect, useContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import { ProductsContext } from './context';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Default from './components/Default/Default';
import Details from './components/Details/Details';
import ProductList from './components/Products/ProductList';
import Modal from './shared/Modal/Modal';
import ErrorModal from './shared/Modal/ErrorModal';
import SignupLogin from './components/SignUpLogin/SignUpLogin';
import Account from './components/Account/Account';
let logoutTimer;
const App = () => {
  const context = useContext(ProductsContext);
  const { toggleSignedInHandler, token, tokenExpirationDate } = context;

  // manage this data here bc its one of the first components to render
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      toggleSignedInHandler(storedData, new Date(storedData.expiration));
      console.log(storedData)
    }
  }, [toggleSignedInHandler]);


  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(toggleSignedInHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, toggleSignedInHandler, tokenExpirationDate])

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
        {context.token && <Route path='/account' component={Account} />}
        <Route component={Default} />
      </Switch>
    </div>
  );
}
export default App;