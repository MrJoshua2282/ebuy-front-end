import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CartItem';
import Trash from '../../images/trash';
import * as actionCreators from '../../store/actionCreators';

class CartItem extends Component {

  render() {
    const { id, title, price, image, count, total } = this.props.product;
    return (
      <div>
        <span className='cart-list'>
          <img style={{ height: '5rem' }} className='cartItem-img' src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt='product' />
          <span>{title}</span>
          <span>$ {price}</span>
          <span >
            <button className='plusMinus' onClick={() => this.props.decrement(id)}>-</button>
            <button className='plusMinus'>{count}</button>
            <button className='plusMinus' onClick={() => this.props.increment(id)}>+</button></span>
          <Trash fill='rgb(108, 196, 255)' style={{ 'cursor': 'pointer' }} className='trashIcon' onClick={() => this.props.removeItem(id)} />
          <span><strong>Item Total</strong>: $ {total}</span>
        </span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: (id) => dispatch(actionCreators.increment(id)),
    decrement: (id) => dispatch(actionCreators.decrement(id)),
    removeItem: (id) => dispatch(actionCreators.removeItem(id))
  }
}

export default connect(null, mapDispatchToProps)(CartItem);