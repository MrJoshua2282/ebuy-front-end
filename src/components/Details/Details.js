import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Details.css';
import Title from '../../shared/Title/Title';
import { ReturnBtn, GoToCartBtn } from '../../shared/Btn/Btns';
import * as actionCreators from '../../store/actionCreators';

class Details extends Component {
  render() {
    const { id, company, image, description, price, title, inCart } = this.props.detailProduct;
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
                this.props.addToCart(id);
              }} disabled={inCart ? true : false} >{inCart ? 'In Cart' : 'Add To Cart'} </GoToCartBtn>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    detailProduct: state.detailProduct,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id) => dispatch(actionCreators.addToCart(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);