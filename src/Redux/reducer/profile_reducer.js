
import {
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAILURE,
  } from '../actions/actions_profile';
  
  const initialState = {
    userData: null,
    loading: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case GET_USER_PROFILE_SUCCESS:
        return {
          ...state,
          userData: action.userData,
          loading: false,
          error: null,
        };
  
      case GET_USER_PROFILE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
  
      default:
        return state;
    }
  };
  
  export default profileReducer;
  