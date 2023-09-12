import { LOGIN_USER, LOGOUT_USER, SET_AUTHENTICATED_USER } from '../actions/actions';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SET_AUTHENTICATED_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
