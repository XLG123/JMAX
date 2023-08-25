import * as offerActions from "../store/offers"
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import * as sessionActions from "../store/session"
import { useEffect, useState } from 'react';
import Modal from "../context/model";
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons';
import * as problemActions from "../store/problems"
function PendingOfferBox({ offer: {description ,price,status ,helper ,_id ,problem} }){
    const dispatch=useDispatch()
    const history=useHistory()
    const {userId}=useParams()
    const [showEditOffer,setShowEditOffer]=useState(false)
    const currentUser=useSelector(state=>state.session.user)
    const [pOffer,setOffer]=useState(description)
    const [pPrice,setPrice]=useState(price)
    const [showReq,setShowReq]=useState(false)
    function handelDeleteOffer(e){
        e.preventDefault()
        dispatch(offerActions.fetchDeleteOffer(_id))
        }
        useEffect(()=>{
            dispatch(problemActions.fetchProblems())
        },[dispatch,userId])
    const problems=useSelector(state=>state.problems.all)
    const offerProblem=problems[problem]
    const isCurrentUserOfferCreator=currentUser._id===userId
    function handleEditOffer(e){
        e.preventDefault();
        const updateOffer={
            description:pOffer,
            price:pPrice
        }
        dispatch(offerActions.fetchUpdateOffer(_id ,updateOffer))
        setShowEditOffer(false)

           }


    return (
 <>
    <div className="offer-container pinding">
    {isCurrentUserOfferCreator&&
   <div className='edit-delete-btn-gp pending-offer-edit-delete'>
   <div className='pg-edit-btn'
   onClick={()=>setShowEditOffer(true)}
     >
     Edit
   </div>

   <div className='pg-delete-btn'
   onClick={handelDeleteOffer}
   >
     Delete
   </div>
 </div>

    }
            <p className="des-box">Request : <FontAwesomeIcon icon={faMoneyCheck} style={{color:'#1D3150'}} onClick={()=>setShowReq(true)}/></p>
            <p className="green">status : {status}</p>
            <p className="des-box">Price : {pPrice}</p>
            <p className="des-box">offer : {pOffer}</p>


    </div>
    {showEditOffer&&<Modal onClose={()=>setShowEditOffer(false)}>
        <h1 className="title">Edit this Offer</h1>
        <form onSubmit={handleEditOffer}>
            <input
              type="text"
              onChange={(e) => setOffer(e.target.value)}
              className="signup-input"
              placeholder={pOffer}
              required
            />
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="signup-input"
              placeholder={pPrice}
              required
            />

            <button className="sign-up-btn" type="submit">
              Save
            </button>
          </form>
    </Modal>
    
    }
    {showReq&&<Modal onClose={()=>setShowReq(false)}>
        <p className="status">{offerProblem?.status} </p>
        <p>Owner: {offerProblem?.author.username}</p>
        <p >{offerProblem?.category} </p>

        
     <p className="title"> Description : {offerProblem?.description}</p>
     <img className="problem-image"src={offerProblem?.problemImageUrl}/>


        </Modal>}

</>
    )
}
export default PendingOfferBox