import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../store/session";
// import { fetchUserProblems, clearProblemErrors } from '../../store/problems';
// import ProblemBox from '../Problems/ProblemBox';
import "./Profile.css";
import ProfileBox from "./ProfileBox";
import {
  clearProblemErrors,
  fetchProblems,
  fetchUserProblems,
} from "../store/problems";
import { useParams } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
// All classnames are declared with the prefix pg which stands for profile page, instead of pp.

const Profile = () => {
  const history = useHistory();
  const userId = useParams().userId;
  const dispatch = useDispatch();
  let users = useSelector((state) => state.session.users);

  if (!users) {
    users = {};
  }

  const user = users[userId];

  const currentUser = useSelector((state) => state.session.user);
  const allProblems = useSelector((state) => Object.values(state.problems.all));
  console.log(allProblems);
  const userProblemIds = useSelector((state) => state.problems.userProblems);
  // console.log(userProblemIds);

  useEffect(() => {
    dispatch(sessionActions.fetchAllUsers());
    dispatch(fetchProblems());
    dispatch(fetchUserProblems(userId));
    return () => dispatch(clearProblemErrors());
  }, [userId, dispatch, allProblems.length]);

  if (!userProblemIds) {
    return [];
  }

  if (!users) return null;

  const allRequestsOffers = (e) => {
    e.preventDefault();
  };

  const allRequests = (e) => {
    e.preventDefault();
  };

  const showOpenRequests = (e) => {
    e.preventDefault();
  };

  const showResolvedRequests = (e) => {
    e.preventDefault();
  };

  const allOffers = (e) => {
    e.preventDefault();
  };

  const showAcceptedOffers = (e) => {
    // e.preventDefault();

    history.push(`/offers/${userId}`);
  };

  const showPendingOffers = (e) => {
    e.preventDefault();
  };
  // debugger
  // if (allProblems.length === 0)return null

  const noRequestsMsg = () => {
    return (
      <div className="no-requests-container">
        <h1 className="no-requests-msg" style={{ color: "green" }}>
          No requests yet.
        </h1>
      </div>
    );
  };

  function handelText() {
    history.push(`/chat/private/${currentUser._id}/${userId}`);
  }

  return (
    <>
      {/* pg stands for profile page */}
      <div className="pg-container">
        <div className="pg-left-side-bar">
          <div className="pg-filter-gp">
            {/* By default, the users will see the all requests they made */}
            {/* <div className='pg-filter-btn' 
              onClick={(e) => {allRequestsOffers(e)}}>
              ALL
            </div> */}

            {/* <div className='pg-requester-btn-gp'>

              <div className='requester-btn'
                onClick={(e) => {allRequests(e)}}>Requests</div>

              <div className='linebreak'></div>

              <div className='pg-requester-open-status-btn'
                onClick={(e) => {showOpenRequests(e)}}>
                Open
              </div>

              <div className='pg-requester-resolved-status-btn'
                onClick={(e) => {showResolvedRequests(e)}}>
                Resolved
              </div>

            </div> */}

            <div className="pg-helper-btn-gp">
              <div
                className="helper-btn"
                onClick={(e) => {
                  allOffers(e);
                }}
              >
                Offers
              </div>

              <div className="linebreak"></div>

              <div
                className="helper-accepted-filter-btn"
                onClick={showAcceptedOffers}
              >
                Accepted
              </div>

              {/* <div className='helper-pending-filter-btn'
                onClick={(e) => {showPendingOffers(e)}}>
                Pending
              </div> */}
            </div>
          </div>
        </div>

        <div className="pg-middle-section">
          {userProblemIds.length === 0 ? (
            <div className="no-request-container">No requests</div>
          ) : (
            <></>
          )}
          {allProblems
            .filter((problem) => userProblemIds.includes(problem._id))
            .map((problem) => (
              <ProfileBox key={problem._id} problem={problem} />
            ))}
        </div>

        <div className="pg-right-side-bar">
          <div className="user-info-display">
            <div className="avatar-container">
              <div className="pg-profile">
                <img
                  src={`${user?.profileImageUrl}`}
                  alt=""
                  className="user-profile"
                />
              </div>
            </div>

            <div className="general-info user-info">
              <div className="pg-user-info-label">
                <span>Username: </span>
                <span>{user?.username}</span>
              </div>
            </div>

            <div className="general-info user-info">
              <div className="pg-user-info-label">
                <span>Email: &nbsp;</span> {user?.email}
              </div>
            </div>

            <div className="general-info user-addr">
              <div className="pg-user-info-label">
                <span>ZipCode: </span> {user?.address}
              </div>
            </div>

            <div className="general-info user-age">
              <div className="pg-user-age">Age: {user?.age}</div>
            </div>
            <CommentIcon
              sx={{ fontSize: "5rem", marginLeft: "4.5rem", width: "30%" }}
              onClick={handelText}
              className="private-chat-room"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
