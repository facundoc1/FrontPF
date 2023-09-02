import { ADD_PRODUCT, REMOVE_PRODUCT, FILTER_PRODUCTS } from '../actions/productActions';

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
    default:
      return state;
  }
}

export default productReducer;
