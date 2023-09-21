

import { combineReducers } from 'redux';
import categoriesReducer from './categories_reducer';
import detailReducer from './detail_reducer';
import productReducer from './product_reducer';
import registerReducer from './register_reducer';
import loginReducer from './login_reducer';
import createProductReducer from './create_product_reducer'
import reviewReducer from './review_reducer'
import authReducer from './auth_reducer'
import profileReducer from './profile_reducer'
import tempCartReducer from './temp_cart_reducer'
import paymentReducer from './payment_reducer'


const rootReducer = combineReducers({
  categories: categoriesReducer,
  detail: detailReducer, 
  products: productReducer,
  register: registerReducer,
  login: loginReducer,
  createProduct: createProductReducer,
  review: reviewReducer,
  authorization: authReducer,
  profile: profileReducer,
  tempCart: tempCartReducer,
  payment: paymentReducer
});

export default rootReducer;
