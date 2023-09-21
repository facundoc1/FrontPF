export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (user, accessToken, refreshToken) => ({
    type: 'LOGIN_SUCCESS',
    payload: { user, accessToken, refreshToken },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const clearAccessToken = () => {
    localStorage.removeItem('accessToken');
  };
  
  export const clearRefreshToken = () => {
    localStorage.removeItem('refreshToken');
  };