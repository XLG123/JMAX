import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/session";
import Modal from "../context/model.js"
import webAppLogo from "../../assets/images/webAppLogo.jpg";
import * as problemActions from "../store/problems"
import SearchBar from "../SearchBar/SearchBar";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import "./NavBar.css";
import OfferModal from "../offerModal/index"
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showReq,setShowReqForm]=useState(false)
  const [category, setCategory] = useState("Home Repair");
  const [description, setDescription] = useState('');
  const [zipCode,setZipCode]=useState('')
  const [showOffers,setShowOffer]=useState(false)
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

  const getLinks = () => {
    if (loggedIn) {
      return (
        <>
          <div className="logo-container">
            <img src={webAppLogo} alt="app-logo" className="main-pg-logo2" />
          </div>

          <div className="links-nav">
            <NavLink to="/requests" className="nav-btn-gp2 all-requests-btn">
              All Requests
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <IconButton className="notify-btn" onClick={handleShowOffer}>
              <NotificationsActiveIcon className="notify-icon"
                sx={{color: "#F4E9CD", fontSize: "2.5vw",
                position: "absolute", bottom: "0.2vw"}}/>
            </IconButton>

            <NavLink to={`/users/${user?._id}`} className="nav-btn-gp2 user-profile-btn">
              Profile
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <div onClick={handleShowForm} 
              className="nav-btn-gp2 new-request-btn">
              Write a Request
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </div>
            
            <IconButton onClick={logoutUser} className="logout-btn" >
              <LogoutIcon className="logout-icon"
                sx={{ color: '#F4E9CD', fontSize: "2.5vw", 
                position: "absolute", bottom: "0.2vw", borderRadius: '5px' }}
              />
            </IconButton>
          </div>
          <SearchBar/>
        </>
      );
    } else {
      return (
        <>

          <NavLink to="/">
            <div className="logo-container">
              <img src={webAppLogo} alt="app-logo" className="main-pg-logo" />
            </div>
          </NavLink>

          <div className="links-auth">
            <div className="nav-btn" id="demo-login" onClick={demoLogin}>
              Demo
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </div>

            <NavLink to="/signup" className="nav-btn">
              Sign Up
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <NavLink to="/login" className="nav-btn">
              Log In
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <div className="nav-btn" id="about-btn" onClick={goToAbout}>
              About
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </div>

          </div>
        </>
      );
    }
  };
  function handleShowForm(e){
    e.preventDefault()
    setShowReqForm(true)
  }

  function handleClose(e){
    e.preventDefault();
    setShowReqForm(false)
    setShowOffer(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(problemActions.composeProblem({ category,description ,address:zipCode }));
    setShowReqForm(false)
  }
  function handleShowOffer(e){
    e.preventDefault()
    debugger
    setShowOffer(true)
  }

  return (
    <>
      <div className="nav-bar-container">

        {getLinks()}
      </div>
      {showReq && <Modal onClose={handleClose}>

<form onSubmit={handleSubmit}>

  <label htmlFor="category" className="title space" >Select a Category:</label>

  <br/>

  <select id="category" className="select signup-input selecr-font" name="category" onChange={(e)=> setCategory(e.target.value)}>
    <option  value="Home Repair">Home Repair</option>
    <option value="Delivery">Delivery</option>
    <option value="Driver">Driver</option>
  </select>

  <input type="number"
    onChange={(e)=> setZipCode(e.target.value)}
    className='signup-input'
    placeholder="Zip Code"
    required
  />

  {/* <br></br>
<br></br>  */}
<br />
  <div className="errors"></div>

  <textarea
    className='signup-input'
    placeholder="Description"
    onChange={(e)=>setDescription(e.target.value)}
    required
  />
<br></br>
<br></br>


  <label className="img-input"> Add image
  <input type="file"
  id="file"
    // onChange={(e)=> setZipCode(e.target.value)}
    className='signup-input'
    placeholder="Add an image"
    />
  </label>
  <br></br>
<br></br>
<br></br>

  <button className="sign-up-btn ">Add Request</button>
</form>
</Modal>}

{showOffers&& <Modal onClose={handleClose}>
  
  <div  className="offerbox">im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>
  <div >im an offer</div>

  </Modal>}
  </>


  );
}

export default NavBar;
