import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as offersActions from "../store/offers"
import ProblemBox from './ProblemBox';

const Offers = () => {
  const dispatch = useDispatch();
  const offers = useSelector(state => Object.values(state.offers.all));

  useEffect(() => {
    dispatch(offersActions.fetchOffers());
    return () => dispatch(problemActions.clearOfferErrors());
  }, [dispatch])

  if (offers.length === 0) return <div className='noproblem'>There are no Problems</div>;

  return (
    <div className='container'>
      <h2 className='title'>All  Requests</h2>
      {offers.map(offer => (
        <OfferBox key={offers._id} offers={offers} />
      ))}
    </div>
  );
}

export default Offers;