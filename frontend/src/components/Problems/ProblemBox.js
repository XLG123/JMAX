import "./ProblemBox.css";
import { useState,useEffect } from 'react';
import Modal from "../context/model";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as offerActions from "../store/offers";
import { deleteProblem, fetchUpdateProblem, fetchUserProblems } from '../store/problems';


const ProblemBox = ({
  problem: { category, author, description, status, _id: id, problemImageUrl },
}) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const CurrentUser = useSelector(state => state.session.user);

  const [show, setShow] = useState(false);
  const [price, setPrice] = useState();
  const [offer, setOffer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, _id: userId } = author;
  const [editCategory, setEditCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(description);
  const [editZipCode, setEditZipCode] = useState(address);
  const [editStatus,setStatus]=useState(status)
  // console.log("userId:", userId);
  // console.log("CurrentUser._id:", CurrentUser._id);

  const isCurrentUserProblemCreator = userId === CurrentUser._id;


  function sendToProf() {
    history.push(`/users/${userId}`);
  }

  function handleCreateOffer(e) {
    e.preventDefault();
    const offerData = {
      price,
      description: offer,
      problem: id,
    };
    dispatch(offerActions.composeOffer(offerData));
    history.push(`users/${userId}`);
  }
  const editCurrentRequest = (e) => {
    e.preventDefault();
    setShowRequestForm(true);
    console.log("editCurrentRequest called", "true:",showRequestForm);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProblem = {
      status:editStatus,
      category: editCategory,
      address: editZipCode,
      description: editDescription
    }
    dispatch(fetchUpdateProblem(id, updatedProblem)).then(() => {
      debugger
      setShowRequestForm(false);
      console.log("showRequestForm should be false:", "false" ,showRequestForm);
    });
  }
  const deleteCurrentRequest = (id) => {
    dispatch(deleteProblem(id));
  }
  function handelClose(e){
    e.preventDefault();
    setShowRequestForm(false)
  }

  return (
    <>
      <div className="problems-container">
        <div className="box">

          <h3 onClick={sendToProf} className="user"> {username}</h3>
{isCurrentUserProblemCreator&& 
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
 
}
       
          <div className="status"> {editStatus}</div>
          <p className="catgory">{editCategory}</p>
          <p className="des-box">{editDescription}</p>
					<div className="image-problem-div">
            <img
              className="imageProblem"
              src={`${problemImageUrl}`}
              alt="imageProblem"
            />
          </div>

          <div className="offer">
            {!isCurrentUserProblemCreator && (
              <button className="add-offer-btn" onClick={() => setShow(true)}>
                {" "}
                Offer Help
              </button>
            )}
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
              className="signup-input"
              placeholder="My Offer is ...."
              required
            />
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="signup-input"
              placeholder="Price"
              required
            />

            <button className="sign-up-btn" type="submit">
              Add Offer
            </button>
          </form>
        </Modal>
      )}
       {showRequestForm && <Modal onClose={handelClose}>

        <form onSubmit={handleSubmit}>
          <label htmlFor="category" className="title space" >Select a Category:</label>
            <select id="category" className="select signup-input selecr-font"
              name="category" value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}>
                <option value="Home Repair">Home Repair</option>
                <option value="Delivery">Delivery</option>
                <option value="Driver">Driver</option>
            </select>

            <select id="category" className="select signup-input selecr-font"
              name="category" value={editStatus}
              onChange={(e) => setStatus(e.target.value)}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
            </select>

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

         
          <button type="submit" className="sign-up-btn ">Update</button>

        </form>
      </Modal>}
    </>
  );
};

export default ProblemBox;
