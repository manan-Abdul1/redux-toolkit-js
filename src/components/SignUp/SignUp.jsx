import { useState } from 'react';
import "./SignUp.css"
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux-toolkit/features/users/userSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData)); 
    navigate("/signin")
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form" autoComplete='off'> 
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
