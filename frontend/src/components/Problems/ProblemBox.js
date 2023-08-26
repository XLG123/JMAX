import "./ProblemBox.css";
import { useState, useEffect } from "react";
import Modal from "../context/model";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as offerActions from "../store/offers";
import {
  deleteProblem,
  fetchUpdateProblem,
  fetchUserProblems,
} from "../store/problems";

const ProblemBox = ({
  problem: {
    category,
    author,
    description,
    status,
    _id: id,
    problemImageUrl,
    address,
  },
}) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const CurrentUser = useSelector((state) => state.session.user);

  const [show, setShow] = useState(false);
  const [price, setPrice] = useState();
  const [offer, setOffer] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { username, _id: userId } = author;
  const [editCategory, setEditCategory] = useState(category);
  const [editStatus, setStatus] = useState(status);
  const [editZipCode, setEditZipCode] = useState(address);
  const [editDescription, setEditDescription] = useState(description);
  const [zipCodeError, setZipCodeError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageSrc, setImageSrc] = useState(problemImageUrl);
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
    if (priceError === "") {
      dispatch(offerActions.composeOffer(offerData));
      history.push(`users/${userId}`);
    }
  }

  const updateImagePreview = (e) => {
    if (e.target.files.length !== 0) {
      setImageSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const limitZipCodeMaxLength = (e) => {
    e.target.value = e.target.value.slice(0, 5);
    if (e.target.value.length === 5) {
      setZipCodeError("");
    }
  };

  const editCurrentRequest = (e) => {
    e.preventDefault();
    setShowRequestForm(true);
    // console.log("editCurrentRequest called", "true:", showRequestForm);
  };

  const eliminateNegativePrice = (e) => {
    if (e.target?.value < 0) {
      setPriceError("No negative price value.");
    } else {
      setPriceError("");
    }
  }

  const handleSubmit = (e) => {
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
      dispatch(fetchUpdateProblem(id, updatedProblem)).then(() => {
        // debugger;
        setShowRequestForm(false);
        // console.log("showRequestForm should be false:", "false", showRequestForm);
      });
    }
  };

  const deleteCurrentRequest = (id) => {
    dispatch(deleteProblem(id));
  };

  function handelClose(e) {
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
  }

  return (
    <>
      <div className="problems-container notify-modal-problems">
        <div className="box">
          <h3 onClick={sendToProf} className="all-req-content user">
            <span className="all-req-lighter-text">Requester: </span>
            {username ? username : CurrentUser.username}
          </h3>
          {/* {console.log(author)} */}
          {isCurrentUserProblemCreator && (
            <div className="edit-delete-btn-gp problem-edit-delete">
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

          <p className="all-req-content catgory">
            <span className="all-req-lighter-text">Category: </span>{" "}
            {editCategory}
          </p>
          <div className="all-req-content status">
            <span className="all-req-lighter-text">Status: </span>
            {editStatus[0].toUpperCase() + editStatus.substring(1)}
          </div>
          <p className="all-req-content des-box">{editDescription}</p>
          {problemImageUrl && (
            <div className="image-problem-div">
              <img
                className="image-problem"
                src={`${problemImageUrl}`}
                alt=""
              />
            </div>
          )}

          <br />

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

            {priceError && (
              <div style={{ marginBottom: "0.3em" }}>{priceError}</div>
            )}

            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              onInput={(e) => eliminateNegativePrice(e)}
              className="signup-input price-input"
              placeholder="Price"
              required
            />

            <button className="sign-up-btn" type="submit">
              Add Offer
            </button>
          </form>
        </Modal>
      )}
      {showRequestForm && (
        <Modal onClose={handelClose}>
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
                className="signup-input edit-description-input"
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
                    id="file"
                    className="signup-input"
                    accept=".jpeg, .jpg, .png"
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

              <button type="submit" className="sign-up-btn edit-request-btn">
                Update Request
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProblemBox;
