import React, { useContext } from 'react'

import './CartItem';
import { ProductsContext } from '../../context';
import Trash from '../../images/trash';

export default function CartItem(props) {
  const context = useContext(ProductsContext)
  const { id, title, price, image, count, total } = props.product;

  return (
    <div>
      <span className='cart-list'>
        <img style={{ height: '5rem' }} className='cartItem-img' src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt='product' />
        <span>{title}</span>
        <span>$ {price}</span>
        <span >
          <button className='plusMinus' onClick={() => context.decrement(id)}>-</button>
          <button className='plusMinus'>{count}</button>
          <button className='plusMinus' onClick={() => context.increment(id)}>+</button></span>
        <Trash fill='rgb(108, 196, 255)' style={{ 'cursor': 'pointer' }} className='trashIcon' onClick={() => context.removeItem(id)} />
        <span><strong>Item Total</strong>: $ {total}</span>
      </span>
    </div>
  )
}
