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
import "./NavBar.css";

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
<<<<<<< HEAD
        <div className="links-nav">
          <NavLink to="/requests" >All Requests</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={handelShowForm}>Write a Tweet</button>
          <button onClick={logoutUser}>Logout</button>
        </div>
||||||| 8da8b27
        <div className="links-nav">
          <NavLink to="/tweets">All Tweets</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <button onClick={handelShowForm}>Write a Tweet</button>
          <button onClick={logoutUser}>Logout</button>
        </div>
=======
        <>
          <div className="links-nav">
            <NavLink to="/tweets" className="nav-btn-gp2 all-requests-btn">
              All Requests
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <NavLink to="/profile" className="nav-btn-gp2 user-profile-btn">
              Profile
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <div onClick={handelShowForm} 
              className="nav-btn-gp2 new-request-btn">
              Write a Request
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </div>
            
            <IconButton onClick={logoutUser} className="logout-btn">
              <LogoutIcon className="logout-icon"
                sx={{ color: '#F4E9CD', fontSize: "2.5vw", position: "absolute", 
                bottom: "0.2vw", borderRadius: '5px' }}
              />
            </IconButton>
          </div>
          <SearchBar/>
        </>
>>>>>>> main
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

        {getLinks()}
      </div>
      {showReq && <Modal onClose={handelClose}>

<<<<<<< HEAD
  <form onSubmit={handleSubmit}>
      <label for="category" className="title space" >Select a Category:</label>
      <br/>
      <br/>
      <select id="category" className="select signup-input selecr-font" name="category" onChange={(e)=> setCategory(e.target.value)}>
        <option value="Home Repair">Home Repair</option>
        <option value="Delivery">Delivery</option>
        <option value="Driver">Driver</option>
      </select>
||||||| 8da8b27
  <form onSubmit={handleSubmit}>
      <label for="category" className="title space" >Select a Category:</label>
      <br/>
      <select id="category" className="select signup-input selecr-font" name="category" onChange={(e)=> setCategory(e.target.value)}>
        <option  id="option"className="option" value="Home Repair">Home Repair</option>
        <option value="Delivery">Delivery</option>
        <option value="Driver">Driver</option>
      </select>
=======
      <form onSubmit={handleSubmit}>
>>>>>>> main

        <label for="category" className="title space" >Select a Category:</label>

        <br/>

<<<<<<< HEAD
            <input type="number"
            onChange={(e)=> setZipCode(e.target.value)}
            className='signup-input'
            placeholder="Zip Code"
            required
           />
           <br></br>

 


          <div className="errors"></div>
      
          <textarea
            className='signup-input'
            placeholder="Description"
            onChange={(e)=>setDescription(e.target.value)}
            required
||||||| 8da8b27
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
=======
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
>>>>>>> main
          />
<<<<<<< HEAD
          <br/>
          <br/>

               <label className="img-input"> Add image
                  <input
                    type="file"
                    placeholder="Add an image"
                    className="signup-input"
                  />
                  </label>
            <br/>
            <br/>
            <br/>

        <button className="sign-up-btn ">Add Request</button>
   </form>
        </Modal>}
    </>
||||||| 8da8b27
        
        <button className="sign-up-btn btn">Add Request</button>
   </form>
        </Modal>}
    </>
=======
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
>>>>>>> main

  );
}

export default NavBar;
