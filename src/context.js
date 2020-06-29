import React, { Component } from 'react';

// import { storeProducts, detailProduct } from './data';
const ProductsContext = React.createContext();

class ProductsProvider extends Component {
  state = {
    updateInventory: '',
    isLoading: false,
    file: '',
    previewUrl: '',
    signedIn: false,
    userId: '',
    productForUpdating: {},
    tokenExpirationDate: '',
    name: '',
    token: '',
    products: '',
    detailProduct: '',
    cart: [],
    showModal: false,
    modalType: '',
    modalProduct: '',
    error: '',
    showErrorModal: false,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  }
  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    // let prod = [];
    // storeProducts.forEach(item => {
    //   const singleItem = { ...item };
    //   prod = [...prod, singleItem];
    // });
    // this.setState(() => {
    //   return { products: prod }
    // });

    const getData = async () => {
      try {
        this.setState({ isLoading: true });
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        let prod = [];
        responseData.products.forEach(el => {
          const product = { ...el, count: 0, total: 0 };
          prod = [...prod, product];
        });
        this.setState(() => {
          return { products: prod }
        });

      } catch (error) {
        this.setErrorHandler(error);
        this.toggleErrorModalHandler();
      }

      this.setState({ isLoading: false });
    }
    getData();
  }

  updateInventory = () => {
    let updateInventory = [];
    this.state.cart.forEach(el => {
      updateInventory.push({ id: el.id, newInventory: el.inventory - el.count });
    })
    this.setState({ updateInventory: updateInventory })
  }

  updateBackendInventory = async () => {
    let newObj = [...this.state.updateInventory];
    // newObj = newObj.map(el => el.)
    try {
      this.setState({ isLoading: true });
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/update-many`, {
        method: 'PATCH',
        body: JSON.stringify({
          newObj
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      this.setErrorHandler(error);
      this.toggleErrorModalHandler();
    }

    this.setState({ isLoading: false });
    this.setProducts();
  }

  handleDetail = (id) => {
    const product = this.state.products.find(el => el.id === id);
    this.setState(() => {
      return { detailProduct: product };
    });
  }

  addToCart = (id) => {
    let cartArr = [];
    let copyProducts = [...this.state.products];

    copyProducts = copyProducts.map(el => {
      if (el.id === id && el.count < el.inventory) {
        el.count += 1;
        el.inCart = true;
        el.total = el.price * el.count;
        cartArr.push(el);
      }
      return el;
    });


    this.setState(() => {
      return { products: copyProducts, cart: [...this.state.cart, ...cartArr] };
    },
      () => this.compileTotalValuesHandler()
    );
  }

  toggleSignedInHandler = (person, expirationDate) => {
    // person.userId   person.token
    if (person) {
      //1hr
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      // const firstName = person.firstName ||

      localStorage.setItem('userData', JSON.stringify({ userId: person.userId, token: person.token, expiration: tokenExpirationDate.toISOString(), firstName: person.firstName }))

      this.setState(() => {
        return { userId: person.userId, signedIn: true, name: person.firstName, token: person.token, tokenExpirationDate: tokenExpirationDate }
      })
      // userInfo: person,
      //userInfo: {},
    } else {

      this.setState(() => {
        return { userId: '', firstName: '', signedIn: false, name: '', token: '', tokenExpirationDate: '' }
      }, () => {
        localStorage.removeItem('userData');
      })
    }
  }

  setProductForUpdatingHandler = (obj) => {
    this.setState(() => {
      return { productForUpdating: obj };
    })
  }

  openModalHandler = (type, id) => {
    // productCard updateAccount updateProduct createProduct deleteAccount deleteProduct
    if (id) {
      const product = this.state.products.find(el => el.id === id);
      this.setState(() => {
        return { modalProduct: product, showModal: true, modalType: type }
      })
    } else {
      this.setState(() => {
        return { showModal: true, modalType: type }
      })
    }
  }

  closeModalHandler = () => {
    this.setState({ showModal: false });
  }

  setErrorHandler = (message) => {
    this.setState(() => {
      return { error: message }
    })
  }

  toggleErrorModalHandler = () => {
    this.setState((prevState) => {
      return { showErrorModal: !prevState.showErrorModal }
    });

    setTimeout(() => {
      this.setState((prevState) => {
        return { showErrorModal: !prevState.showErrorModal }
      });
    }, 3000);
  }

  increment = (id) => {
    const copyProducts = [...this.state.products].map(el => {
      if (el.id === id && el.count < el.inventory) {
        el.count += 1;
        el.total = el.count * el.price;
      }
      return el;
    });

    this.setState(() => {
      return { product: copyProducts };
    }, () => this.compileTotalValuesHandler())
  }

  decrement = (id) => {
    const copyProducts = [...this.state.products].map(el => {
      if (el.id === id && el.count !== 1) {
        el.count -= 1;
        el.total = el.count * el.price;
      }
      return el;
    });

    this.setState(() => {
      return { product: copyProducts };
    }, () => this.compileTotalValuesHandler());
  }

  removeItem = (id) => {
    const copyProducts = [...this.state.products].map(el => {
      if (el.id === id) {
        el.count = 0;
        el.total = 0;
        el.inCart = false
      }
      return el;
    });

    const copyCart = [...this.state.cart].filter(el => el.id !== id);

    this.setState(() => {
      return { product: copyProducts, cart: copyCart };
    }, () => this.compileTotalValuesHandler())
  }

  clearCart = () => {
    const copyProducts = [...this.state.products].map(el => {
      el.count = 0;
      el.total = 0;
      el.inCart = false
      return el;
    });

    this.setState(() => {
      return { products: copyProducts, cart: [] };
    }, () => this.compileTotalValuesHandler())
  }

  compileTotalValuesHandler = () => {
    let subTotal = [...this.state.cart];

    subTotal = subTotal.reduce((acc, cur) => {
      return acc + cur.total;
    }, 0);

    let tax = subTotal * .07;

    let cartTotal = subTotal + tax;


    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: cartTotal
      };
    }, () => this.updateInventory())
  }

  validationHandler = (event, itemId, form) => {
    /* Validation */
    const checkValidity = (value, validation, pattern) => {
      let isValid = true;
      if (validation.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
      }
      if (pattern) {
        isValid = value.search(pattern) > -1;
      }
      return isValid;
    }

    /* FileReader */
    const fileReaderHandler = (file) => {
      this.setState({ file: file });

      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.setState({ previewUrl: fileReader.result })
      };
      fileReader.readAsDataURL(file);
    }

    /* Validation */
    const { value } = event.target;

    let copyForm = [...form];

    copyForm = copyForm.map((el, i) => {
      if (i === itemId) {
        if (el.attributes.type === 'file') {
          fileReaderHandler(event.target.files[0]);
        }

        el.value = value;
        el.valid = checkValidity(el.value, el.validation, el.pattern);
        el.touched = true;
      }
      return el;
    });

    let formIsValid = true;
    formIsValid = form.every(el => el.valid && formIsValid);

    return { copyForm, formIsValid };
  }

  resetFileHandler = () => {
    this.setState(() => {
      return { file: '', previewUrl: '' }
    })
  }

  render() {
    return (
      <ProductsContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        toggleSignedInHandler: this.toggleSignedInHandler,
        setProductForUpdatingHandler: this.setProductForUpdatingHandler,
        openModalHandler: this.openModalHandler,
        closeModalHandler: this.closeModalHandler,
        setErrorHandler: this.setErrorHandler,
        toggleErrorModalHandler: this.toggleErrorModalHandler,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart,
        validationHandler: this.validationHandler,
        resetFileHandler: this.resetFileHandler,
        updateBackendInventory: this.updateBackendInventory
      }}>
        {this.props.children}
      </ProductsContext.Provider>
    )
  }
}

const ProductsConsumer = ProductsContext.Consumer;

export { ProductsProvider, ProductsConsumer, ProductsContext };