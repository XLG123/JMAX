import jwtFetch from './jwt';

const RECEIVE_NEW_REVIEW = "reviews/RECEIVE_NEW_REVIEW";
const GET_REVIEWS = 'reviews/GET_REVIEWS';
const UPDATE_REVIEW="reviews/UPDATE_REVIEW"
const REMOVE_REVIEW="reviews/REMOVE_REVIEW"
const receiveNewReview = review => ({
  type: RECEIVE_NEW_REVIEW,
  review
});
  
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews,
});

const updateReview=(review)=>({
  type: UPDATE_REVIEW,
  review,
})

export const fetchReviews = () => async (dispatch) => {
  try {
    const response = await jwtFetch('/api/reviews'); // Replace with your API endpoint
   const reviews=await response.json()
    dispatch(getReviews(reviews));
  } catch (error) {
    // Handle error if needed
  }
};

export const composeReview = data => async dispatch => {
  try {
    const res = await jwtFetch('/api/reviews/create', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    const review = await res.json();
    dispatch(receiveNewReview(review));
  } catch (err) {
    // Handle error if needed
  }
};


export const fetchUpdateReview = (reviewId, updatedData) => async (dispatch,getState) => {
  debugger
  try {
    const res = await jwtFetch(`/api/reviews/${reviewId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedData)
    });
    const user = getState().session.user;  
    if (res.ok) {
      debugger
      const updatedReview = await res.json();
      dispatch(updateReview(updatedReview));
    } else {
      console.error("Request not OK");
    }
  } catch (err) {
    console.error("Error:", err);
  }
};


export const deleteReview = (id) => async (dispatch, getState) => {
  await jwtFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });

  const user = getState().session.user
  dispatch({
    type: REMOVE_REVIEW,
     id,
  });

  dispatch(fetchReviews())
}






const initialState = {
  all: [],
  user: {},
  new: undefined
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        all: action.reviews
      };

    case RECEIVE_NEW_REVIEW:
      return {
        ...state,
        new: action.review
      };
    case UPDATE_REVIEW:
      return {
        ...state,
        all: {
          ...state.all,
          [action.review._id]: action.review,
        }}
      case REMOVE_REVIEW:
        let newState = { ...state };
        delete newState[action.id];
        return { ...newState };
    default:
      return state;
  }
};

export default reviewsReducer;