import axios from 'axios';
import { getUserIdFromToken } from './actions_auth';

export const GET_USER_PROFILE_REQUEST = 'GET_USER_PROFILE_REQUEST';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FAILURE = 'GET_USER_PROFILE_FAILURE';



export const getUserProfileRequest = () => ({
  type: GET_USER_PROFILE_REQUEST,
});

export const getUserProfileSuccess = (userData) => ({
  type: GET_USER_PROFILE_SUCCESS,
  userData,
});

export const getUserProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  error,
});

export const getUserProfile = (id) => async (dispatch) => {
  dispatch(getUserProfileRequest());

  try {
    const response = await axios.get(`/users/${id}`);
    const userData = response.data;
    dispatch(getUserProfileSuccess(userData));
  } catch (error) {
    dispatch(getUserProfileFailure(error));
  }
};
