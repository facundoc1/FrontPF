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

   export const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    console.log('desde actions', token)
    if (token) {
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
  
    return {};
  };

  export const verificarTokenEnRuta = async () => {
    try {
      const token = getAccessToken();
      
      if (!token) {
        throw new Error('Token de acceso no encontrado');
      }
  
      const response = await axios.post('/verify-token', null, { headers: { 'Authorization': `Bearer ${token}` } });
      console.log('Token verificado con éxito', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      throw error;
    }
  };
  export const getUserProfileFromToken = (token = null) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!token) {
          token = localStorage.getItem('accessToken');
          if (!token) {
            resolve(null);
            return;
          }
        }
  
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
  
        const response = await axios.get(`/users/${userId}`);
        const userData = response.data;
  
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  };
  