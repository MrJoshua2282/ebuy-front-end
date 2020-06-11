import React from 'react'

import './CartItem';
import { ProductsConsumer } from '../../context';
import Trash from '../../images/trash';

export default function CartItem(props) {
  const { id, title, price, img, count, total } = props.product;

  return (
    <ProductsConsumer>
      {value => {
        return (
          <div>
            <span className='cart-list'>
              <img style={{ width: '5rem', height: '5rem' }} class='cartItem-img' src={img} alt='product' />
              <span>{title}</span>
              <span>$ {price}</span>
              <span >
                <button className='plusMinus' onClick={() => value.decrement(id)}>-</button>
                <button className='plusMinus'>{count}</button>
                <button className='plusMinus' onClick={() => value.increment(id)}>+</button></span>
              <Trash fill='rgb(108, 196, 255)' className='trashIcon' onClick={() => value.removeItem(id)} />
              <span><strong>Item Total</strong>: $ {total}</span>
            </span>
          </div>

        )
      }}
    </ProductsConsumer>
  )
}
