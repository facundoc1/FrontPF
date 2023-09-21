
import {
    RENEW_TOKEN_REQUEST,
    RENEW_TOKEN_SUCCESS,
    RENEW_TOKEN_FAILURE,
  } from '../actions/actions_auth';
  
  const initialState = {
    accessToken: null,
    loading: false, 
    error: null, 
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case RENEW_TOKEN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case RENEW_TOKEN_SUCCESS:
        return {
          ...state,
          accessToken: action.accessToken,
          loading: false,
          error: null,
        };
  
      case RENEW_TOKEN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
  
      default:
        return state;
    }
  };
  
  export default authReducer;