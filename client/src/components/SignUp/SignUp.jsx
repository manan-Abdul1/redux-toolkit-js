import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createNewUser } from '../../redux-toolkit/actions/users';
import { apiRequest } from "../../utils/axios";
import { CLOUDNIARY_IMG_URL } from "../../utils/serverUrl";
import "./SignUp.css";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isGoogleAuth: false,
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
    var decoded = jwt_decode(credential);
    const { name, email, picture } = decoded;
    const newUser = {
      username: name,
      email: email,
      imageUrl: picture,
      isGoogleAuth: true
    };
    try {
      await createNewUser(newUser);
      navigate('/signin');
    } catch (error) {
      toast.error('Error signing up with Google. Please try again.');
    }
  };
  const handleGoogleFailure = (error) => {
    toast.error('Error signing up with Google. Please try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const userFormData = new FormData();
      userFormData.append('file', image);
      userFormData.append('upload_preset', 'ymnrcjst');

      try {
        const uploadResponse = await apiRequest(CLOUDNIARY_IMG_URL, 'post', userFormData);
        await createNewUser({ ...formData, imageUrl: uploadResponse.data.secure_url, isGoogleAuth: false});
        navigate('/signin');
      } catch (error) {
        toast.error('Error signing up. Please try again.');
      }
    } else {
      // User did not upload an image
      await createNewUser({ ...formData });
      navigate('/signin');
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src="https://wallpaper.dog/large/20604739.jpg" alt="Sample" />
      </div>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form" autoComplete='off'>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            id="image"
            type="file"
            name="image"
            accept=".jpeg, .jpg, .png"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="other-options">
            <div className="flex">
              <input type="checkbox" />
              I agree to the Terms of Services.
            </div>
          </div>
          <button type="submit">Sign Up</button>
        </form>

        <div className="line"></div>

        <GoogleLogin
          text="signup_with"
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
        <div className="media-options github1">
          <a href="" className="field github">
            <i className="fa-brands fa-github"></i>
            <span>Login with GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
