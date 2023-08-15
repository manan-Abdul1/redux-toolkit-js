import React, { useState } from 'react';
import "./SignIn.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../redux-toolkit/features/users/userSlice';
import toast from 'react-hot-toast';


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.users.usersData);

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

    const user = userData.find(user => user.email === formData.email);

    if (!user) {
      toast.error("User not exist ");
    } else if (user.password !== formData.password) {
      toast.error("Incorrect password");
    } else {
      toast.success("User Successfully Logged In!")
      dispatch(signIn(user.userId));
      navigate("/");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form" autoComplete='off'>
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
        <button type="submit">Sign In</button>
        <p onClick={() => navigate('/signup')} style={{ cursor: "pointer" }}>Create new account? Register</p>
      </form>
    </div>

  );
};

export default SignIn;
