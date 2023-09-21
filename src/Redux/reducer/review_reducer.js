import { LOAD_REVIEWS, CREATE_REVIEW, DELETE_REVIEW, EDIT_REVIEW } from '../actions/actions_review';

const initialState = {
  reviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };

    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

    case DELETE_REVIEW:
      const updatedReviews = state.reviews.filter((review) => review.id !== action.payload);
      return {
        ...state,
        reviews: updatedReviews,
      };

    case EDIT_REVIEW:
      const updatedReviewIndex = state.reviews.findIndex((review) => review.id === action.payload.id);
      if (updatedReviewIndex !== -1) {
        const updatedReviews = [...state.reviews];
        updatedReviews[updatedReviewIndex] = action.payload;
        return {
          ...state,
          reviews: updatedReviews,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default reviewReducer;
