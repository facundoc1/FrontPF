// rootReducer.js

import { combineReducers } from 'redux';
import categoriesReducer from './categories_reducer';
import detailReducer from './detail_reducer';
import productReducer from './product_reducer';
import registerReducer from './register_reducer';
import loginReducer from './login_reducer';


const rootReducer = combineReducers({
  categories: categoriesReducer,
  detail: detailReducer, 
  products: productReducer,
  register: registerReducer,
  login: loginReducer,
});

export default rootReducer;
