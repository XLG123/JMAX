import { useEffect, useState } from 'react';
import Modal from "../context/model";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as offerActions from "../store/offers";
import "../NavBar/NavBar.css";
import "./Profile.css";
import { deleteProblem, fetchUpdateProblem, fetchUserProblems } from '../store/problems';

// All classnames are declared with the prefix pg which stands for profile page, instead of pp.

const ProfileBox = ({ problem: { category, author, description,
  address, status, _id: id } }) => {
  const CurrentUser = useSelector(state => state.session.user);
  const [editCategory, setEditCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(description);
  const [editZipCode, setEditZipCode] = useState(address);
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

  const handleClose = (e) => {
    e.preventDefault();
    setShowRequestForm(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProblem = {
      category: editCategory,
      address: editZipCode,
      description: editDescription
    }
    dispatch(fetchUpdateProblem(id, updatedProblem));
    setShowRequestForm(false);
  }

  const editCurrentRequest = (e) => {
    e.preventDefault()
    setShowRequestForm(true)
  }

  const deleteCurrentRequest = (id) => {
    dispatch(deleteProblem(id));
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

  // useEffect(()=> {
  //   dispatch(fetchUserProblems(CurrentUser._id));
  // }, [dispatch])

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
        <form onSubmit={handleSubmit}>
          <label>
            Select a Category:

            <select id="category" className="select signup-input selecr-font"
              name="category" value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}>
                <option value="Home Repair">Home Repair</option>
                <option value="Delivery">Delivery</option>
                <option value="Driver">Driver</option>
            </select>

          </label>

          <input type="number"
            className='signup-input'
            value={editZipCode}
            placeholder="1"
            required
            onChange={(e) => setEditZipCode(e.target.value)}
          />

          <textarea
            className='signup-input'
            value={editDescription}
            placeholder="Description"
            required
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <label className="img-input"> Add image
            <input type="file"
              id="file"
              className='signup-input'
              placeholder="Add an image"
            />
          </label>

          <button className="sign-up-btn ">Edit Request</button>

        </form>
      </Modal>}





    </>
  );
}

export default ProfileBox;