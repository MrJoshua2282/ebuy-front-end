import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Modal.css';
import { ProductsConsumer } from '../context';

class Modal extends Component {
  render() {
    return (
      <ProductsConsumer>
        {value => {
          const { showModal, closeModalHandler } = value;
          const { img, title, price } = value.modalProduct;
          if (!showModal) {
            return null;
          } else {
            return (
              <div className='modal-background'>
                <div className='modal-card'>
                  <h2>Item added to cart</h2>
                  <div><img className='modal-img' src={img} alt='product' /></div>
                  <div>{title}</div>
                  <div>Price: $ {price}</div>
                  <Link to='/'><button className='detail-backBtn' onClick={() => closeModalHandler()}>Continue Shopping</button></Link>
                  <Link to='/cart'><button onClick={() => closeModalHandler()} className='detail-addBtn'>Go To Cart</button></Link>
                </div>
              </div>
            )

          }
        }}
      </ProductsConsumer>
    )
  }
}

export default Modal;