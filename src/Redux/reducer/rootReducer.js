// rootReducer.js

import { combineReducers } from 'redux';
import categoriesReducer from './categories_reducer';
import detailReducer from './detail_reducer';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  detail: detailReducer, 
});

export default rootReducer;
