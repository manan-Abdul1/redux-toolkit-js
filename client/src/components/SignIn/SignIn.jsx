import React, { useState } from 'react';
import "./SignIn.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../../redux-toolkit/actions/users';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";



const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    const decoded = jwt_decode(credential);
    const { email } = decoded;
    dispatch(signInWithGoogle(email))
  };

  const handleGoogleFailure = (error) => {
    console.error('Error signing in with Google:', error);
    // Handle Google login failure
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData))
  };

  return (
    <div className="signin-container">
      <div className='sigin-wrap-up'>
        <span className='sigin-heading'>ACCOUNT LOGIN</span>
        <GoogleLogin
          text="Login with Google"
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          useOneTap
        />
        <div className="github1 media-sigin">
          <a href="" className="field github">
            <i className="fa-brands fa-github"></i>
            <span>Login with GitHub</span>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="signin-form" autoComplete='off'>
        <div className="input-container">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>


          <div className="other-options">
            <div className="flex">
              <input type="checkbox" />
              Remember me</div>
            <div>
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <button type="submit">Sign In</button>
          <p>Not a member?
            <span onClick={() => navigate('/signup')} className="register-link">{' '}Register </span>
          </p>
        </form>
      </div>
    </div>

  );
};

export default SignIn;
