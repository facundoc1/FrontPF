import axios from "axios";
import { CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE } from '../types/types';

export const createProductRequest = () => {
  return { type: CREATE_PRODUCT_REQUEST };
};

export const createProductSuccess = (product) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: { product },
  };
};

export const createProductFailure = (error) => {
  return {
    type: CREATE_PRODUCT_FAILURE,
    payload: { error },
  };
};

export const createProduct = (productData) => {
  return async (dispatch) => {
    dispatch(createProductRequest());

    try {
      const response = await axios.post('/api/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 201) {
        throw new Error('No se pudo crear el producto');
      }

      const product = response.data;
      dispatch(createProductSuccess(product));
    } catch (error) {
      dispatch(createProductFailure(error));
    }
  };
};
