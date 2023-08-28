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

// All class names are declared with the prefix pg which stands for profile group, instead of pp(profile page).

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
  const currentUser = useSelector((state) => state.session.user);
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
  const isCurrentUserProblemCreator =
    currentUser._id === author || currentUser._id === userId;

  const handleClose = (e) => {
    e.preventDefault();
    setShowRequestForm(false);
    if (!problemImageUrl) {
      setImageSrc("");
    }

    // When the form is closed before submit,
    // the original content will remain instead of the edited one.
    setEditCategory(category);
    setStatus(status);
    setEditZipCode(address);
    setEditDescription(description);
  };

  const limitZipCodeMaxLength = (e) => {
    e.target.value = e.target.value.slice(0, 5);
    if (e.target.value.length === 5) {
      setZipCodeError("");
    }
  };

  const updateImagePreview = (e) => {
    if (e.target.files.length !== 0) {
      setImageSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

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
          {isCurrentUserProblemCreator && (
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
          )}

          <h3 onClick={sendToProf} className="pg-content pg-user">
            <span className="pg-light">Requester:</span> {username}
          </h3>
          <p className="pg-content pg-catgory">
            <span className="pg-light">Category:</span> {category}
          </p>
          <div className="pg-content pg-status">
            <span className="pg-light">Status:</span>{" "}
            <span
              className={status === "open" ? "open-status" : "closed-status"}
            >
              {status[0].toUpperCase() + status.substring(1)}
            </span>
          </div>
          <p className="pg-content pg-des-box">{description}</p>
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

            <div className="edit-request-form-container">
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
                className="signup-input edit-zipcode-input"
                value={editZipCode}
                min="0"
                placeholder="1"
                required
                onChange={(e) => setEditZipCode(e.target.value)}
                onInput={(e) => limitZipCodeMaxLength(e)}
              />

              <textarea
                className="signup-input edit-textarea-input"
                value={editDescription}
                placeholder="Description"
                required
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <div className="edit-request-img-input-container">
                <label className="img-input">
                  {problemImageUrl ? "Update Image" : "Add Image"}
                  <input
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    id="file"
                    className="signup-input"
                    onChange={(e) => updateImagePreview(e)}
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
                Update Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProfileBox;
