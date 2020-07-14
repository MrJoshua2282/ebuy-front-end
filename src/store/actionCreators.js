import * as actionTypes from './actionTypes';

export const handleDetail = (id) => {
  return {
    type: actionTypes.HANDLE_DETAIL,
    id: id
  }
}

export const compileTotalValuesHandler = () => {
  return {
    type: actionTypes.COMPILE_TOTAL_VALUES_HANDLER
  }
}

export const plusCart = (id) => {
  return {
    type: actionTypes.ADD_TO_CART,
    id: id
  }
}

export const addToCart = (id) => {
  return dispatch => {
    dispatch(plusCart(id));
    dispatch(compileTotalValuesHandler())
  }
}

export const minusCart = (id) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: id
  }
}

export const removeItem = (id) => {
  return dispatch => {
    dispatch(minusCart(id));
    dispatch(compileTotalValuesHandler());
  }
}

export const signInHandler = (person, expirationDate) => {
  return {
    type: actionTypes.SIGN_IN_HANDLER,
    person,
    expirationDate
  }
}

export const signOutHandler = () => {
  return {
    type: actionTypes.SIGN_OUT_HANDLER
  }
}

export const setProductForUpdatingHandler = (obj) => {
  return {
    type: actionTypes.SET_PRODUCT_FOR_UPDATING_HANDLER,
    obj: obj
  }
}

export const openModalHandler = (word, id) => {
  return {
    type: actionTypes.OPEN_MODAL_HANDLER,
    word: word,
    id: id
  }
}

export const closeModalHandler = () => {
  return { type: actionTypes.CLOSE_MODAL_HANDLER }
}

export const setErrorHandler = (message) => {
  return {
    type: actionTypes.SET_ERROR_HANDLER,
    message: message
  }
}

export const errorModalToggle = () => {
  return {
    type: actionTypes.TOGGLE_ERROR_MODAL_HANDLER
  }
}

export const toggleErrorModalHandler = () => {
  return dispatch => {
    dispatch(errorModalToggle());
    setTimeout(() => {
      dispatch(errorModalToggle());
    }, 3000);
  }
}

export const plusOne = (id) => {
  return {
    type: actionTypes.INCREMENT,
    id: id
  }
}

export const increment = (id) => {
  return dispatch => {
    dispatch(plusOne(id));
    dispatch(compileTotalValuesHandler());
  }
}

export const minusOne = (id) => {
  return {
    type: actionTypes.DECREMENT,
    id: id
  }
}

export const decrement = (id) => {
  return dispatch => {
    dispatch(minusOne(id));
    dispatch(compileTotalValuesHandler());
  }
}

export const clearCart = () => {
  return { type: actionTypes.CLEAR_CART }
}

export const toggleLoadingState = () => {
  return {
    type: actionTypes.TOGGLE_LOADING_STATE
  }
}

export const getData = (products) => {
  return {
    type: actionTypes.SET_PRODUCTS,
    products: products
  }
}

export const setProducts = () => {
  return dispatch => {
    dispatch(toggleLoadingState());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      let responseData = response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      return responseData;
    })
      .then(responseData => {

        let products = responseData.products.map(el => {
          el = { ...el, count: 0, total: 0 };
          return el;
        });

        dispatch(getData(products));

      }).catch(error => {
        dispatch(setErrorHandler(error));
        dispatch(toggleErrorModalHandler());
      })
    dispatch(toggleLoadingState());
  }
}

export const updateBackendInventory = () => {
  return (dispatch) => {
    let newObj = [...this.state.updateInventory];
    dispatch(toggleLoadingState());
    fetch(`${process.env.REACT_APP_BACKEND_URL}/products/update-many`, {
      method: 'PATCH',
      body: JSON.stringify({
        newObj
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const responseData = response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      dispatch(setProducts());
    }).catch(error => {
      dispatch(setErrorHandler(error));
      dispatch(toggleErrorModalHandler());
    })
    dispatch(toggleLoadingState());
  }
}

export const login = (email, password, history, resetForm) => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoadingState());
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // JSON.stringify() takes js objects/arrays and converts them to json
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      dispatch(signInHandler(responseData));

      setTimeout(() => {
        history.push('/');
      }, 250);

      resetForm();

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }
    dispatch(toggleLoadingState());
  }
}

export const signupHandler = (body, history, resetForm) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // JSON.stringify() takes js objects/arrays and converts them to json
          body: JSON.stringify({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password
          })
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      dispatch(signInHandler(responseData));

      setTimeout(() => {
        history.push('/');
      }, 250);

      resetForm();

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }
    dispatch(toggleLoadingState());
  }
}

export const updateAccount = (body, token, resetForm) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/update-user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
        body: JSON.stringify({
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          newPassword: body.newPassword,
        })
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      resetForm();

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }

    dispatch(toggleLoadingState());
  }
}

export const deleteAccount = (body, token, resetForm, history) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/delete-user/5ef49b1425cc0971d99c9e42`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // JSON.stringify() takes js objects/arrays and converts them to json
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        })
      })

      resetForm();
      setTimeout(() => {
        history.replace('/');
      }, 250);
      dispatch(signOutHandler());
      dispatch(closeModalHandler());

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());

    }
    dispatch(toggleLoadingState());
  }
}

export const createProduct = (body, headers, resetForm, resetFile) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
        method: 'POST',
        body,
        headers
      })

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      resetForm();
      resetFile();

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }
    dispatch(toggleLoadingState());
  }
}

export const setUserProducts = (products) => {
  return {
    type: actionTypes.SET_USER_PRODUCTS,
    products
  }
}

export const getUserProducts = (userId) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/user-products/${userId}
          `, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json();

      if (!response.ok) throw new Error(responseData.message);

      dispatch(setUserProducts(responseData.products))

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }
    dispatch(toggleLoadingState());
  }
};

export const updateProduct = (body, token, productForUpdatingId, resetFile) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productForUpdatingId}`, {
        method: 'PATCH',
        body,
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      resetFile()
      dispatch(closeModalHandler());

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }
    dispatch(toggleLoadingState());
  }
}

export const deleteProduct = (token, productForUpdatingId) => {
  return async dispatch => {
    try {
      dispatch(toggleLoadingState());
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${productForUpdatingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      });

      dispatch(closeModalHandler());
      // using errorModal to send a message, not actually an error
      dispatch(setErrorHandler('Successfully deleted item'));
      dispatch(toggleErrorModalHandler());

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      dispatch(setErrorHandler(error || 'Something went wrong, please try again'));
      dispatch(toggleErrorModalHandler());
    }
    dispatch(toggleLoadingState());
  }
}