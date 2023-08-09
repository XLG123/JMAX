import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as offersActions from '../store/offers';
import ProblemBox from '../Problems/ProblemBox';
import OfferBox from './offerBox';

const Offers = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const reqOffers = useSelector(state => state.offers.user);
  const requests = useSelector(state => state.problems.all);
  const reqIds = Object.keys(reqOffers);

  useEffect(() => {
    // dispatch(offersActions.fetchUserOffers(user._id));
    // return () => dispatch(problemActions.clearOfferErrors());
  }, [dispatch]);
debugger
  if (reqIds.length=== 0 || !requests) {
    return null
  }

  return (
    <>
    <div className='req-offer-container'>
      {/* <h2 className='title'>All Offers</h2> */}
      {reqIds?.map(reqId => (
        <div key={reqId}>
            {/* {requests[reqId].status== "open"} */}
          <ProblemBox problem={requests[reqId]} />
          {Object.values(reqOffers[reqId])?.map(offer => (
            offer.status === "pending"&&
            <OfferBox key={offer._id} offer={offer} />

           
          ))}

        </div>

      ))}

    </div>
    </> 
    );
};

export default Offers;