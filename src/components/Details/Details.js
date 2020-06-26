import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Details.css';
import Title from '../../shared/Title/Title';
import { ReturnBtn, GoToCartBtn } from '../../shared/Btn/Btns';
import { ProductsConsumer } from '../../context';

export default class Details extends Component {
  render() {
    return (
      <ProductsConsumer>
        {(value) => {
          const { id, company, image, description, price, title, inCart } = value.detailProduct;
          console.log(value.detailProduct)
          return (
            <React.Fragment>
              <Title title={title} />
              <div className='details-container'>
                <img className='details-img' style={{ width: '50%' }} src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt='product' />
                <div>
                  <h2>{title}</h2>
                  <h4 className='madeBy'>made by: {company}</h4>
                  <strong>${price}</strong>
                  <p>description</p>
                  <p>{description}</p>

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
