import jwtFetch from './jwt';

const RECEIVE_NEW_REVIEW = "reviews/RECEIVE_NEW_REVIEW";


const receiveNewReview = review => ({
    type: RECEIVE_NEW_REVIEW,
    review
  });
  


export const composeReview = data => async dispatch => {
    debugger

    try {
      const res = await jwtFetch('/api/reviews/create', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const review = await res.json();
      dispatch(receiveNewReview(review));
    //   dispatch(fetchProblems())
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        // return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  const reviewsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch (action.type) {
    //   case RECEIVE_OFFERS:
    //     return { ...state, all: action.offers, new: undefined };
    //   case RECEIVE_USER_OFFERSS:
    //     return { ...state, user: action.offers, new: undefined };
      case RECEIVE_NEW_REVIEW:
        return { ...state, new: action.review };
    //   case RECEIVE_USER_LOGOUT:
    //     return { ...state, user: {}, new: undefined }
    //     case DELETE_OFFER:
    //       const updatedUserOffers = { ...state.user };
    //       delete updatedUserOffers[action.offerId];
    //       return { ...state, user: updatedUserOffers };
    //       case UPDATE_OFFER:
    //   return { ...state};
      default:
        return state;
    }
  };
  
  export default reviewsReducer;