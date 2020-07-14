import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Cart.css';
import Title from '../../shared/Title/Title';
import CartList from './CartList';
import PayPalBtn from './PayPalBtn';
import { DangerClearBtn } from '../../shared/Btn/Btns';
import * as actionCreators from '../../store/actionCreators';

class Cart extends Component {
  render() {
    return (
      <section>
        {this.props.cart.length > 0 &&
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
            <CartList />
            <div className='cart-final-values-div'>
              <Link to='/' >
                <DangerClearBtn onClick={() => this.props.clearCart()}>CLEAR CART</DangerClearBtn>
              </Link>
              <span className='finalValues' >SUBTOTAL: $ {this.props.cartSubTotal.toFixed(2)}</span>
              <span className='finalValues'>TAX: $ {this.props.cartTax.toFixed(2)}</span>
              <span className='finalValues'>TOTAL: $ {this.props.cartTotal.toFixed(2)}</span>
              <PayPalBtn total={this.props.cartTotal.toFixed(2)} clearCart={this.props.clearCart} history={this.props.history} updateBackendInventory={this.props.updateBackendInventory} />
            </div>
          </React.Fragment>
        }

        {this.props.cart.length === 0 && <Title name='your' title='cart is currently empty' />}
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    cartSubTotal: state.cartSubTotal,
    cartTax: state.cartTax,
    cartTotal: state.cartTotal,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(actionCreators.clearCart()),
    updateBackendInventory: () => dispatch(actionCreators.updateBackendInventory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);