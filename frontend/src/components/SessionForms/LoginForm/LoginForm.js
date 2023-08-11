import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import './SessionForm.css';
import logo from "../SignUpForm/Vector.png";

import { login, clearSessionErrors } from "../../store/session";
import { Link, useHistory } from "react-router-dom";

function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  // error handling
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setErrorState = setLoginError;
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => {
      setLoginError("");
      setEmailError("");
      setPasswordError("");
      setErrorState(null);
      setState(e.currentTarget.value);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = false;

    if (!email) {
      setEmailError("Email is required");
      errors = true;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password is required");
      errors = true;
    } else {
      setPasswordError("");
    }
    if (!errors) {
      dispatch(login({ email, password })).then(() => {
        history.push("/requests");
      });
    } else if (emailError) {
      setLoginError("User credentials are incorrect");
    }
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className="sign-in-form-container">
        <h2 className="sign-in-title">
          {/* <img src={logo} alt="session-form-logo" className="logo"/> */}
          Log In to Problem Solver
        </h2>

        <div className="sign">
          <h1 className="title">
            New to Problem Solver?
            <Link to="signup" className="register">
              {" "}
              Register{" "}
            </Link>
          </h1>

          <div className="errors">{errors?.email}</div>
          {loginError && <div className="error-message">{loginError}</div>}
          {emailError && <div className="error-message">{emailError}</div>}

          <input
            type="text"
            className="signup-input"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />

          <div className="errors">{errors?.password}</div>
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}

          <input
            type="password"
            className="signup-input"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />

          <input
            className="sign-up-btn"
            type="submit"
            value="Log In"
            // disabled={!email || !password}
          />
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
