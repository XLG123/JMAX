import "./ProblemBox.css";
import { useState } from 'react';
import Modal from "../context/model";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as offerActions from "../store/offers";

const ProblemBox = ({ problem: { category, author, description, status, _id: id } }) => {
  const CurrentUser = useSelector(state => state.session.user);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState();
  const [offer, setOffer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, _id: userId } = author;
  // console.log("userId:", userId);
  // console.log("CurrentUser._id:", CurrentUser._id);
  
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

  const isCurrentUserProblemCreator = userId === CurrentUser._id;

  return (
    <>
      <div className="problems-container">
        <div className="box">
          <h3 onClick={sendToProf} className="user"> {username}</h3>
          <div className="status"> {status}</div>
          <p className="catgory">{category}</p>
          <p className="des-box">{description}</p>
          <div className="offer">
            {!isCurrentUserProblemCreator &&
            <button className="add-offer-btn" onClick={() => setShow(true)}> Offer Help</button>
          }
          </div>
        </div>
      </div>
      {show && (
        <Modal onClose={() => setShow(false)}>
          <h1 className="title">What is your offer!</h1>
          <form onSubmit={handleCreateOffer}>
            <input
              type="text"
              onChange={(e) => setOffer(e.target.value)}
              className='signup-input'
              placeholder="My Offer is ...."
              required
            />
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className='signup-input'
              placeholder="Price"
              required
            />
            
              <button className="sign-up-btn" type="submit">Add Offer</button>
            
          </form>
        </Modal>
      )}
    </>
  );
}

export default ProblemBox;