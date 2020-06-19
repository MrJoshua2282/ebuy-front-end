import React, { useContext, useEffect } from 'react';

import './Account.css';
import Title from '../Title/Title';
import { ProductsContext } from '../../context';
import { TabBtn } from '../../shared/Btn/Btns';

const Account = () => {
  const context = useContext(ProductsContext);
  const { modalType, openModalHandler } = context;
  useEffect(() => {
    console.log(context)
    console.log(modalType)
  })
  return (
    <React.Fragment>
      <Title title='Account' />
      <Title title='users name' />
      <div className='account-btn-div'>
        <TabBtn className='btn_info' onClick={() => openModalHandler('updateAccount')}>update info</TabBtn>
        <br />
        <TabBtn className='btn_product' onClick={() => openModalHandler('createProduct')}>create item</TabBtn>
      </div>
      <div>
        <img src="" alt="product" className="account-product-img" />
        <span className="account-title">Title</span>
        <span className="account-price">$Price</span>
        <span className="account-company">Company</span>
        <span className="account-inventory">inventory</span>
      </div>
      <span>list</span>
    </React.Fragment>
  )
}

export default Account;