
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions/actions';

const initialState = {
  isLoading: false, 
  error: null, 
  userData: null, 
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        userData: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        userData: action.payload, 
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error, 
        userData: null,
      };
    default:
      return state;
  }
};

export default registerReducer;
