import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ProductList.css';
import Product from './Product';
import Title from '../../shared/Title/Title';
import Spinner from '../../shared/Spinner/Spinner';

class ProductList extends Component {
  render() {
    let list;
    if (this.props.products) {
      list = this.props.products.map((el, i) => {
        return <Product
          key={i} product={el} ></Product>
      })
    }
    return (
      <div >
        <Title name='our' title='products' />
        <div className='all-products-container'>
          {this.props.isLoading && <Spinner />}
          {!this.props.isLoading && list}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    isLoading: state.isLoading
  }
}

export default connect(mapStateToProps)(ProductList);