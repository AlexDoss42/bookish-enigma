import React, { useState } from 'react';
import validator from 'validator';

import './App.css';

function App() {
  const [singupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignupInput({
      ...singupInput,
      [e.target.name]: e.target.value
    })
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(!validator.isEmail(singupInput.email)) {
      setError("the email you input is invalid");
    } else if(singupInput.password.length < 5) {
      setError("The password you entered should contain 5 of more characters")
    } else if (singupInput.password !== singupInput.confirmPassword) {
      setError("Your password and confirm password do not match")
    }
    
  }

  return (
    <div className='container my-5'>
      <form>
        <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email Address
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              className="form-control"
              value={singupInput.email}
              onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="form-control"
              value={singupInput.password}
              onChange={handleChange}
            />
        </div>
        <div className='mb-3'>
            <label htmlFor='confirm-password' className='form-label'>
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirm-password" 
              name="confirmPassword" 
              className="form-control"
              value={singupInput.confirmPassword}
              onChange={handleChange}
            />
        </div>
        {error && <p className='text-danger'>{error}</p>}
        <button type="submit" className='btn btn-primary' onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
}

export default App;
