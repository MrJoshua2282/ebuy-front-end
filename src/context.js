import React, { Component } from 'react';

import { storeProducts, detailProduct } from './data';
const ProductsContext = React.createContext();

class ProductsProvider extends Component {
  state = {
    signedIn: false,
    userInfo: {},
    productForUpdating: {},
    tokenExpirationDate: '',
    name: '',
    token: '',
    products: [...storeProducts],
    detailProduct: detailProduct,
    cart: [],
    showModal: false,
    modalType: '',
    modalProduct: detailProduct,
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
    let prod = [];
    storeProducts.forEach(item => {
      const singItem = { ...item };
      prod = [...prod, singItem];
    });
    this.setState(() => {
      return { products: prod }
    });
  }

  // details page
  handleDetail = (id) => {
    const product = this.state.products.find(el => el.id === id);
    this.setState(() => {
      return { detailProduct: product };
    });
  }
  // add to cart
  addToCart = (id) => {
    let cartArr = [];
    let copyProducts = [...this.state.products]
      .map(el => {
        if (el.id === id) {
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
      // () => console.log(this.state.cart)
      () => this.compileTotalValuesHandler()
    );
  }

  toggleSignedInHandler = (person, expirationDate) => {
    // person.userId   person.token
    if (person) {
      //1hr
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)

      localStorage.setItem('userData', JSON.stringify({ userId: person.userId, token: person.token, expiration: tokenExpirationDate.toISOString() }))

      this.setState(() => {
        return { signedIn: true, userInfo: person, name: person.firstName, token: person.token, tokenExpirationDate: tokenExpirationDate }
      })

    } else {

      this.setState(() => {
        return { signedIn: false, userInfo: {}, name: '', token: '', tokenExpirationDate: '' }
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
      if (el.id === id) {
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

  // remove all items with this id
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
    let subTotal = [...this.state.products]
      .reduce((acc, cur) => {
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
        clearCart: this.clearCart
      }}>
        {this.props.children}
      </ProductsContext.Provider>
    )
  }
}

const ProductsConsumer = ProductsContext.Consumer;

export { ProductsProvider, ProductsConsumer, ProductsContext };