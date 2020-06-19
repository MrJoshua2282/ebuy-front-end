import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Details.css';
import Title from '../Title/Title';
import { ReturnBtn, GoToCartBtn } from '../../shared/Btn/Btns';
import { ProductsConsumer } from '../../context';

export default class Details extends Component {
  render() {
    return (
      <ProductsConsumer>
        {(value) => {
          const { id, company, img, info, price, title, inCart } = value.detailProduct;
          return (
            <React.Fragment>
              <Title title={title} />
              <div className='details-container'>
                <img src={img} alt='product' />
                <div>
                  <h2>{title}</h2>
                  <h4 className='madeBy'>made by: {company}</h4>
                  <strong>${price}</strong>
                  <p>info</p>
                  <p>{info}</p>

                  <div>
                    <Link to='/'>
                      <ReturnBtn>Back To Products</ReturnBtn>
                    </Link>
                    <GoToCartBtn onClick={() => {
                      value.addToCart(id);
                      // value.openModalHandler(id);
                    }} disabled={inCart ? true : false} >{inCart ? 'In Cart' : 'Add To Cart'} </GoToCartBtn>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        }}
      </ProductsConsumer>
    )
  }
}
