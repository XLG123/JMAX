import { useState } from 'react';
import Modal from "../context/model";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as offerActions from "../store/offers";
import "./Profile.css";

// All classnames are declared with the prefix pg which stands for profile page, instead of pp.

const ProfileBox = ({ problem: { category, author, description, status, _id: id } }) => {
  const CurrentUser = useSelector(state => state.session.user);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState();
  const [offer, setOffer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, _id: userId } = author;
  console.log("userId:", userId);
  console.log("CurrentUser._id:", CurrentUser._id);

  function sendToProf() {
    history.push(`/users/${userId}`);
  }

  function handleCreateOffer(e) {
    e.preventDefault();
    const offerData = {
      price,
      description: offer,
      problem: id
    };
    dispatch(offerActions.composeOffer(offerData));
    history.push(`users/${userId}`);
  }

  // Check if the current user is not the problem creator
  const isCurrentUserProblemCreator = userId === CurrentUser._id;
  console.log("isCurrentUserProblemCreator:", isCurrentUserProblemCreator);

  
  const editAndDeleteButtonGroup = () => {

    const deleteCurrentRequest = (problemId) => {
      
    }

    return (
      <div className='edit-delete-btn-gp'>
        <div className='pg-edit-btn'>
          Edit
        </div>

        <div className='pg-delete-btn' 
          onClick={deleteCurrentRequest()}>
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
          <div className="pg-offer">
            {!isCurrentUserProblemCreator &&
              <button className="pg-add-offer-btn" 
              onClick={() => setShow(true)}> Offer Help</button>
            }
          </div>
        </div>
      </div>
      {show && (
        <Modal onClose={() => setShow(false)}>
          <h1 className="pg-title">What is your offer!</h1>
          <form onSubmit={handleCreateOffer}>
            <input
              type="text"
              onChange={(e) => setOffer(e.target.value)}
              className='pg-signup-input'
              placeholder="My Offer is ...."
              required
            />
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className='pg-signup-input'
              placeholder="Price"
              required
            />
            {/* Render the "Add Offer" button only if the current user is not the problem creator */}
            <button className="pg-sign-up-btn" type="submit">Add Offer</button>

          </form>
        </Modal>
      )}
    </>
  );
}

export default ProfileBox;