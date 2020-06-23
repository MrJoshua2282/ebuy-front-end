import React, { Component } from 'react';

import './GlobalModal.css';
import UpdatedAccountInfo from './UpdateAccountInfo';
import UpdateProduct from './UpdateProduct';
import CreateProduct from './CreateProduct';
import ProductCard from './ProductCard';
import DeleteAccount from './DeleteAccount';
import DeleteProduct from './DeleteProduct';
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
            {modalType === 'updateProduct' && <UpdateProduct />}
            {modalType === 'createProduct' && <CreateProduct />}
            {modalType === 'deleteAccount' && <DeleteAccount />}
            {modalType === 'deleteProduct' && <DeleteProduct />}
          </div >}
      </React.Fragment>
    )
  }
}
export default Modal;