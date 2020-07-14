import * as actionTypes from './actionTypes';

const initialState = {
  updateInventory: '',
  isLoading: false,
  // file: '',
  // previewUrl: '',
  signedIn: false,
  userId: '',
  productForUpdating: {},
  tokenExpirationDate: '',
  name: '',
  token: '',
  products: [],
  detailProduct: '',
  cart: [],
  showModal: false,
  modalType: '',
  modalProduct: '',
  error: '',
  showErrorModal: false,
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0,
  resetLoginForm: false,
  setUserProducts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_DETAIL:
      const product = state.products.find(el => el.id === action.id);
      return {
        ...state,
        detailProduct: product
      };
    case actionTypes.ADD_TO_CART:
      let cartArr = [];
      let copyProducts = [...state.products];

      copyProducts = copyProducts.map(el => {
        if (el.id === action.id && el.count < el.inventory) {
          el = { ...el };
          el.count += 1;
          el.inCart = true;
          el.total = el.price * el.count;
          cartArr.push(el);
        }
        return el;
      });

      return {
        ...state,
        products: copyProducts,
        cart: [...state.cart, ...cartArr]
      };
    case actionTypes.REMOVE_ITEM:
      const copyPr = [...state.products].map(el => {
        if (el.id === action.id) {
          el.count = 0;
          el.total = 0;
          el.inCart = false
        }
        return el;
      });

      let copyCrt = [...state.cart].filter(el => el.id !== action.id);

      return {
        ...state,
        products: copyPr,
        cart: copyCrt,
      };
    case actionTypes.SIGN_IN_HANDLER:
      if (!action.person) return;
      //1hr
      const tokenExpirationDate = action.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

      localStorage.setItem('userData', JSON.stringify({ userId: action.person.userId, token: action.person.token, expiration: tokenExpirationDate.toISOString(), firstName: action.person.firstName }));

      return {
        ...state,
        userId: action.person.userId,
        signedIn: true,
        name: action.person.firstName,
        token: action.person.token,
        tokenExpirationDate: tokenExpirationDate
      };
    case actionTypes.SIGN_OUT_HANDLER: {
      localStorage.removeItem('userData');

      return {
        ...state,
        userId: '',
        firstName: '',
        signedIn: false,
        name: '',
        token: '',
        tokenExpirationDate: '',
        setUserProducts: []
      }
    }
    case actionTypes.SET_PRODUCT_FOR_UPDATING_HANDLER:
      return {
        ...state,
        productForUpdating: action.obj
      };
    case actionTypes.OPEN_MODAL_HANDLER:
      // productCard updateAccount updateProduct createProduct deleteAccount deleteProduct
      if (action.id) {
        const product = [...state.products].find(el => el.id === action.id);
        return {
          ...state,
          modalProduct: product,
          showModal: true,
          modalType: action.word
        }
      } else {
        return {
          ...state,
          showModal: true,
          modalType: action.word
        }
      }
    case actionTypes.CLOSE_MODAL_HANDLER:
      return {
        ...state,
        showModal: false
      };
    case actionTypes.SET_ERROR_HANDLER:
      return {
        ...state,
        error: action.message
      };
    case actionTypes.TOGGLE_ERROR_MODAL_HANDLER:
      return {
        ...state,
        showErrorModal: !state.showErrorModal
      };
    case actionTypes.INCREMENT:
      let copProducts = [...state.products];
      copProducts = copProducts.map(el => {
        if (el.id === action.id && el.count < el.inventory) {
          el = { ...el };
          el.count += 1;
          el.total = el.count * el.price;
        }
        return el;
      });

      return {
        ...state,
        products: copProducts,
        cart: [...copProducts].filter(el => el.inCart)
      };
    case actionTypes.DECREMENT:
      let copyProd = [...state.products];
      copyProd = copyProd.map(el => {
        if (el.id === action.id && el.count !== 1) {
          el = { ...el };
          el.count -= 1;
          el.total = el.count * el.price;
        }
        return el;
      });

      return {
        ...state,
        products: copyProd,
        cart: [...copyProd].filter(el => el.inCart)
      };
    case actionTypes.CLEAR_CART:
      const copyProducs = [...state.products].map(el => {
        el.count = 0;
        el.total = 0;
        el.inCart = false
        return el;
      });

      return {
        ...state,
        products: copyProducs,
        cart: [],
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        updateInventory: ''
      };
    case actionTypes.COMPILE_TOTAL_VALUES_HANDLER:
      const updatedProd = [...state.products];
      let subTotal = [...updatedProd].filter(el => el.inCart);

      subTotal = subTotal.reduce((acc, cur) => {
        return acc + cur.total;
      }, 0);

      let tax = subTotal * .07;
      let cartTotal = subTotal + tax;

      let updateInventory = [];
      state.cart.forEach(el => {
        updateInventory.push({ id: el.id, newInventory: el.inventory - el.count });
      });

      return {
        ...state,
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: cartTotal,
        updateInventory: updateInventory
      };
    case actionTypes.UPDATE_BACKEND_INVENTORY:
      return {
        ...state,
      }
    case actionTypes.TOGGLE_LOADING_STATE:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.products
      }
    case actionTypes.SET_USER_PRODUCTS:
      return {
        ...state,
        setUserProducts: action.products
      }
    default:
      return state;
  }
};

export default reducer;