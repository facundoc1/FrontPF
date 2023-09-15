import axios from "axios"
export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const createProductRequest = () => {
    return { type: 'CREATE_PRODUCT_REQUEST' };
  };
  
  export const createProductSuccess = (product) => {
    return {
      type: 'CREATE_PRODUCT_SUCCESS',
      payload: { product },
    };
  };
  
  export const createProductFailure = (error) => {
    return {
      type: 'CREATE_PRODUCT_FAILURE',
      payload: { error },
    };
  };
  
  export const createProduct = (productData) => {
    return async (dispatch) => {
      dispatch(createProductRequest());
  
      try {
        const response = await axios.post('/products', productData);
  
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