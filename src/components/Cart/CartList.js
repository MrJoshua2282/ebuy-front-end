import React from 'react'

import './CartList';
import CartItem from './CartItem';

export default function CartList(props) {
  const { value } = props;
  let list = value.cart.map((el, i) => {
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
