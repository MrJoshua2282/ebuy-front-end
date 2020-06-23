import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Cart.css';
import Title from '../../shared/Title/Title';
import CartList from './CartList';
import PayPalBtn from './PayPalBtn';
import { DangerClearBtn } from '../../shared/Btn/Btns';
import { ProductsConsumer } from '../../context';

export default class Cart extends Component {
  render() {
    return (
      <section>
        <ProductsConsumer>
          {value => {
            const { cart } = value;

            if (cart.length > 0) {
              return (
                <React.Fragment>
                  <Title name='your' title='cart' />
                  <div className='cart-list'>
                    <span>PRODUCTS</span>
                    <span>NAME OF PRODUCT</span>
                    <span>PRICE</span>
                    <span>QUANTITY</span>
                    <span>REMOVE</span>
                    <span>TOTAL</span>
                  </div>
                  <CartList value={value} />
                  <div className='cart-final-values-div'>
                    <Link to='/' >
                      <DangerClearBtn onClick={() => value.clearCart()}>CLEAR CART</DangerClearBtn>
                    </Link>
                    <span className='finalValues' >SUBTOTAL: $ {value.cartSubTotal.toFixed(2)}</span>
                    <span className='finalValues'>TAX: $ {value.cartTax.toFixed(2)}</span>
                    <span className='finalValues'>TOTAL: $ {value.cartTotal.toFixed(2)}</span>
                    <PayPalBtn total={value.cartTotal} clearCart={value.clearCart} history={this.props.history} />
                  </div>
                </React.Fragment>
              )
            } else {
              return (
                <Title name='your' title='cart is currently empty' />
              )
            }
          }}
        </ProductsConsumer>
      </section>
    )
  }
}
