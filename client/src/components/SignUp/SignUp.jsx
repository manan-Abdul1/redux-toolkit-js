import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createNewUser } from '../../redux-toolkit/actions/users';
import { apiRequest } from "../../utils/axios";
import { CLOUDNIARY_IMG_URL } from "../../utils/serverUrl";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const userFormData = new FormData();
      userFormData.append('file', image);
      userFormData.append('upload_preset', 'ymnrcjst');

      try {
        const uploadResponse = await apiRequest(CLOUDNIARY_IMG_URL, 'post', userFormData);
        await createNewUser({ ...formData, imageUrl: uploadResponse.data.secure_url });
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

        <div class="line"></div>

        <div class="media-options">
          <a href="" class="field google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="" class="google-img" />
            <span>Login with Google</span>
          </a>
        </div>
        <div class="media-options github1">
          <a href="" class="field github">
            <i class="fa-brands fa-github"></i>
            <span>Login with GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
{/* <div className="other-options">
<div className="flex">
  <input type="checkbox" />
  Remember me</div>

<a href="/forgot-password">Forgot password?</a>
</div> */}