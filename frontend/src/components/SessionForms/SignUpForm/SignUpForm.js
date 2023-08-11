import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './signup.css';
import { signup, clearSessionErrors } from '../../store/session';
// import logo from "./logo.jpg"
import {receiveErrors} from "../../store/session"
import logo from "./Vector.png"
import { useHistory } from 'react-router-dom';
function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address,setAddress]=useState('')
  const [age,setAge]=useState('')
  const history=useHistory()

  // error handling for signup form
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [zipError, setZipError] = useState(false)

  // const [validZip,setValidZip]=useState(false)
  const errors = useSelector(state => state.errors.session);
  const year=Number(age)
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
        case 'address':
          setState = setAddress;
          break;
          case 'age':
            setState = setAge;
            break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();


    if (address.length >= 5 && address >= 0 && address ) {
      const user = {
        email,
        username,
        password,
        age: year,
        address,
      };
      dispatch(signup(user)).then(()=>{
        history.push("/requests")
      })
    }


    // else {
    //   // Properly set the error message in the Redux store
    //   dispatch(clearSessionErrors()); // Clear any previous errors
    //   dispatch(receiveErrors( 'Zip code is not correct') );
    // }
}
  // const zipCodeLen=String.valueOf(address).length()
  // console.log(zipCodeLen)
//   function vaildZipCode (address){
// // if (address<0 ||  <5){
//   return false
// }else return true
  // }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className='sign-up-form-container'>

        <h1 className='sign-up-title'>
          {/* <img src={logo} alt="session-form-logo" className="logo"/>  */}
          Register for a new account on Problem Solver
        </h1>

        <div className='sign'>

          <div className="errors">{errors?.email}</div>

          <input type="text"
            className='signup-input'
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />

          <div className="errors">{errors?.username}</div>

          <input type="text"
            className='signup-input'
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />

          <div className="errors">{errors?.password}</div>

          <input type="password"
            className='signup-input'
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />

          <div className="errors">
            {password !== password2 && 'Confirm Password field must match'}
          </div>

          <input type="password"
            className='signup-input'
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
          />

          <div className="errors">{errors?.age}</div>

          <input type="text"
            className='signup-input'
            // value={password2}
            onChange={update('age')}
            placeholder="Age"
          />

          <div className="errors">{errors}</div>

          <input type="number"
            className='signup-input'
            // value={password2}
            onChange={update('address')}
            placeholder="Zip code"
          />

          <div className="errors"></div>

          <input
            className='sign-up-btn'
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
