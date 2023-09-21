import {
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS_FAILURE,
} from '../actions/actions'; 

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        product: action.payload.product,
        loading: false,
        error: null,
      };
    case GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    // Puedes agregar más casos de acciones aquí si es necesario

    default:
      return state;
  }
};

export default detailReducer;