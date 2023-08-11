import { useEffect } from 'react';
import * as offerActions from "../store/offers"
import { useDispatch, useSelector } from 'react-redux';
import AcceptedOfferBox from './AcceptedOfferBox';
function AcceptedOffers(){
    const user=useSelector(state=>state.session.user)
    const dispatch=useDispatch()
    const offers=useSelector(state=> state.offers.all)
    useEffect(() => {
        dispatch(offerActions.fetchAcceptedOffers(user._id));
      }, [user, dispatch]);
    
      if (Object.keys(offers).length === 0) {
        return null;
      }
    
      return (
        <div className='accepted-offers'>
          <div className='offer-container'>
            {offers.map(offer => (
              <AcceptedOfferBox key={offer._id} offer={offer} />
            ))}
          </div>
        </div>
      );
    }
export default AcceptedOffers;