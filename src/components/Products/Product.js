import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Product.css';
import Cart from '../../images/cart';
import * as actionCreators from '../../store/actionCreators';

class Products extends Component {
  render() {
    const { id, title, image, price, inCart } = this.props.product;
    return (
      <div className='card' onClick={() => this.props.handleDetail(id)}>
        <Link to='/details' className='card-link'><img className='card-link-img' src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={`${title}`} /></Link>

        {!inCart && <Link className='card-link-cart' to='/' onClick={() => {
          this.props.addToCart(id);
          this.props.openModalHandler('productCard', id);
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

const mapDispatchToProps = dispatch => {
  return {
    openModalHandler: (word, id) => dispatch(actionCreators.openModalHandler(word, id)),
    addToCart: (id) => dispatch(actionCreators.addToCart(id)),
    handleDetail: (id) => dispatch(actionCreators.handleDetail(id))
  }
}

export default connect(null, mapDispatchToProps)(Products);

Products.propTypes = {
  product: PropTypes.shape({
    // id: PropTypes.number,
    id: PropTypes.string,
    title: PropTypes.string,
    img: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool
  })
}