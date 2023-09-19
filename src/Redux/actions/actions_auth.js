import axios from "axios";
import jwt_decode from 'jwt-decode';

export const RENEW_TOKEN_REQUEST = 'RENEW_TOKEN_REQUEST';
export const RENEW_TOKEN_SUCCESS = 'RENEW_TOKEN_SUCCESS';
export const RENEW_TOKEN_FAILURE = 'RENEW_TOKEN_FAILURE';

export const renewTokenRequest = () => ({
  type: RENEW_TOKEN_REQUEST,
});

export const renewTokenSuccess = (accessToken) => ({
  type: RENEW_TOKEN_SUCCESS,
  accessToken,
});

export const renewTokenFailure = (error) => ({
  type: RENEW_TOKEN_FAILURE,
  error,
});

export const renewToken = (refreshToken) => async (dispatch) => {
  dispatch(renewTokenRequest());
  try {
    const response = await axios.post('/renew-token', { refreshToken });
    const newAccessToken = response.data.newAccessToken;
  
    dispatch(renewTokenSuccess(newAccessToken));
    setAccessToken(newAccessToken);
  } catch (error) {
    dispatch(renewTokenFailure(error));
  }
};


export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setRefreshToken = (token) => {
    localStorage.setItem('refreshToken', token);
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };
  
   export const getUserIdFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwt_decode(token); 
      return decodedToken.userId;
    }
    return null; 
  };
