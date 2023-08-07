import { useEffect, useState, Route } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm/LoginForm';
import SignupForm from './components/SessionForms/SignUpForm/SignUpForm';

import { getCurrentUser } from './components/store/session';
import AboutPage from './components/About/AboutPage';

// import Problems from './components/Problem/Problems';
// import Profile from './components/Profile/Profile';
// import ProblemCompose from './components/Problems/ProblemCompose';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <AuthRoute path="/about" component={AboutPage} />

        {/* <ProtectedRoute exact path="/problems" component={Problems} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/problems/new" component={ProblemCompose} 
        /> */}
      </Switch>
    </>
  );
}

export default App;
