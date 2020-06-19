import React, { Component } from 'react';

import './ProductList.css';
import Product from './Product';
import Title from '../Title/Title';
import { ProductsConsumer } from '../../context';

export default class ProductList extends Component {
  state = {
  }
  render() {

    return (
      <div >
        <Title name='our' title='products' />
        <div className='all-products-container'>
          <ProductsConsumer>
            {(value) => {
              return value.products.map((el, i) => {
                return <Product
                  key={i} product={el} ></Product>
              })
            }}
          </ProductsConsumer>
        </div>
      </div>
    )
  }
}