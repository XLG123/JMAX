import { useState, useEffect, useRef } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login, getCurrentUser } from "../store/session";
import Modal from "../context/model.js";
import webAppLogo from "../../assets/images/webAppLogo.jpg";
import * as problemActions from "../store/problems";
import SearchBar from "../SearchBar/SearchBar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import SmsIcon from "@mui/icons-material/Sms";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LoginIcon from "@mui/icons-material/Login";
import "./NavBar.css";
import OfferModal from "../offerModal/index";
import Offers from "../offers/offers";
import * as offersActions from "../store/offers";
import Tooltip from "@mui/material/Tooltip";
import { fetchAssociatedIds } from "../store/messages";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const currentUser = useSelector((state) => state.session.user);
  const [notify, setNotify] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [showReq, setShowReqForm] = useState(false);
  const [category, setCategory] = useState("Home Repair");
  const [description, setDescription] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showOffers, setShowOffer] = useState(false);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const currentUrl = useLocation().pathname;
  const chatHistory = useSelector((state) =>
    Object.values(state.messages.users)
  );
  const [showChat, setShowChat] = useState(false);
  const ref = useRef();
  // console.log(chatHistory);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const demoLogin = () => {
    const demoInformation = {
      email: "DEMO-USER@email.com",
      password: "password",
    };
    dispatch(login(demoInformation))
      .then(() => {
        history.push("/requests");
      })
      .catch((error) => {
        console.error("Error logging in as demo user:", error);
      });
  };

  const goToAbout = () => {
    history.push("/about");
  };
  const reqOffers = useSelector((state) => state.offers.user);

  // const goToPublicChat = () => {
  //   // history.push("/chat");
  // };

  const showPrivateChat = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    const closeChatHistory = (e) => {
      if (showChat && ref.current && !ref.current.contains(e.target)) {
        setShowChat(false);
      }
    };

    document.addEventListener("click", closeChatHistory);

    return () => {
      document.removeEventListener("click", closeChatHistory);
    };
  }, [showChat]);

  useEffect(() => {
    if (loggedIn) {
      dispatch(problemActions.fetchUserProblemsOpen(currentUser._id));

      dispatch(offersActions.fetchUserOffers(currentUser._id)).then(() => {
        if (Object.keys(reqOffers).length === 0) {
          setNotify(false);
        } else {
          setNotify(true);
        }
      });

      dispatch(fetchAssociatedIds(currentUser._id));
    }
  }, [currentUser, dispatch]);
  // [ user,reqOffers]

  const updateFile = (e) => {
    setImage(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <>
          <div className="links-nav">
            <Tooltip title="All Requests">
              <NavLink
                to="/requests"
                className={
                  currentUrl === "/requests"
                    ? "nav-btn-gp2 all-requests-btn selected-nav-btn"
                    : "nav-btn-gp2 all-requests-btn"
                }
              >
                All Requests
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* the empty spans are for css styling effects */}
              </NavLink>
            </Tooltip>

            <Tooltip title="Chat History">
              <IconButton
                className="nav-chat-btn"
                onClick={showPrivateChat}
                ref={ref}
              >
                <SmsIcon
                  sx={{
                    color: "#F4E9CD",
                    fontSize: "2.5vw",
                    position: "absolute",
                    bottom: "0.2vw",
                  }}
                  className="nav-chat-icon"
                />
              </IconButton>
            </Tooltip>

            {showChat && (
              <div className="private-chat-history">
                <ul>
                  {chatHistory.length === 0 ? (
                    <div>No Chat History Yet</div>
                  ) : (
                    <div className="private-chat-title">
                      Click to enter chat
                    </div>
                  )}
                  {chatHistory.map((user) => (
                    <li key={user._id}>
                      <NavLink
                        to={`/chat/private/${currentUser._id}/${user._id}`}
                        className="private-chat-link"
                        onClick={showPrivateChat}
                      >
                        <span className="private-chat-other-username">
                          {user.username}
                        </span>
                        <span className="enter-private-chat">
                          <LoginIcon className="enter-chat-icon" />
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {notify === false && (
              <Tooltip title="Notification">
                <IconButton className="notify-btn" onClick={handleShowOffer}>
                  <NotificationsActiveIcon
                    className="notify-icon"
                    sx={{
                      color: "#F4E9CD",
                      fontSize: "2.5vw",
                      position: "absolute",
                      bottom: "0.2vw",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}

            {notify === true && (
              <Tooltip title="Notification">
                <IconButton
                  className={`notify-btn ${notify ? "shaking2" : ""}`}
                  onClick={handleShowOffer}
                >
                  <NotificationsActiveIcon
                    className="notify-icon"
                    sx={{
                      color: "red",
                      fontSize: "2.5vw",
                      position: "absolute",
                      bottom: "0.2vw",
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Profile Page">
              <NavLink
                to={`/users/${currentUser?._id}`}
                className={
                  currentUrl === `/users/${currentUser?._id}`
                    ? "nav-btn-gp2 user-profile-btn selected-nav-btn"
                    : "nav-btn-gp2 user-profile-btn"
                }
              >
                Profile
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* the empty spans are for css styling effects */}
              </NavLink>
            </Tooltip>

            <Tooltip title="Create a new request">
              <div
                onClick={handleShowForm}
                className="nav-btn-gp2 new-request-btn"
              >
                Write a Request
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {/* the empty spans are for css styling effects */}
              </div>
            </Tooltip>

            <Tooltip title="Log Out">
              <IconButton onClick={logoutUser} className="logout-btn">
                <LogoutIcon
                  className="logout-icon"
                  sx={{
                    color: "#F4E9CD",
                    fontSize: "2.5vw",
                    position: "absolute",
                    bottom: "0.2vw",
                    borderRadius: "5px",
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
          <SearchBar />
        </>
      );
    } else {
      return (
        <>
          <div className="links-auth">
            <Tooltip title="Demo User Login">
              <>
                <div className="nav-btn" id="demo-login" onClick={demoLogin}>
                  Demo
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {/* the empty spans are for css styling effects */}
                </div>
              </>
            </Tooltip>

            <Tooltip title="Sign Up">
              <>
                <NavLink
                  to="/signup"
                  className={
                    currentUrl === "/signup"
                      ? "nav-btn selected-nav-btn"
                      : "nav-btn"
                  }
                >
                  Sign Up
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {/* the empty spans are for css styling effects */}
                </NavLink>
              </>
            </Tooltip>

            <Tooltip title="Login">
              <>
                <NavLink
                  to="/login"
                  className={
                    currentUrl === "/login"
                      ? "nav-btn selected-nav-btn"
                      : "nav-btn"
                  }
                >
                  Log In
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {/* the empty spans are for css styling effects */}
                </NavLink>
              </>
            </Tooltip>

            <Tooltip title="about page">
              <>
                <div
                  className={
                    currentUrl === "/about"
                      ? "nav-btn selected-nav-btn"
                      : "nav-btn"
                  }
                  id="about-btn"
                  onClick={goToAbout}
                >
                  About
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {/* the empty spans are for css styling effects */}
                </div>
              </>
            </Tooltip>
          </div>
        </>
      );
    }
  };

  function handleShowForm(e) {
    e.preventDefault();
    setShowReqForm(true);
  }

  function handleClose(e) {
    e.preventDefault();
    setShowReqForm(false);
    setShowOffer(false);
    setImageSrc(null);
  }

  const handleSubmit = (e) => {
    setImage(null);
    e.preventDefault();
    dispatch(
      problemActions.composeProblem({
        category,
        description,
        address: zipCode,
        image,
      })
    );
    setShowReqForm(false);
    setImageSrc(null);
  };

  function handleShowOffer(e) {
    e.preventDefault();
    // debugger
    setShowOffer(true);
  }

  return (
    <>
      <div className="nav-bar-container">
        <NavLink
          to={
            currentUrl === "/" ||
            currentUrl === "/about" ||
            currentUrl === "/login" ||
            currentUrl === "/signup"
              ? "/"
              : "/requests"
          }
        >
          <div className="logo-container">
            <img src={webAppLogo} alt="app-logo" className="main-pg-logo2" />
          </div>
        </NavLink>

        {getLinks()}
      </div>
      {showReq && (
        <Modal onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="category" className="title space">
              Select a Category:
            </label>

            <br />

            <select
              id="category"
              className="select signup-input selecr-font"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Home Repair">Home Repair</option>
              <option value="Delivery">Delivery</option>
              <option value="Driver">Driver</option>
            </select>

            <input
              type="number"
              onChange={(e) => setZipCode(e.target.value)}
              className="signup-input"
              id="zipcode-input"
              placeholder="Zip Code"
              required
            />

            {/* <br></br>
<br></br>  */}
            <br />
            <div className="errors"></div>

            <textarea
              className="signup-input"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br></br>
            <br></br>

            <label className="img-input">
              {" "}
              Add image
              <input
                type="file"
                id="file"
                onChange={updateFile}
                className="signup-input"
              />
            </label>
            <br></br>
            <br></br>
            <br></br>

            {imageSrc && (
              <div className="request-preview-img-container">
                <img src={imageSrc} className="request-preview-image" />
              </div>
            )}

            <button className="sign-up-btn ">Add Request</button>
          </form>
        </Modal>
      )}

      {showOffers && (
        <Modal onClose={handleClose}>
          <div className="offerbox">
            <Offers />
          </div>
        </Modal>
      )}
    </>
  );
}

export default NavBar;
