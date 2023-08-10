
import * as problemActions from "../store/problems"
import * as sessionActions from "../store/session"
import * as offerActions from "../store/offers"
import * as reviweActions from "../store/reviews"

import { useState } from 'react';
import Modal from "../context/model"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./offer.css"
const AcceptedOfferBox = ({ offer: {description ,price,status ,helper ,_id ,problem} }) => {
const user= useSelector(state=>state.session.user)
  const [show,setShow]=useState(false)
  const history=useHistory()
  const [review,setReview]=useState("")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(sessionActions.fetchAllUsers())
  },[dispatch])

  const offerOwner= useSelector(state=> state.session.users)
 
  function redirectToHelper(e){
    e.preventDefault()
    history.push(`/users/${helper}`)
  }

function handelDeleteOffer(e){
    e.preventDefault()
    dispatch(offerActions.fetchDeleteOffer(_id))
}

function handelShowAddReview(e){
e.preventDefault()
setShow(true)
}

function handelClose(e){
e.preventDefault()
setShow(false)
}

function handleCreateReview(e){
e.preventDefault()
const reviewData = {
    description: review,
    reviewer: user._id,
    offerId:_id
  };
  dispatch(reviweActions.composeReview(reviewData));
//   history.push(`users/${user._id}`);
}
if (!offerOwner)return null

  return (
    <>
    <div className="offer-container center">
    <form onSubmit={handelShowAddReview}>
    {/* <div className=""> */}
      <h3 onClick={redirectToHelper} className="user bigger">{offerOwner[helper].username}</h3>
<div className="close"> <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#FF5733' }}  onClick={handelDeleteOffer}/></div>

      <p className="green">status : {status}</p>

      <p className="des-box">Price : {price}</p>
      <p className="des-box">offer : {description}</p>
    {/* </div> */}
<button className="sign-up-btn pad center " type="submit">Add Review</button>

</form>
</div>
{show && <Modal onClose={handelClose}>
<h1 className="title">Add your Review</h1>
          <form onSubmit={handleCreateReview}>
            <input
              type="text"
              onChange={(e) => setReview(e.target.value)}
              className='signup-input'
              placeholder="My Review is ...."
              required
            />
           
            
              <button className="sign-up-btn" type="submit">Add Review</button>
            
          </form>
    </Modal>}

    </>
  );
}

export default AcceptedOfferBox;