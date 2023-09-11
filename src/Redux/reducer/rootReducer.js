// rootReducer.js

import { combineReducers } from 'redux';
import categoriesReducer from './categories_reducer';
import detailReducer from './detail_reducer';
import productReducer from './product_reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  detail: detailReducer, 
  products: productReducer
});

export default rootReducer;
