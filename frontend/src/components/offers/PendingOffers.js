import { useEffect } from 'react';
import * as offerActions from "../store/offers"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PendingOfferBox from './PendingOfferBox';
function PendingOffers(){
    const {userId}=useParams()
    const dispatch=useDispatch()
useEffect(()=>{
    dispatch(offerActions.fetchPendingOffers(userId))

},[dispatch,userId])
const offers=useSelector(state=>state.offers.all)
// console.log(offers)
if(Object.values(offers).length===0)return null

return (
    <>
    {/* <h1>hellp pending</h1> */}
    <div className="accepted-offers">
    <div className='offer-container'>
    {offers.map(offer=> <PendingOfferBox offer={offer} />)}
    </div>
    </div>
    </>
)
}
export default PendingOffers;