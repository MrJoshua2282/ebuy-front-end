import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './Account.css';
import Title from '../../shared/Title/Title';
import Spinner from '../../shared/Spinner/Spinner';
import AccProdList from './AccProdList';
import { ProductsContext } from '../../context';
import { TabBtn } from '../../shared/Btn/Btns';

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState(false);
  const context = useContext(ProductsContext);
  const { modalType, openModalHandler, userInfo, setErrorHandler, toggleErrorModalHandler } = context;

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