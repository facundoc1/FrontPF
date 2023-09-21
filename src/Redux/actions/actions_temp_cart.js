

export const ADD_TO_TEMP_CART = 'ADD_TO_TEMP_CART';
export const REMOVE_FROM_TEMP_CART = 'REMOVE_FROM_TEMP_CART';
export const CLEAR_TEMP_CART = 'CLEAR_TEMP_CART';
export const UPDATE_TEMP_CART = 'UPDATE_TEMP_CART';

export const addToTempCart = (item) => {
  const cartTemp = JSON.parse(localStorage.getItem('cartTemp')) || [];
  cartTemp.push(item);
  localStorage.setItem('cartTemp', JSON.stringify(cartTemp));

  return {
    type: ADD_TO_TEMP_CART,
    payload: { ...item, quantity: 1 },
  };
};

export const removeFromTempCart = (itemId) => {
  const cartTemp = JSON.parse(localStorage.getItem('cartTemp')) || [];
  const updatedCart = cartTemp.filter(item => item.id !== itemId);
  localStorage.setItem('cartTemp', JSON.stringify(updatedCart));

  return {
    type: REMOVE_FROM_TEMP_CART,
    payload: itemId,
  };
};

export const clearTempCart = () => {
  localStorage.removeItem('cartTemp');

  return {
    type: CLEAR_TEMP_CART,
  };
};

export const updateTempCart = (cartItems) => {
  localStorage.setItem('cartTemp', JSON.stringify(cartItems));

  return {
    type: UPDATE_TEMP_CART,
    payload: cartItems,
  };
};
