import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './signup.css';
import { signup, clearSessionErrors } from '../../store/session';
// import logo from "./logo.jpg"
import logo from "./Vector.png"
function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address,setAddress]=useState('')
  const [age,setAge]=useState('')
  const errors = useSelector(state => state.errors.session);
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
    const user = {
      email,
      username,
      password,
      age,
      address
    };

    dispatch(signup(user));
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h1 className='sign-up-title'> <img src={logo} className="logo"/> Rigister for a new account on Problem  Solver</h1>
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
      <div className="errors">{errors?.address}</div>

           <input type="text"
            className='signup-input'
          // value={password2}
          onChange={update('address')}
          placeholder="Zip code"
        />
      <div className="errors">{errors?.address}</div>
      
      <input
      className='sign-up-btn'
        type="submit"
        value="Register"
        disabled={!email || !username || !password || password !== password2}
      />
    </div>

    </form>
  );
}

export default SignupForm;