import axios from 'axios';

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
  
  export const createReview = (productId, comment, rating) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`/api/reviews/${productId}`, { comment, rating });
        dispatch({
          type: CREATE_REVIEW,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error al crear la revisión:', error);
      }
    };
  };
  
  export const deleteReview = (reviewId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`/api/reviews/${reviewId}`);
        dispatch({
          type: DELETE_REVIEW,
          payload: reviewId,
        });
      } catch (error) {
        console.error('Error al eliminar la revisión:', error);
      }
    };
  };
  export const editReview = (reviewId, comment, rating) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`/api/reviews/${reviewId}`, { comment, rating });
        dispatch({
          type: EDIT_REVIEW,
          payload: response.data,
        });
      } catch (error) {
        console.error('Error al editar la revisión:', error);
      }
    };
  };
