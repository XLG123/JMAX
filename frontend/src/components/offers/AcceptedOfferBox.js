import * as problemActions from "../store/problems";
import * as sessionActions from "../store/session";
import * as offerActions from "../store/offers";
import * as reviweActions from "../store/reviews";
import { useState } from "react";
import Modal from "../context/model";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";

import "./offer.css";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
const AcceptedOfferBox = ({
  offer: { description, price, status, helper, _id, problem },
}) => {
  const user = useSelector((state) => state.session.user);
  const { userId } = useParams();
  const data = useSelector((state) => state.reviews.all);
  const reviews = Object.values(data);
  const [show, setShow] = useState(false);
  const [showReq, setShowReq] = useState(false);
  const history = useHistory();
  const [review, setReview] = useState("");
  const [showEditReview, setShowEditReview] = useState(false);
  const [reviewId, setReviewId] = useState();
  const [reviewdes, setReviewDes] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sessionActions.fetchAllUsers());
    dispatch(reviweActions.fetchReviews());
    dispatch(problemActions.fetchProblems(userId));
    dispatch(problemActions.fetchProblem(problem));

    // dispatch(p)
  }, [dispatch, userId]);

  const offerOwner = useSelector((state) => state.session.users);

  function redirectToHelper(e) {
    e.preventDefault();
    history.push(`/users/${helper}`);
  }

  function handelShowAddReview(e) {
    e.preventDefault();
    setShow(true);
  }

  function handelClose(e) {
    e.preventDefault();
    setShow(false);
    setShowReq(false);
  }

  function handleCreateReview(e) {
    e.preventDefault();
    const reviewData = {
      description: review,
      reviewer: user._id,
      offerId: _id,
    };
    dispatch(reviweActions.composeReview(reviewData)).then(() => {
      dispatch(reviweActions.fetchReviews());
    });
    handelClose(e);

    //   history.push(`users/${user._id}`);
  }

  function handelshowReq(e) {
    e.preventDefault();
    dispatch(problemActions.fetchProblem(problem));
    setShowReq(true);
  }

  function handelEdit() {
    const updateData = {
      description: review,
      reviewer: user._id,
      offerId: _id,
    };

    dispatch(reviweActions.fetchUpdateReview(reviewId, updateData));
    setShowEditReview(false);
  }

  function handelDelete(e, id) {
    e.preventDefault();
    dispatch(reviweActions.deleteReview(id));
  }

  function handelShowEdit(e, review) {
    e.preventDefault();
    setReviewId(review._id);
    setReviewDes(review.description);
    setShowEditReview(true);
  }

  function handelUser(id) {
    history.push(`/users/${id}`);
  }

  const reqForOffer = useSelector((state) => state.problems.new);
  if (!offerOwner) return null;
  // const helperOrReqOwner=(user._id===helper ||user===reqForOffer.author)
  // if( Object.values(reqForOffer).length === 0  ) return null
  if (reqForOffer === undefined) return null;

  return (
    <>
      <div className="offer-box center">
        <form onSubmit={handelShowAddReview}>
          {/* <div className=""> */}
          <h3
            onClick={redirectToHelper}
            className="user bigger"
            style={{ margin: "0.2em 0" }}
          >
            {offerOwner[helper]?.username}
          </h3>

          <div className="req accepted-offer-content">
            <span className="accepted-offer-dim">Request:</span>{" "}
            <FontAwesomeIcon icon={faMoneyCheck} onClick={handelshowReq} />
          </div>

          <p className="des-box accepted-offer-content">
            <span className="accepted-offer-dim">Price:</span> ${price}
          </p>

          <p className="des-box accepted-offer-content">
            <span className="accepted-offer-dim">Offer:</span> {description}
          </p>

          <p className="green accepted-offer-content">
            <span className="accepted-offer-dim">Offer status:</span>{" "}
            {status[0].toUpperCase() + status.substring(1)}
          </p>
          {/* </div> */}
          <button className="sign-up-btn pad center " type="submit">
            Add Comment
          </button>
        </form>
        {reviews.map(
          (ele) =>
            ele.offerId === _id && (
              <div className="review">
                {" "}
                <p
                  onClick={() => handelUser(ele.reviewer._id)}
                  className="user-review"
                >
                  <span className="reviewer-image-username">
                    <Avatar
                      alt="reviewer"
                      src={ele.reviewer?.profileImageUrl}
                      sx={{ width: "2vw", height: "2vw", cursor: "pointer" }}
                    />
                  </span>
                  <span className="reviewer-image-username">
                    {ele.reviewer.username}:
                  </span>
                </p>
                <div className="space-review">{ele.description}</div>
                {ele.reviewer._id == user._id && (
                  <div className="edit-delete">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="padding"
                      onClick={(e) => handelShowEdit(e, ele)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="padding"
                      onClick={(e) => handelDelete(e, ele._id)}
                    />
                  </div>
                )}
              </div>
            )
        )}
      </div>
      {showEditReview && (
        <Modal onClose={() => setShowEditReview(false)}>
          <input
            type="text"
            onChange={(e) => setReview(e.target.value)}
            className="signup-input"
            placeholder={reviewdes}
            required
          />
          <button className="sign-up-btn" type="submit" onClick={handelEdit}>
            Save
          </button>
        </Modal>
      )}
      {show && (
        <Modal onClose={handelClose}>
          <h1 className="title">Add your Comment</h1>
          <form onSubmit={handleCreateReview}>
            <input
              type="text"
              onChange={(e) => setReview(e.target.value)}
              className="signup-input"
              placeholder="My Comment is ...."
              required
            />
            {/* {helperOrReqOwner&& */}
            <button className="sign-up-btn" type="submit">
              Save
            </button>
            {/* }     */}
          </form>
        </Modal>
      )}
      {showReq && (
        <Modal onClose={handelClose}>
          <div>
            <div className="des-box">
              <span className="req-modal-dim">Requester:</span>{" "}
              <NavLink
                to={`/users/${reqForOffer?.author?._id}`}
                style={{ color: "#031926" }}
                className="req-modal-requester-link"
              >
                {reqForOffer?.author?.username}
              </NavLink>{" "}
            </div>
            <div className="des-box">
              <span className="req-modal-dim">Request:</span>{" "}
              {reqForOffer?.description}
            </div>

            <div className="des-box">
              <span className="req-modal-dim">Category:</span>{" "}
              {reqForOffer?.category}
            </div>

            <div className="des-box">
              <span className="req-modal-dim">Zipcode:</span>{" "}
              {reqForOffer?.address}
            </div>

            <div className="request-modal-img-container">
              <img
                className="request-modal-img"
                src={reqForOffer?.problemImageUrl}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AcceptedOfferBox;
