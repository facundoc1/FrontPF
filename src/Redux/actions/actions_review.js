import axios from 'axios';

import {getAuthHeaders} from './actions_auth'

export const LOAD_REVIEWS = 'LOAD_REVIEWS';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';

export const loadReviews = (productId) => {
    return async (dispatch) => {
      try {
        console.log(`este es el id`, productId)
        const response = await axios.get(`/reviews/product/${productId}`); 
        dispatch({
          type: LOAD_REVIEWS,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error al cargar las revisiones:', error);
      }
    };
  };
  
  export const createReview = (productId, comment, rating, userId) => {
    return async (dispatch) => {
      try {
        const headers = getAuthHeaders(); 
  
        const response = await axios.post(`/reviews/${productId}`, { comment, rating, userId }, { headers });
        dispatch({
          type: CREATE_REVIEW,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error al crear la revisión:', error);
      }
    };
  };
  
  // export const deleteReview = (reviewId) => {
  //   return async (dispatch) => {
  //     try {
  //       const headers = getAuthHeaders();
  
  //       if (headers) {
  //         await axios.delete(`/reviews/${reviewId}`, { headers });
  //         dispatch({
  //           type: DELETE_REVIEW,
  //           payload: reviewId,
  //         });
  //       } else {
  //         console.error('No se encontró un token de acceso.');
  //       }
  //     } catch (error) {
  //       console.error('Error al eliminar la revisión:', error);
  //     }
  //   };
  // };
  
  export const editReview = (reviewId, comment, rating) => {
    return async (dispatch) => {
      try {
        const headers = getAuthHeaders();
  
        if (headers) {
          const response = await axios.put(`/api/reviews/${reviewId}`, { comment, rating }, { headers });
          dispatch({
            type: EDIT_REVIEW,
            payload: response.data,
          });
        } else {
          console.error('No se encontró un token de acceso.');
        }
      } catch (error) {
        console.error('Error al editar la revisión:', error);
      }
    };
  };
