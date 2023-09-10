export const SET_PRODUCT_DETAIL = 'SET_PRODUCT_DETAIL';
export const CLEAR_PRODUCT_DETAIL = 'CLEAR_PRODUCT_DETAIL';


const initialState = {
  product: null, 
  loading: false, 
  error: null, 
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.payload.product,
        loading: false,
        error: null,
      };
    case CLEAR_PRODUCT_DETAIL:
      return {
        ...state,
        product: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default detailReducer;
