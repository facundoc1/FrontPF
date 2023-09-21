import axios from 'axios';

export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';
export const GET_PAYMENT_DETAILS_SUCCESS = 'GET_PAYMENT_DETAILS_SUCCESS';
export const GET_PAYMENT_DETAILS_FAILURE = 'GET_PAYMENT_DETAILS_FAILURE';

export const makePayment = (paymentDetails) => {
  return async (dispatch) => {
    try {
      const preferenceResponse = await axios.post('/payment', { items: paymentDetails.items });
      
      const preferenceId = preferenceResponse.data.preference_id;

      window.location.href = `https://www.mercadopago.com/checkout/v1/redirect?preference_id=${preferenceId}`;
    } catch (error) {
      dispatch({
        type: PAYMENT_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getPaymentDetails = (paymentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/payment/${paymentId}`);
      dispatch({
        type: GET_PAYMENT_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_DETAILS_FAILURE,
        payload: error.message,
      });
    }
  };
};
