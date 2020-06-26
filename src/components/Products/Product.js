import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Product.css';
import { ProductsConsumer } from '../../context';
import Cart from '../../images/cart';

export default class Products extends Component {
  render() {
    const { id, title, image, price, inCart } = this.props.product;
    return (
      <ProductsConsumer>
        {(value) => {

          return (
            <div className='card' onClick={() => value.handleDetail(id)}>
              <Link to='/details' className='card-link'><img className='card-link-img' src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={`${title}`} /></Link>

              {!inCart && <Link className='card-link-cart' to='/' onClick={() => {
                value.addToCart(id);
                value.openModalHandler('productCard', id);
              }}><Cart className='card-cart' /></Link>}
              {inCart && <div className='card-link-cart'><button className='inCart'>In Cart</button></div>}

              <div className='card-title-price'>
                <span className='card-title'>{title}</span>
                <span className='card-price'>${price}</span>
              </div>
            </div>
          )
        }
        }
      </ProductsConsumer >

    )
  }
}

Products.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  })
}