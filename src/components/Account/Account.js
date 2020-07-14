import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Account.css';
import Title from '../../shared/Title/Title';
import AccProdList from './AccProdList';
import { TabBtn } from '../../shared/Btn/Btns';
import * as actionCreators from '../../store/actionCreators';

class Account extends Component {
  render() {
    return (
      <React.Fragment>
        <Title title='Account' />
        <Title title={`${this.props.name}`} />
        <div className='account-btn-div'>
          <TabBtn className='btn_product' onClick={() => this.props.openModalHandler('createProduct')}>create item</TabBtn>
          <br />
          <TabBtn className='btn_info' onClick={() => this.props.openModalHandler('updateAccount')}>update info</TabBtn>
          <br />
          <TabBtn className='btn_delete' onClick={() => this.props.openModalHandler('deleteAccount')}>delete account</TabBtn>
        </div>
        <div className='account-header'>
          <div>YOUR PRODUCTS</div>
          <div>NAME OF PRODUCT</div>
          <div>PRICE</div>
          <div>COMPANY</div>
          <div>INVENTORY</div>
        </div>
        <AccProdList />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: state.name,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModalHandler: (word) => dispatch(actionCreators.openModalHandler(word))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account);