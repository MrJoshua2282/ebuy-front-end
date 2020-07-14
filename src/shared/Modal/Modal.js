import React, { Component } from 'react';
import { connect } from 'react-redux';

import './GlobalModal.css';
import UpdatedAccountInfo from './UpdateAccountInfo';
import UpdateProduct from './UpdateProduct';
import CreateProduct from './CreateProduct';
import ProductCard from './ProductCard';
import DeleteAccount from './DeleteAccount';
import DeleteProduct from './DeleteProduct';
import * as actionCreators from '../../store/actionCreators';

class Modal extends Component {

  render() {
    return (
      <React.Fragment>
        {this.props.showModal && <div className='modal-background' onClick={
          () => this.props.closeModalHandler()}>&#32;</div>}
        {this.props.showModal &&
          < div className='modal-card' >
            {this.props.modalType === 'productCard' && <ProductCard />}
            {this.props.modalType === 'updateAccount' && <UpdatedAccountInfo />}
            {this.props.modalType === 'updateProduct' && <UpdateProduct />}
            {this.props.modalType === 'createProduct' && <CreateProduct />}
            {this.props.modalType === 'deleteAccount' && <DeleteAccount />}
            {this.props.modalType === 'deleteProduct' && <DeleteProduct />}
          </div >}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    showModal: state.showModal,
    modalType: state.modalType,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModalHandler: () => dispatch(actionCreators.closeModalHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);