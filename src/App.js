import React, { useEffect, Suspense } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import Spinner from './shared/Spinner/Spinner';
import Navbar from './components/Navbar/Navbar';
import * as actionCreators from './store/actionCreators';

const Cart = React.lazy(() => import('./components/Cart/Cart'));
const Default = React.lazy(() => import('./components/Default/Default'));
const Details = React.lazy(() => import('./components/Details/Details'));
const ProductList = React.lazy(() => import('./components/Products/ProductList'));
const Modal = React.lazy(() => import('./shared/Modal/Modal'));
const ErrorModal = React.lazy(() => import('./shared/Modal/ErrorModal'));
const SignupLogin = React.lazy(() => import('./components/SignUpLogin/SignUpLogin'));
const Account = React.lazy(() => import('./components/Account/Account'));


let logoutTimer;
const App = () => {
  const history = useHistory();
  const store = useSelector(store => store);
  const dispatch = useDispatch();
  // const setProducts = useCallback(() => dispatch(actionCreators.setProducts), [dispatch]);

  const { token, tokenExpirationDate } = store;

  // manage this data here bc its one of the first components to render
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      dispatch(actionCreators.signInHandler(storedData, new Date(storedData.expiration)));
    }
  }, [dispatch]);


  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      // logoutTimer = setTimeout(dispatch(actionCreators.signOutHandler()), remainingTime);
      logoutTimer = setTimeout(() => {
        history.replace('/');
        dispatch(actionCreators.signOutHandler());
      }, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, dispatch, tokenExpirationDate])

  useEffect(() => {
    dispatch(actionCreators.setProducts())
  }, [dispatch]);

  return (
    <div className='App'>
      <Navbar />
      <Suspense fallback={<Spinner />} >
        <Modal />
        <ErrorModal />
        <Switch>
          <Route path='/' exact component={ProductList} />
          <Route path='/details' exact component={Details} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/signuplogin' component={SignupLogin} />
          {token && <Route path='/account' component={Account} />}
          <Route component={Default} />
        </Switch>
      </Suspense>
    </div>
  );
}
export default App;