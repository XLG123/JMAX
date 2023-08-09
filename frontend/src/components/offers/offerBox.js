// import "./ProblemBox.css"
import * as sessionActions from "../store/session"
import * as offerActions from "../store/offers"
import { useState } from 'react';
import Modal from "../context/model"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./offer.css"
const OfferBox = ({ offer: {description ,price,status ,helper ,_id} }) => {
  const [show,setShow]=useState(false)
  const history=useHistory()
  // const [offer,setOffer]=useState("")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(sessionActions.fetchAllUsers())
  },[dispatch])
  const offerOwner= useSelector(state=> state.session.users)
  function handelSubmit(e){
    e.preventDefault()
  }
  // console.log(offerOwner[helper].username)
  function redirectToHelper(e){
e.preventDefault()
history.push(`/users/${helper}`)
  }

function handelDeleteOffer(e){
e.preventDefault()
dispatch(offerActions.fetchDeleteOffer(_id))
}

function handelTakingOffer(e){
e.preventDefault()
dispatch(offerActions.fetchUpdateOffer(_id, {status: "Accepted"}))
}


if (!offerOwner)return null

  return (
    <>
    <div className="offer-container">
    <form onSubmit={handelTakingOffer}>
    {/* <div className=""> */}
      <h3 onClick={redirectToHelper} className="user bigger">{offerOwner[helper].username}</h3>
<div className="close"> <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#FF5733' }}  onClick={handelDeleteOffer}/></div>

      <p className="green">status : {status}</p>

      <p className="des-box">Price : {price}</p>
      <p className="des-box">offer : {description}</p>
    {/* </div> */}
<button className="sign-up-btn pad " type="submit">Accept Offer</button>

</form>
</div>

    </>
  );
}

export default OfferBox;