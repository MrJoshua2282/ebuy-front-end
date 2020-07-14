import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './AccProdList.css';
import Spinner from '../../shared/Spinner/Spinner';
import TrashIcon from '../../images/trash';
import { ReturnBtn } from '../../shared/Btn/Btns';
import * as actionCreators from '../../store/actionCreators';

const AccProdList = () => {
  const store = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.getUserProducts(store.userId));
  }, [actionCreators.getUserProducts]);

  let list;
  if (store.setUserProducts) {
    list = store.setUserProducts.map((el, i) => {
      return (
        <form key={i}>
          <div className='account-header'>
            <img style={{ height: '5rem' }} src={`${process.env.REACT_APP_ASSET_URL}/${el.image}`} alt="product" className="account-product-img" />
            <span className="account-title">{el.title}</span>
            <span className="account-price">$ {el.price}</span>
            <span className="account-company">{el.company}</span>
            <span className="account-inventory">{el.inventory}</span>
            <ReturnBtn onClick={(e) => {
              e.preventDefault();
              dispatch(actionCreators.setProductForUpdatingHandler(el));
              dispatch(actionCreators.openModalHandler('updateProduct'));
            }}>Update Item</ReturnBtn>
            <TrashIcon onClick={(e) => {
              e.preventDefault();
              dispatch(actionCreators.setProductForUpdatingHandler(el))
              dispatch(actionCreators.openModalHandler('deleteProduct'));
            }} fill='rgb(108, 196, 255)' style={{ 'cursor': 'pointer' }} />
          </div>
          <div className='account-description'>{el.description}</div>
        </form>
      )
    })
  }
  return (
    <React.Fragment>
      {store.isLoading ? <Spinner /> : list}
    </React.Fragment>
  )
}
// useEffect(() => {
//   const getData = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/user-products/${userId}
//       `, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.message);
//       }

//       setLoadedProducts(responseData.products);

//     } catch (error) {
//       setErrorHandler(error);
//       toggleErrorModalHandler();
//     }

//     setIsLoading(false);
//   };
//   getData();
// }, [userId, setErrorHandler, toggleErrorModalHandler]);

export default AccProdList;