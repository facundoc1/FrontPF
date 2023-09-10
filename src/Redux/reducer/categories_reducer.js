import { SET_CATEGORIES, SET_FILTER_CATEGORY } from '../actions/actions';
const initialState = {
  categories: [],
  filterCategory: '',
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.category, 
      };
    default:
      return state;
  }
};

export default categoriesReducer;
