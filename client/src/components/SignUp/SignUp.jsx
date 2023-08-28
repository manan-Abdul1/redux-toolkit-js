import "./SignUp.css"
import { createNewUser } from '../../redux-toolkit/actions/users';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from "react";
import { apiRequest } from "../../utils/axios";
import { CLOUDNIARY_IMG_URL } from "../../utils/serverUrl";


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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
