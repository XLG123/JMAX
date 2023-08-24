import { useEffect, useState } from "react";
import Modal from "../context/model";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as offerActions from "../store/offers";
import "../NavBar/NavBar.css";
import "./Profile.css";
import {
  deleteProblem,
  fetchUpdateProblem,
  fetchUserProblems,
} from "../store/problems";

// All classnames are declared with the prefix pg which stands for profile page, instead of pp.

const ProfileBox = ({
  problem: {
    category,
    author,
    description,
    address,
    status,
    _id: id,
    problemImageUrl,
  },
}) => {
  const CurrentUser = useSelector((state) => state.session.user);
  const [editCategory, setEditCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(description);
  const [editZipCode, setEditZipCode] = useState(address);
  const [zipCodeError, setZipCodeError] = useState("");
  const [imageSrc, setImageSrc] = useState(problemImageUrl);
  // const [show, setShow] = useState(false);
  // const [price, setPrice] = useState();
  // const [offer, setOffer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, _id: userId } = author;
  // console.log("userId:", userId);
  // console.log("CurrentUser._id:", CurrentUser._id);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [editStatus, setStatus] = useState(status);

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

  const handleClose = (e) => {
    e.preventDefault();
    setShowRequestForm(false);
  };

  const limitZipCodeMaxLength = (e) => {
    e.target.value = e.target.value.slice(0, 5);
    if (e.target.value.length === 5) {
      setZipCodeError("");
    }
  };

  const updateImagePreview = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProblem = {
      status: editStatus,
      category: editCategory,
      address: editZipCode,
      description: editDescription,
    };

    if (e.target.file.files[0]) {
      const image = e.target.file.files[0];
      updatedProblem.image = image;
    }

    if (editZipCode.length < 5) {
      setZipCodeError("Zip Code length must be 5 digits");
    } else {
      try {
        await dispatch(fetchUpdateProblem(id, updatedProblem));
        setShowRequestForm(false);
      } catch (error) {
        // Handle error
      }
    }
  };

  const editCurrentRequest = (e) => {
    e.preventDefault();
    setShowRequestForm(true);
  };

  const deleteCurrentRequest = (id) => {
    dispatch(deleteProblem(id));
  };

  return (
    <>
      <div className="pg-problems-container">
        <div className="pg-box">
          <div className="edit-delete-btn-gp">
            <div className="pg-edit-btn" onClick={editCurrentRequest}>
              Edit
            </div>

            <div
              className="pg-delete-btn"
              onClick={() => deleteCurrentRequest(id)}
            >
              Delete
            </div>
          </div>

          <h3 onClick={sendToProf} className="pg-user">
            {username}
          </h3>
          <div className="pg-status"> {status}</div>
          <p className="pg-catgory">{category}</p>
          <p className="pg-des-box">{description}</p>
          {problemImageUrl && (
            <div className="image-problem-div">
              <img
                className="image-problem"
                src={`${problemImageUrl}`}
                alt=""
              />
            </div>
          )}
          {/* <div className="pg-offer">
            {!isCurrentUserProblemCreator &&
              <button className="pg-add-offer-btn"
              onClick={() => setShow(true)}> Offer Help</button>
            }
          </div> */}
        </div>
      </div>
      {showRequestForm && (
        <Modal onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="category" className="title space">
              Select a Category:
            </label>

            <div>
              <select
                id="category"
                className="select signup-input selecr-font"
                name="category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="Home Repair">Home Repair</option>
                <option value="Delivery">Delivery</option>
                <option value="Driver">Driver</option>
              </select>

              <select
                id="category"
                className="select signup-input selecr-font"
                name="category"
                value={editStatus}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>

              {zipCodeError && <div>{zipCodeError}</div>}

              <input
                type="number"
                className="signup-input"
                id="edit-zipcode-input"
                value={editZipCode}
                min="0"
                placeholder="1"
                required
                onChange={(e) => setEditZipCode(e.target.value)}
                onInput={(e) => limitZipCodeMaxLength(e)}
              />

              <textarea
                className="signup-input"
                value={editDescription}
                placeholder="Description"
                required
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <div className="edit-request-img-input-container">
                <label className="img-input">
                  {imageSrc ? "Update Image" : "Add Image"}
                  <input
                    type="file"
                    id="file"
                    className="signup-input"
                    placeholder="Add an image"
                    onChange={(e)=> updateImagePreview(e)}
                  />
                </label>
              </div>

              {imageSrc && (
                <div
                  className="request-preview-img-container 
                  update-image-preview"
                >
                  <img
                    src={imageSrc}
                    className="request-preview-image"
                    alt=""
                  />
                </div>
              )}

              <button className="sign-up-btn edit-request-btn">
                Edit Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProfileBox;
