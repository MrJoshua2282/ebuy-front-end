import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './GlobalModal.css';
import { ReturnBtn, GoToCartBtn } from '../Btn/Btns';
import { ProductsContext } from '../../context';

export default function ProductCard() {
  const context = useContext(ProductsContext);
  const { img, title, price } = context.modalProduct;
  const { closeModalHandler } = context;
  return (
    <React.Fragment>
      <h2>Item added to cart</h2>
      <div><img className='modal-img' src={img} alt='product' /></div>
      <div className='modal-title'>{title}</div>
      <div className='modal-price'>Price: $ {price}</div>
      <ReturnBtn onClick={() => closeModalHandler()}>Continue Shopping</ReturnBtn>
      <Link to='/cart'><GoToCartBtn onClick={() => closeModalHandler()}>Go To Cart</GoToCartBtn></Link>
    </React.Fragment>
  )
}
