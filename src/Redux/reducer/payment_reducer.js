
import {
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  GET_PAYMENT_DETAILS_SUCCESS,
  GET_PAYMENT_DETAILS_FAILURE
} from '../actions/actions_payment'; 

const initialState = {
  status: 'pending', 
  paymentId: null,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_SUCCESS:
      return {
        ...state,
        status: 'paid', 
        paymentId: action.payload.paymentId, 
        error: null, 
      };
    case PAYMENT_FAILURE:
      return {
        ...state,
        status: 'error', 
        error: action.payload, 
      };
    case GET_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
      };
    case GET_PAYMENT_DETAILS_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default paymentReducer;
