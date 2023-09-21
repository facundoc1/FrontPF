export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const loginSuccess = (userData) => {
  const isAuthenticated = true;

  return {
    type: LOGIN_SUCCESS,
    payload: {
      userData,
      isAuthenticated,
    },
  };
};
  export const logout = () => ({
    type: 'LOGOUT',
  });

  export const clearAccessToken = () => {
    localStorage.removeItem('accessToken');
  };
  
  export const clearRefreshToken = () => {
    localStorage.removeItem('refreshToken');
  };