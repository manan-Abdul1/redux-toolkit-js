import React, { useState } from 'react';
import "./SignIn.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux-toolkit/actions/users';


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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData))
  };

  return (
    <div className="signin-container">
      <div className='sigin-wrap-up'>
        <span className='sigin-heading'>ACCOUNT LOGIN</span>
        <div className="media-sigin">
          <a href="" className="field google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" className="google-img" />
            <span>Login with Google</span>
          </a>
        </div>
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
