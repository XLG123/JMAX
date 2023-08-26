import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as offersActions from '../store/offers';
import ProblemBox from '../Problems/ProblemBox';
import OfferBox from './offerBox';
import * as problemActions from "../store/problems"
const Offers = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const reqOffers = useSelector(state => state.offers.user);
  const requests = useSelector(state => state.problems.all);
  const reqIds = Object.keys(reqOffers);
  useEffect(() => {
    dispatch(problemActions.fetchUserProblemsOpen(user._id))

    // dispatch(problemActions.fetchUserProblemsOpen(user._id))
    // dispatch(offersActions.fetchUserOffers(user._id))


  }, [dispatch]);
if (Object.keys(requests).length === 0) {
  return null;
}
  if (reqIds.length=== 0) {
    return null
  }

  return (
    <>
    <div className='req-offer-container'>
      {reqIds?.map(reqId => (
        <div key={reqId} className='one-req-offers-container'>
          {requests[reqId].status === "open" && (
            <div>
              <ProblemBox problem={requests[reqId]} />
              <div className='all-offers-scrollable-container'>
                {Object.values(reqOffers[reqId])?.map(offer => (
                  <OfferBox key={offer._id} offer={offer} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </>
    );
};

export default Offers;
{/* <ProblemBox problem={{ category: requests?.[reqId]?.category, author: requests?.[reqId]?.author, description: requests?.[reqId]?.description, status: requests?.[reqId]?.status, _id: requests?.[reqId]?.id }} /> */}
