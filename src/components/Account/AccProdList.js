import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AccProdList.css';

// import AccProdItem from './AccProdItem';
import Spinner from '../../shared/Spinner/Spinner';
import TrashIcon from '../../images/trash';
import { ReturnBtn } from '../../shared/Btn/Btns';
import { ProductsContext } from '../../context';

export default function AccProdList() {
  const userId = useParams().userId;
  const [isLoading, setIsLoading] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState(false);
  const context = useContext(ProductsContext);
  const { setErrorHandler, toggleErrorModalHandler } = context;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/user-products/5ef3b36bc4b73866e6a53e6a
        `, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedProducts(responseData.products);

        // console.log(responseData.products.id)

      } catch (error) {
        setErrorHandler(error);
        toggleErrorModalHandler();
      }

      setIsLoading(false);
    };
    getData();
  }, [userId, setErrorHandler, toggleErrorModalHandler]);

  let list;
  if (loadedProducts) {
    list = loadedProducts.map((el, i) => {
      return (
        <form key={i}>
          <div className='account-header'>
            <img style={{ width: '5rem', height: '5rem' }} src={`http://localhost:5000/${el.image}`} alt="product" className="account-product-img" />
            <span className="account-title">{el.title}</span>
            <span className="account-price">$ {el.price}</span>
            <span className="account-company">{el.company}</span>
            <span className="account-inventory">{el.inventory}</span>
            <ReturnBtn onClick={(e) => {
              e.preventDefault();
              context.setProductForUpdatingHandler(el)
              context.openModalHandler('updateProduct');
            }}>Update Item</ReturnBtn>
            <TrashIcon onClick={(e) => {
              e.preventDefault();
              context.setProductForUpdatingHandler(el)
              context.openModalHandler('deleteProduct');
            }} fill='rgb(108, 196, 255)' style={{ 'cursor': 'pointer' }} />
          </div>
          <div className='account-description'>{el.description}</div>
        </form>
      )
    })
  }
  return (
    <React.Fragment>
      {isLoading ? <Spinner /> : list}
    </React.Fragment>
  )
}
