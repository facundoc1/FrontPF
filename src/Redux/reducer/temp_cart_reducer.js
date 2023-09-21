
import { ADD_TO_TEMP_CART, REMOVE_FROM_TEMP_CART, CLEAR_TEMP_CART, UPDATE_TEMP_CART } from '../actions/actions_temp_cart'; 

const initialState = {
  cartItems: [],
};

const tempCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_TEMP_CART: 
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_TEMP_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case CLEAR_TEMP_CART: 
      return {
        ...state,
        cartItems: [],
      };
      case UPDATE_TEMP_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
  
};

export default tempCartReducer;
