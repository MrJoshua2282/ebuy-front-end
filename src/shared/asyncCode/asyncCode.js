// import React, { useState, useContext } from 'react';


// import { ProductsContext } from '../../context';


// const context = useContext(ProductsContext);
// export const getAllProductsByUserId = async () => {
//   try {
//     setIsLoading(true);
//     const response = await fetch(`http://localhost:5000/api/products/user-products/5ef0b451b1de182ef13efb78
//     `, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })

//     const responseData = await response.json();

//     if (!response.ok) {
//       throw new Error(responseData.message);
//     }

//     setLoadedProducts(responseData.products);

//   } catch (error) {
//     context.setErrorHandler(error);
//     context.toggleErrorModalHandler();
//   }

//   setIsLoading(false);
// };