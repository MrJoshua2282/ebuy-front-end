import React from 'react';
import { useSelector } from 'react-redux';

import './CartList';
import CartItem from './CartItem';

export default function CartList() {
  const state = useSelector(state => state);
  let list = state.cart.map((el, i) => {
    return (
      <CartItem key={i} product={el} />
    )
  })
  return (
    <React.Fragment>
      {list}
    </React.Fragment>
  )
}
