
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
import { NavLink } from 'react-router-dom';
const AcceptedOfferBox = ({ offer: {description ,price,status ,helper ,_id ,problem} }) => {
const user= useSelector(state=>state.session.user)
const data= useSelector(state=>state.reviews.all)
const reviews= Object.values(data)
  const [show,setShow]=useState(false)
  const [showReq,setShowReq]=useState(false)
  const history=useHistory()
  const [review,setReview]=useState("")
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(sessionActions.fetchAllUsers())
    dispatch(reviweActions.fetchReviews())
  },[])

  const offerOwner= useSelector(state=> state.session.users)
 
  function redirectToHelper(e){
    e.preventDefault()
    history.push(`/users/${helper}`)
  }

function handelShowAddReview(e){
e.preventDefault()
setShow(true)
}

function handelClose(e){
e.preventDefault()
setShow(false)
setShowReq(false)
}

function handleCreateReview(e){
e.preventDefault()
const reviewData = {
    description: review,
    reviewer: user._id,
    offerId:_id
  };
  dispatch(reviweActions.composeReview(reviewData)).then(()=>{
    dispatch(reviweActions.fetchReviews())

  })
  handelClose(e)

//   history.push(`users/${user._id}`);
}
function handelshowReq(e){
e.preventDefault()
dispatch(problemActions.fetchProblem(problem))
setShowReq(true)
}
const reqForOffer=useSelector(state=> state.problems.all)
if (!offerOwner)return null
if(Object.values(reqForOffer).length === 0) return null
  return (
    <>
    <div className="offer-container center">
    <form onSubmit={handelShowAddReview}>
    {/* <div className=""> */}
      <h3 onClick={redirectToHelper} className="user bigger">{offerOwner[helper].username}</h3>

      <p className="green">status : {status}</p>
      <div onClick={handelshowReq} className="req">request</div>
      <p className="des-box">Price : {price}</p>
      <p className="des-box">offer : {description}</p>
    {/* </div> */}
<button className="sign-up-btn pad center " type="submit">Add Review</button>

</form>
{reviews.map(ele=>(
ele.offerId === _id && <div className="review"> {ele.description}</div>
))}

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
    {showReq && <Modal onClose={handelClose}>

          <div>
          <div className="des-box"> {reqForOffer?.description}</div> 
          <div className="des-box">   {reqForOffer?.category}</div>
          <div className="des-box">  <NavLink to={`/users/${reqForOffer?.author?._id}`} style={{color:"#031926"}}>{reqForOffer?.author?.username}</NavLink> </div>
          </div>
    </Modal>}
    </>
  );
}

export default AcceptedOfferBox;