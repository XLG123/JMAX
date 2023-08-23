import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./signup.css";
import { signup, clearSessionErrors } from "../../store/session";
// import logo from "./logo.jpg"
import { receiveErrors } from "../../store/session";
import logo from "./Vector.png";
import { useHistory } from "react-router-dom";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const history = useHistory();
  const [image, setImage] = useState(null);

  // error handling for signup form
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [zipError, setZipError] = useState(false);

  // const [validZip,setValidZip]=useState(false)
  const errors = useSelector((state) => state.errors.session);
  const year = Number(age);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;
    let setErrorState;

    switch (field) {
      case "email":
        setState = setEmail;
        setErrorState = setEmailError;
        break;
      case "username":
        setState = setUsername;
        setErrorState = setUsernameError;
        break;
      case "password":
        setState = setPassword;
        setErrorState = setPasswordError;
        break;
      case "password2":
        setState = setPassword2;
        setErrorState = setPassword2Error;
        break;
      case "address":
        setState = setAddress;
        setErrorState = setZipError;
        break;
      case "age":
        setState = setAge;
        setErrorState = setAgeError;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => {
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
      // let emailRegex = new RegExp(
      //   `([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|([]!#-[^-~\\t]|(\\[\\t -~]))+)@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\\t -Z^-~]*])`
      //   );
      // if (!emailRegex.test(email)) {
      //   console.log("didn't pass the test");
      //   setEmailError("Email format is incorrect");
      // } else {
      //   console.log("pass??");
      //   setEmailError(null);
      // }
      setEmailError(null);
    }
    if (!username) {
      setUsernameError("Username is required");
      errors = true;
    } else {
      setUsernameError(null);
    }
    if (!password) {
      setPasswordError("Password is required");
      errors = true;
    } else {
      setPasswordError(null);
    }
    // if (!password2) {
    //   setPassword2Error("Confirm password is required");
    //   errors = true;
    // }else {
    //   setPassword2Error(null);
    // }
    if (!age) {
      setAgeError("Age is required");
      errors = true;
    } else {
      setAgeError(null);
    }
    if (password !== password2) {
      setPassword2Error("Passwords do not match");
      errors = true;
    } else {
      setPassword2Error(null);
    }
    if (!age) {
      setAgeError("Age must be required");
      errors = true;
    } else if (password.length < 8) {
    }
    if (!age) {
      setAgeError("Age must be required");
      errors = true;
    } else if (age > 120) {
      setAgeError("Age must be at most 120 years old");
      errors = true;
    } else if (age < 12) {
      setAgeError("Age must be at least 12 years old");
      errors = true;
    } else {
      setAgeError(null);
    }
    if (address.length !== 5) {
      setZipError("Zip code must be 5 digits");
      errors = true;
    } else {
      setZipError(null);
    }

    if (!errors) {
      const user = {
        email,
        username,
        password,
        age: year,
        address,
        image,
      };
      dispatch(signup(user)).then(() => {
        history.push("/requests");
      });
    }

    // else {
    //   // Properly set the error message in the Redux store
    //   dispatch(clearSessionErrors()); // Clear any previous errors
    //   dispatch(receiveErrors( 'Zip code is not correct') );
    // }
  };
  // const zipCodeLen=String.valueOf(address).length()
  // console.log(zipCodeLen)
  //   function vaildZipCode (address){
  // // if (address<0 ||  <5){
  //   return false
  // }else return true
  // }

  const updateFile = e => setImage(e.target.files[0]);

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className="sign-up-form-container">
        <h1 className="sign-up-title">
          {/* <img src={logo} alt="session-form-logo" className="logo"/>  */}
          Register for a new account on Problem Solver
        </h1>

        <div className="sign">
          {emailError && <div className="error-message">{emailError}</div>}
          <div className="errors">{errors?.email}</div>

          <input
            type="text"
            className="signup-input"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />

          <div className="errors">{errors?.username}</div>
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}

          <input
            type="text"
            className="signup-input"
            value={username}
            onChange={update("username")}
            placeholder="Username"
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

          <div className="errors">
            {password !== password2 && "Confirm Password field must match"}
          </div>
          {/* {password2Error && <div className="error-message">{password2Error}</div>} */}

          <input
            type="password"
            className="signup-input"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
          />

          <div className="errors">{errors?.age}</div>
          {ageError && <div className="error-message">{ageError}</div>}

          <input
            type="text"
            className="signup-input"
            // value={password2}
            onChange={update("age")}
            placeholder="Age"
          />

          <div className="errors">{errors}</div>
          {zipError && <div className="error-message">{zipError}</div>}

          <input
            type="number"
            className="signup-input"
            // value={password2}
            onChange={update("address")}
            placeholder="Zip code"
          />
          <label>
            Profile Image
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={updateFile}
            />
          </label>

          <div className="errors"></div>

          <input
            className="sign-up-btn"
            type="submit"
            value="Register"
            // disabled={!email || !username || !password || password !== password2}
          />
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
