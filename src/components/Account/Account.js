import React, { useContext } from 'react';

import './Account.css';
import Title from '../../shared/Title/Title';
import AccProdList from './AccProdList';
import { ProductsContext } from '../../context';
import { TabBtn } from '../../shared/Btn/Btns';

const Account = () => {

  const context = useContext(ProductsContext);
  const { openModalHandler, userInfo } = context;

  return (
    <React.Fragment>
      <Title title='Account' />
      {/* <Title title={`${userInfo.user.firstName}`} /> */}
      <Title title={`Update me later in account`} />
      <div className='account-btn-div'>
        <TabBtn className='btn_product' onClick={() => openModalHandler('createProduct')}>create item</TabBtn>
        <br />
        <TabBtn className='btn_info' onClick={() => openModalHandler('updateAccount')}>update info</TabBtn>
        <br />
        <TabBtn className='btn_delete' onClick={() => openModalHandler('deleteAccount')}>delete account</TabBtn>
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

export default Account;