import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import { useState } from "react";
import { logout, login } from "../store/session";
import Modal from "../context/model.js"
import webAppLogo from "../../assets/images/webAppLogo.jpg";
import * as problemActions from "../store/problems"
function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showReq,setShowReqForm]=useState(false)
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [zipCode,setZipCode]=useState('')
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
console.log(category,description,zipCode)
  const demoLogin = () => {
    const demoInformation = {
      email: "DEMO-USER@email.com",
      password: "password",
    };
    dispatch(login(demoInformation))
      .then(() => {
        history.push("/");
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
        <div className="links-nav">
          <NavLink to="/tweets">All Tweets</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={handelShowForm}>Write a Tweet</button>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <>
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
          </div>
        </>
      );
    }
  };
  function handelShowForm(e){
    e.preventDefault()
    setShowReqForm(true)
  }
function handelClose(e){
  e.preventDefault();
  setShowReqForm(false)
}
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(problemActions.composeProblem({ category,description ,address:zipCode }));
  setShowReqForm(false)
}
  return (
    <>
      <div className="nav-bar-container">
        <NavLink to="/">
          <div className="logo-container">
            <img src={webAppLogo} alt="app-logo" className="main-pg-logo" />
          </div>
        </NavLink>

        <div className="nav-btn" id="about-btn" onClick={goToAbout}>
          About
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {/* the empty spans are for css styling effects */}
        </div>

        {getLinks()}
      </div>
      {showReq && <Modal onClose={handelClose}>

  <form onSubmit={handleSubmit}>
      <label for="category" className="title space" >Select a Category:</label>
      <br/>
      <select id="category" className="select signup-input selecr-font" name="category" onChange={(e)=> setCategory(e.target.value)}>
        <option  id="option"className="option" value="Home Repair">Home Repair</option>
        <option value="Delivery">Delivery</option>
        <option value="Driver">Driver</option>
      </select>



            <input type="number"
            onChange={(e)=> setZipCode(e.target.value)}
            className='signup-input'
            placeholder="Zip Code"
            required
           />
      
            <div className="signup-input"> 
           <input type="file"
           id="file"
            // onChange={(e)=> setZipCode(e.target.value)}
            className='signup-input'
            placeholder="Add an image"
            />
           </div>
      
          <div className="errors"></div>
      
          <textarea
            className='signup-input'
            placeholder="Description"
            onChange={(e)=>setDescription(e.target.value)}
            required
          />
        
        <button className="sign-up-btn btn">Add Request</button>
   </form>
        </Modal>}
    </>

  );
}

export default NavBar;
