import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './GlobalModal.css';
import { ReturnBtn, GoToCartBtn } from '../Btn/Btns';
import * as actionCreators from '../../store/actionCreators';

class ProductCard extends Component {
  render() {
    const { image, title, price } = this.props.modalProduct;
    return (
      <React.Fragment>
        <h2>Item added to cart</h2>
        <div><img className='modal-img' src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt='product' /></div>
        <div className='modal-title'>{title}</div>
        <div className='modal-price'>Price: $ {price}</div>
        <ReturnBtn onClick={() => this.props.closeModalHandler()}>Continue Shopping</ReturnBtn>
        <Link to='/cart'><GoToCartBtn onClick={() => this.props.closeModalHandler()}>Go To Cart</GoToCartBtn></Link>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    modalProduct: state.modalProduct,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModalHandler: () => dispatch(actionCreators.closeModalHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);