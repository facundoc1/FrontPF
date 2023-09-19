import { ADD_PRODUCT, REMOVE_PRODUCT, FILTER_PRODUCTS, PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE, SET_FILTERED_PRODUCTS } from '../actions/actions';

const initialState = {
  products: [],
  filteredProducts: [],
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.productId),
      };
    case FILTER_PRODUCTS:
      const { filter } = action.payload;
      const filteredProducts = state.products.filter(product => {
        return product.name.includes(filter);
      });
      return {
        ...state,
        filteredProducts,
      };
    case PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        products: [],
        error: action.payload,
      };
      case SET_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.filteredProducts,
      };

    default:
      return state;
  }
}

export default productReducer;
