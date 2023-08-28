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
import Modal from "../context/model";
import { Tooltip } from "@mui/material";
// All classnames are declared with the prefix pg which stands for profile page, instead of pp.
const Profile = () => {
  const currentUser = useSelector((state) => state.session.user);

  const history = useHistory();
  const userId = useParams().userId;
  const dispatch = useDispatch();
  let users = useSelector((state) => state.session.users);

  if (!users) {
    users = {};
  }

  const user = users[userId];
  // debugger;
  const [image, setImage] = useState(
    user?.profileImageUrl ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const [imageSrc, setImageSrc] = useState(image);
  const iscurrentUser = currentUser._id === userId;
  // debugger;
  const [showEditProfile, setShowEditProfile] = useState();

  const allProblems = useSelector((state) =>        
  Object.values(state.problems.all));
  // console.log(allProblems);

  const userProblemIds = useSelector((state) => state.problems.userProblems);
  // console.log(userProblemIds);

  const updateImage = (newImageUrl) => {
    setImage(newImageUrl);
  };

  const updateProfilePreview = (e) => {
    if (e.target.files.length !== 0) {
      setImageSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const closeProfileImgModal = (e) => {
    setShowEditProfile(false);
    setImage(user?.profileImageUrl);
    setImageSrc(image);
  }

  useEffect(() => {
    dispatch(sessionActions.fetchAllUsers());
    dispatch(fetchProblems());
    dispatch(fetchUserProblems(userId));
    updateImage(user?.profileImageUrl);

    return () => dispatch(clearProblemErrors());
  }, [userId, dispatch, allProblems.length, user?.profileImageUrl]);

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
    history.push(`/pending/offers/${userId}`);
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

  function handelText() {
    history.push(`/chat/private/${currentUser._id}/${userId}`);
  }

  function handelEditImage(e) {
    e.preventDefault();
    if (e.target.file.files[0]) {
      const image = e.target.file.files[0];
      // Create a new object with the updated image URL
      const updatedUser = { ...currentUser, image: image };
      // Dispatch the action with the updated user object
      dispatch(sessionActions.fetchUpdareUser(updatedUser));
      setShowEditProfile(false);
    }
  }
  // useEffect(() => {
  //   // This line should be placed inside the useEffect
  //   updateImage(user?.profileImageUrl);
  // }, [user?.profileImageUrl]);
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
                Pending Offers
              </div>

              <div className="linebreak"></div>

              <div
                className="helper-accepted-filter-btn"
                onClick={showAcceptedOffers}
              >
                Accepted Offers
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
              <Tooltip title="Edit Profile Image">
                <div className="pg-profile">
                  <img
                    src={`${image}`}
                    alt=""
                    className="user-profile"
                    onClick={() => setShowEditProfile(true)}
                  />
                </div>
              </Tooltip>
            </div>
            {showEditProfile && iscurrentUser && (
              <Modal onClose={() => closeProfileImgModal()}>
                <form onSubmit={handelEditImage}>
                  <div className="edit-request-img-input-container">
                    <label className="img-input">
                      Update Profile Image
                      <input
                        type="file"
                        id="file"
                        className="signup-input"
                        accept=".jpeg, .jpg, .png"
                        onChange={(e) => setImage(e.target.value)}
                        onInput={(e) => updateProfilePreview(e)}
                      />
                    </label>
                  </div>

                  {imageSrc && (
                    <div
                      className="user-profile-preview-container 
                      update-profile-preview"
                    >
                      <img
                        src={imageSrc}
                        className="user-profile-image"
                        alt=""
                      />
                    </div>
                  )}

                  <button className="sign-up-btn" type="submit">
                    Save
                  </button>
                </form>
              </Modal>
            )}

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
