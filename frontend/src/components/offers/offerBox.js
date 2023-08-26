// import "./ProblemBox.css"
import * as problemActions from "../store/problems";
import * as sessionActions from "../store/session";
import * as offerActions from "../store/offers";
import { useState } from "react";
import Modal from "../context/model";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./offer.css";
import { Tooltip } from "@mui/material";
const OfferBox = ({
  offer: { description, price, status, helper, _id, problem },
}) => {
  const user = useSelector((state) => state.session.user);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.fetchAllUsers());
    dispatch(offerActions.fetchUserOffers(user._id));
  }, [dispatch]);

  const offerOwner = useSelector((state) => state.session.users);
  function handelSubmit(e) {
    e.preventDefault();
  }
  // console.log(offerOwner[helper].username)
  function redirectToHelper(e) {
    e.preventDefault();
    history.push(`/users/${helper}`);
  }

  function handelDeleteOffer(e) {
    e.preventDefault();
    dispatch(offerActions.fetchDeleteOffer(_id));
  }

  function handelTakingOffer(e) {
    e.preventDefault();
    dispatch(problemActions.fetchUpdateProblem(problem, { status: "closed" }));
    dispatch(offerActions.fetchUpdateOffer(_id, { status: "accepted" })).then(
      () => {
        history.push(`/users/${helper}`);
      }
    );
  }

  if (!offerOwner) return null;

  return (
    <>
      <div className="offer-container offer-container-on-notify">
        <form onSubmit={handelTakingOffer}>
          {/* <div className=""> */}
          <div className="close">
            {" "}
            <Tooltip title="Delete Offer">
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ color: "#FF5733" }}
                onClick={handelDeleteOffer}
                className="delete-offer-trash-can-btn"
              />
            </Tooltip>
          </div>

          <h3
            onClick={redirectToHelper}
            className="user bigger on-notify-helper"
          >
            <span className="on-notify-dim">Helper:</span>{" "}
            {offerOwner[helper].username}
          </h3>

          <p className="des-box on-notify-offer-text">
            <span className="on-notify-dim">Price:</span> ${price}
          </p>

          <p className="des-box on-notify-offer-text 
            on-notify-offer">
            <span className="on-notify-dim">Offer:</span> {description}
          </p>

          <p className="green on-notify-offer-text 
            on-notify-offer-status-container">
            <span className="on-notify-dim">Offer Status:</span>
            <span className="on-notify-offer-status"> {status}</span>
          </p>

          {/* </div> */}
          <button className="sign-up-btn pad" type="submit">
            Accept Offer
          </button>
        </form>
      </div>
    </>
  );
};

export default OfferBox;
