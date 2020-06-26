import React, { Component } from 'react';

import './ProductList.css';
import Product from './Product';
import Title from '../../shared/Title/Title';
import Spinner from '../../shared/Spinner/Spinner';
import { ProductsContext } from '../../context';

export default class ProductList extends Component {
  static contextType = ProductsContext;
  render() {

    let list;
    if (this.context.products) {
      list = this.context.products.map((el, i) => {
        return <Product
          key={i} product={el} ></Product>
      })
    }
    return (
      <div >
        <Title name='our' title='products' />
        <div className='all-products-container'>
          {this.context.isLoading && <Spinner />}
          {!this.context.isLoading && list}
        </div>
      </div>
    )
  }
}