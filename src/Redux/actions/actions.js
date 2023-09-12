import axios from "axios"

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY';
export const SET_FILTER_SUBCATEGORY = 'SET_FILTER_SUBCATEGORY';
export const SET_FILTERED_PRODUCTS = 'SET_FILTERED_PRODUCTS';
export const GET_PRODUCT_DETAILS_REQUEST = 'GET_PRODUCT_DETAILS_REQUEST';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';
export const GET_PRODUCT_DETAILS_FAILURE = 'GET_PRODUCT_DETAILS_FAILURE';
export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';



export function loginRequest() {
    return { type: LOGIN_REQUEST };
  }
  
  export function loginSuccess(user) {
    return {
      type: LOGIN_SUCCESS,
      payload: { user },
    };
  }
  
  export function loginFailure(error) {
    return {
      type: LOGIN_FAILURE,
      payload: { error },
    };
  }

  export function logout() {
    return { type: LOGOUT };
  }

  export function removeProduct(productId) {
    return {
      type: REMOVE_PRODUCT,
      payload: { productId },
    };
  }

  export function addProduct(product) {
    return {
      type: ADD_PRODUCT,
      payload: { product },
    };
  }

  export function filterProducts(filter) {
    return {
      type: FILTER_PRODUCTS,
      payload: { filter },
    };
  }

  export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    categories,
  });
  
  export const axiosCategories = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('/category');
        const categories = response.data;
  
        const mainCategories = categories.filter((category) => !category.parentId);
  
        dispatch(setCategories(mainCategories));
      } catch (error) {

      }
    };
  };
  const flattenCategories = (categories) => {
    const flattened = [];
  
    const traverse = (category) => {
      flattened.push(category);
      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((subcategory) => {
          traverse(subcategory);
        });
      }
    };
  
    categories.forEach((category) => {
      traverse(category);
    });
  
    return flattened;
  };
  
  export const setFilterCategory = (categoryId) => {
    console.log('setFilterCategory:', categoryId); // Agrega este console.log
    return {
      type: 'SET_FILTER_CATEGORY',
      payload: categoryId,
    };
  };

  export const setFilterSubcategory = (subcategoryId) => {
    console.log('setFilterSubcategory:', subcategoryId); // Agrega este console.log
    return {
      type: 'SET_FILTER_SUBCATEGORY',
      payload: subcategoryId,
    };
  };

  export const setFilteredProducts = (filteredProducts) => {
    // console.log('setFilteredProducts:', filteredProducts); // Agrega este console.log
    return {
      type: 'SET_FILTERED_PRODUCTS',
      payload: filteredProducts,
    };
  };
  
  export function getProductDetailsRequest() {
    return { type: GET_PRODUCT_DETAILS_REQUEST };
  }
  
  export function getProductDetailsSuccess(product) {
    return {
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: { product },
    };
  }
  
  export function getProductDetailsFailure(error) {
    return {
      type: GET_PRODUCT_DETAILS_FAILURE,
      payload: { error },
    };
  }
  
  export const axiosGetProductDetail = (productId) => {
    return async (dispatch) => {
      dispatch(getProductDetailsRequest());
  
      try {
        const response = await axios.get(`/products/${productId}`);
        const product = response.data;
        console.log('Respuesta de la solicitud HTTP:', response.data); 
  
        dispatch(getProductDetailsSuccess(product));
      } catch (error) {
        dispatch(getProductDetailsFailure(error));
      }
    };
  };

  export const productsRequest = () => ({
    type: PRODUCTS_REQUEST,
  });
  
  export const productsSuccess = (products) => ({
    type: PRODUCTS_SUCCESS,
    payload: products,
  });
  
  export const productsFailure = (error) => ({
    type: PRODUCTS_FAILURE,
    payload: error,
  });

  export const axiosProducts = () => {
    return async (dispatch) => {
      dispatch(productsRequest());
      try {
        const response = await axios.get('/products');
        dispatch(productsSuccess(response.data));
      } catch (error) {
        dispatch(productsFailure(error));
      }
    };
  };

  export const registerUser = (userData) => {
    return (dispatch) => {
      dispatch({ type: REGISTER_REQUEST });
  
      axios
        .post('/users/register', userData)
        .then((response) => {
          dispatch({ type: REGISTER_SUCCESS, payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: REGISTER_FAILURE, error: error.message });
        });
    };
  };

  export const loginUser = (userData) => ({
    type: LOGIN_USER,
    payload: userData,
  });
  

  export const logoutUser = () => ({
    type: LOGOUT_USER,
  });
  
  export const setAuthenticatedUser = (userData) => ({
    type: SET_AUTHENTICATED_USER,
    payload: userData,
  });