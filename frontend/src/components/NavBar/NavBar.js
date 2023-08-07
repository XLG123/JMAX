import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../store/session';
import webAppLogo from '../../assets/images/webAppLogo.jpg';

function NavBar() {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const demoLogin = () => {
    
  }

  const goToAbout = () => {
    history.push('/about');
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <NavLink to='/tweets'>All Tweets</NavLink>
          <NavLink to='/profile'>Profile</NavLink>
          <NavLink to='/tweets/new'>Write a Tweet</NavLink>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <>
          <div className="links-auth">

            <div className='nav-btn' id="demo-login" onClick={demoLogin}>Demo
              <span></span><span></span><span></span><span></span>
              {/* the empty spans are for css styling effects */}
            </div>

            <NavLink to='/signup' className="nav-btn">
              Sign Up
              <span></span><span></span><span></span><span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

            <NavLink to='/login' className="nav-btn">
              Log In
              <span></span><span></span><span></span><span></span>
              {/* the empty spans are for css styling effects */}
            </NavLink>

          </div>
        </>
      );
    }
  }
  
  return (
    <>
      <div className='nav-bar-container'>

        <NavLink to='/'>
          <div className='logo-container'>
            <img src={webAppLogo} alt='app-logo' className='main-pg-logo'/>
          </div>
        </NavLink>

        <div className="nav-btn" id="about-btn" onClick=
        {goToAbout}>
          About
          <span></span><span></span><span></span><span></span>
          {/* the empty spans are for css styling effects */}
        </div>

        {getLinks()}

      </div>
    </>
  );
}

export default NavBar;