import { RECEIVE_USER_LOGOUT } from './session';
const RECEIVE_OFFERS = "offers/RECEIVE_OFFERS";
const RECEIVE_USER_OFFERSS = "offers/RECEIVE_USER_OFFERSS";
const RECEIVE_NEW_OFFER = "offers/RECEIVE_NEW_OFFER";
const RECEIVE_OFFER_ERRORS = "offers/RECEIVE_OFFER_ERRORS";
const CLEAR_OFFER_ERRORS = "offers/CLEAR_OFFER_ERRORS";

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
  

  export const fetchUserOffers = id => async dispatch => {
    try {
      const res = await jwtFetch(`/api/offers/user/${id}`);
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
      default:
        return state;
    }
  };
  
  export default offersReducer;