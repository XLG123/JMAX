import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';
import logo from "../SignUpForm/Vector.png"

import { login, clearSessionErrors } from '../../store/session';
import { Link, useHistory } from 'react-router-dom';

function LoginForm() {
  const history=useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    history.push("/home")
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2 className='sign-in-title'> <img src={logo} className="logo"/>Log In to Problem  Solver</h2>
      <div className='sign'>
        <h1 className='title'>New  to  Problem  Solver? <Link to="signup" className='regiser'> Register </Link></h1>
      <div className="errors">{errors?.email}</div>
   
        <input type="text"
        className='signup-input'
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
     
      <div className="errors">{errors?.password}</div>
    
        <input type="password"
          className='signup-input'
          value={password}
          onChange={update('password')}
          placeholder="Password"
        />
     
      <input
        className='sign-up-btn'
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
      </div>
    </form>
  );
}

export default LoginForm;