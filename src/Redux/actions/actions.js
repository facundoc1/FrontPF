import axios from "axios"

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS';


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