import { RECEIVE_USER_LOGOUT } from './session';
import jwtFetch from './jwt';
const UPDATE_OFFER = 'offers/UPDATE_OFFER';
const DELETE_OFFER = 'offers/DELETE_OFFER';
const RECEIVE_OFFERS = "offers/RECEIVE_OFFERS";
const RECEIVE_USER_OFFERSS = "offers/RECEIVE_USER_OFFERSS";
const RECEIVE_NEW_OFFER = "offers/RECEIVE_NEW_OFFER";
const RECEIVE_OFFER_ERRORS = "offers/RECEIVE_OFFER_ERRORS";
const CLEAR_OFFER_ERRORS = "offers/CLEAR_OFFER_ERRORS";

const updateOffer = (offerId, updatedOffer) => ({
  type: UPDATE_OFFER,
  offerId,
  updatedOffer
});

const deleteOffer = (offerId) => ({
  type: DELETE_OFFER,
  offerId
});

const receiveOffers = offers => ({
    type: RECEIVE_OFFERS,
    offers
  });
  
  const receiveUserOffers = offers => ({
    type: RECEIVE_USER_OFFERSS,
    offers
  });
  
  const receiveNewOffer = offer => ({
    type: RECEIVE_NEW_OFFER,
    offer
  });
  
  const receiveErrors = errors => ({
    type: RECEIVE_OFFER_ERRORS,
    errors
  });
  
  export const clearOfferErrors = errors => ({
    type: CLEAR_OFFER_ERRORS,
    errors
  });


export const fetchOffers = () => async dispatch => {
    try {
      const res = await jwtFetch('/api/offers');
      const offers = await res.json();
      dispatch(receiveOffers(offers));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const fetchAcceptedOffers = (userId) => async dispatch => {
    try {
      const res = await jwtFetch(`/api/users/${userId}/offers/accepted`);
      const offers = await res.json();
      dispatch(receiveOffers(offers));
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        dispatch(receiveErrors(resBody.errors));
      }
    }
  };
  

  export const fetchUserOffers = id => async dispatch => {
    try {
      const res = await jwtFetch(`/api/users/${id}/problems/offers`);
      const offers = await res.json();
      dispatch(receiveUserOffers(offers));
  

    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };

  export const composeOffer = data => async dispatch => {
    try {
      const res = await jwtFetch('/api/offers/create', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      const offer = await res.json();
      dispatch(receiveNewOffer(offer));
    //   dispatch(fetchProblems())
    } catch (err) {
      const resBody = await err.json();
      if (resBody.statusCode === 400) {
        return dispatch(receiveErrors(resBody.errors));
      }
    }
  };



  export const fetchDeleteOffer = (offerId) => async (dispatch,getState) => {
    try {
      const res = await jwtFetch(`/api/offers/${offerId}`, {
        method: 'DELETE'
      });
      const user=getState().session.user
      if (res.ok) {
        dispatch(deleteOffer(offerId));
        dispatch(fetchUserOffers(user._id))
      } 
    } catch (err) {
      // Handle error
    }
  };

  export const fetchUpdateOffer = (offerId, updatedData) => async (dispatch,getState) => {
    try {
      const res = await jwtFetch(`/api/offers/${offerId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData)
      });
      const user=getState().session.user
  
      if (res.ok) {
        const updatedOffer = await res.json();
        dispatch(updateOffer(offerId, updatedOffer));
        dispatch(fetchUserOffers(user._id))

      } 
    } catch (err) {
      // Handle error
    }
  };



  const offersReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    switch (action.type) {
      case RECEIVE_OFFERS:
        return { ...state, all: action.offers, new: undefined };
      case RECEIVE_USER_OFFERSS:
        return { ...state, user: action.offers, new: undefined };
      case RECEIVE_NEW_OFFER:
        return { ...state, new: action.offer };
      case RECEIVE_USER_LOGOUT:
        return { ...state, user: {}, new: undefined }
        case DELETE_OFFER:
          const updatedUserOffers = { ...state.user };
          delete updatedUserOffers[action.offerId];
          return { ...state, user: updatedUserOffers };
          case UPDATE_OFFER:
      return { ...state};
      default:
        return state;
    }
  };
  
  export default offersReducer;