import React, { Component } from 'react';

import './GlobalModal.css';
import UpdatedAccountInfo from './UpdateAccountInfo';
import UpdateProductInfo from './UpdateProductInfo';
import CreateProduct from './CreateProduct';
import ProductCard from './ProductCard';
import { ProductsContext } from '../../context';

class Modal extends Component {
  static contextType = ProductsContext;

  render() {
    const { showModal, modalType, closeModalHandler } = this.context;
    return (
      <React.Fragment>
        {showModal && <div className='modal-background' onClick={
          () => closeModalHandler()}>&#32;</div>}
        {showModal &&
          < div className='modal-card' >
            {modalType === 'productCard' && <ProductCard />}
            {modalType === 'updateAccount' && <UpdatedAccountInfo />}
            {modalType === 'updateProduct' && <UpdateProductInfo />}
            {modalType === 'createProduct' && <CreateProduct />}
          </div >}
      </React.Fragment>
    )
  }
}
export default Modal;