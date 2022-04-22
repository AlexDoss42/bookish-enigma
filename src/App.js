import React, { useState } from 'react';
import './App.css';

function App() {
  const [singupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setSignupInput({
      ...singupInput,
      [e.target.name]: e.target.value
    })
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
