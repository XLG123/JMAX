import { useEffect, useState, Route } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm/LoginForm";
import SignupForm from "./components/SessionForms/SignUpForm/SignUpForm";
import Problems from "./components/Problems/Problems";
import { getCurrentUser } from "./components/store/session";
import AboutPage from "./components/About/AboutPage";
import LivePrivateChat from "./components/LiveChat/LiveChat";
import PrivateChat from "./components/PrivateChat/PrivateChat";
import AcceptedOffers from "./components/offers/AcceptedOffers";
// import Problems from './components/Problem/Problems';
import Profile from "./components/Profile/Profile";
// import ProblemCompose from './components/Problems/ProblemCompose';
import SearchResults from "./components/SearchBar/searchResults";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <ProtectedRoute exact path="/requests" component={Problems} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <AuthRoute path="/about" component={AboutPage} />
          <ProtectedRoute exact  path="/accepted/offers" component={AcceptedOffers} />


          {/* <ProtectedRoute exact path="/problems" component={Problems} /> */}
          <ProtectedRoute
            exact
            path="/chat/private/:userId/:otherUserId"
            component={PrivateChat}
          />

          <ProtectedRoute exact path="/users/:userId" component={Profile} />

          <ProtectedRoute exact path="/chat" component={LivePrivateChat} />
          {/* <ProtectedRoute exact path="/problems/new" component={ProblemCompose}
        {/* <ProtectedRoute exact path="/problems" component={Problems} /> */}
        <ProtectedRoute exact path="/users/:userId" component={Profile} />
        <ProtectedRoute path="/search-results" component={SearchResults} />
        {/* <ProtectedRoute exact path="/problems/new" component={ProblemCompose}
        /> */}
        </Switch>
      </>
    )
  );
}

export default App;
