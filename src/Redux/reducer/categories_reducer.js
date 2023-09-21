import { SET_CATEGORIES, SET_FILTER_CATEGORY, SET_FILTER_SUBCATEGORY } from '../actions/actions';

const initialState = {
  categories: [],
  filterCategory: '',
  filterSubcategory: '', 
};

const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case SET_FILTER_CATEGORY:
      console.log('SET_FILTER_CATEGORY Action:', action); // Agrega este console.log
      return {
        ...state,
        filterCategory: action.category,
        filterSubcategory: '', 
      };
    case SET_FILTER_SUBCATEGORY:
      console.log('SET_FILTER_SUBCATEGORY Action:', action); // Agrega este console.log
      return {
        ...state,
        filterSubcategory: action.subcategory, 
      };
    default:
      return state;
  }
};


export default categoriesReducer;