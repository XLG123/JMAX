import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as offersActions from "../store/offers"
// import ProblemBox from './ProblemBox';

const Offers = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const reqOffers=useSelector(state=>state.offers.user)
  // debugger
  console.log(reqOffers)
  useEffect(() => {
    dispatch(offersActions.fetchUserOffers(user._id));
    // return () => dispatch(problemActions.clearOfferErrors());
  }, [dispatch])

  // if (offers.length === 0) return <div className='noproblem'>There are no Problems</div>;

  return (
    <div className='container'>
      <h2 className='title'>All  Offers</h2>
      {/* {offers.map(offer => (
        <OfferBox key={offers._id} offers={offers} />
      ))} */}
    </div>
  );
}

export default Offers;