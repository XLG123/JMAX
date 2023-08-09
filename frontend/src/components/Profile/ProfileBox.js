import { useState } from 'react';
import Modal from "../context/model";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as offerActions from "../store/offers";
import "./Profile.css";
import { deleteProblem } from '../store/problems';

// All classnames are declared with the prefix pg which stands for profile page, instead of pp.

const ProfileBox = ({ problem: { category, author, description, status, _id: id } }) => {
  const CurrentUser = useSelector(state => state.session.user);
  // const [show, setShow] = useState(false);
  // const [price, setPrice] = useState();
  // const [offer, setOffer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, _id: userId } = author;
  console.log("userId:", userId);
  console.log("CurrentUser._id:", CurrentUser._id);
  const [showRequestForm, setShowRequestForm] = useState(false);

  function sendToProf() {
    history.push(`/users/${userId}`);
  }

  // function handleCreateOffer(e) {
  //   e.preventDefault();
  //   const offerData = {
  //     price,
  //     description: offer,
  //     problem: id
  //   };
  //   dispatch(offerActions.composeOffer(offerData));
  //   history.push(`users/${userId}`);
  // }

  // Check if the current user is not the problem creator
  const isCurrentUserProblemCreator = userId === CurrentUser._id;
  console.log("isCurrentUserProblemCreator:", isCurrentUserProblemCreator);

  const handleShowReqForm = () => {
    setShowRequestForm(true);
  }

  const handleClose = (e) => {
    e.preventDefault();
    setShowRequestForm(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch();
  }

  const editCurrentRequest = (e) => {
    e.preventDefault()
    // debugger
    // handleShowReqForm()
    setShowRequestForm(true)
    // console.log(showRequestForm);
  }
  //   return (showRequestForm && (<Modal onClose={handleClose}>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Select a Category:

  //         <select id="category" className="select signup-input selecr-font" 
  //         name="category">
  //           <option value="Home Repair">Home Repair</option>
  //           <option value="Delivery">Delivery</option>
  //           <option value="Driver">Driver</option>
  //         </select>

  //       </label>
  //     </form>
  //   </Modal>)
  //   );
  // }

  const deleteCurrentRequest = (id) => {
    dispatch(deleteProblem(id));
    // .then(()=>{
    //   history.push(`/users/${userId}`);
    // });
  }

  const editAndDeleteButtonGroup = () => {

    return (
      <div className='edit-delete-btn-gp'>
        <div className='pg-edit-btn'
          onClick={editCurrentRequest}>
          Edit
        </div>

        <div className='pg-delete-btn'
          onClick={() => deleteCurrentRequest(id)}>
          Delete
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="pg-problems-container">
        <div className="pg-box">
          {isCurrentUserProblemCreator ? editAndDeleteButtonGroup() : <></>}
          <h3 onClick={sendToProf} className="pg-user"> {username}</h3>
          <div className="pg-status"> {status}</div>
          <p className="pg-catgory">{category}</p>
          <p className="pg-des-box">{description}</p>
          {/* <div className="pg-offer">
            {!isCurrentUserProblemCreator &&
              <button className="pg-add-offer-btn" 
              onClick={() => setShow(true)}> Offer Help</button>
            }
          </div> */}
        </div>
      </div>
      {showRequestForm && <Modal onClose={handleClose}>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Select a Category:

  //         <select id="category" className="select signup-input selecr-font"
          name="category">
            <option value="Home Repair">Home Repair</option>
            <option value="Delivery">Delivery</option>
            <option value="Driver">Driver</option>
          </select>

        </label>
      </form>
    </Modal>}




   
    </>
  );
}

export default ProfileBox;