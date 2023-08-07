import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, login } from "../store/session";
import webAppLogo from "../../assets/images/webAppLogo.jpg";
import SearchBar from "../SearchBar/SearchBar";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import "./NavBar.css";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();

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
        <>
          <div className="links-nav">
            <NavLink to="/problems" className="nav-btn-gp2 all-requests-btn">
              All Requests
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <NavLink to="/problems/new" 
              className="nav-btn-gp2 new-request-btn">
              Create
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

            <IconButton onClick={logoutUser} className="logout-btn">
              <LogoutIcon className="logout-icon" 
                sx={{color: '#F4E9CD', fontSize: "2.5vw", position: "absolute", bottom: "0.2vw", borderRadius: '5px'}}
              /> 
            </IconButton>
          </div>


          <SearchBar />
        </>
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
    </>
  );
}

export default NavBar;
